import {
  setAuthRefreshTokenInterceptor,
  setClientToken,
} from '@poeta/shared/build/dal';
import {IUser} from '@poeta/shared/build/models';
import axios from 'axios';
import React, {createContext, useState, ReactNode, useCallback} from 'react';
import Config from 'react-native-config';
import * as Keychain from 'react-native-keychain';
import jwt_decode from 'jwt-decode';
import {STORAGE_TYPE} from 'react-native-keychain';
import {Platform} from 'react-native';

interface IAuthContextState {
  accessToken?: string;
  refreshToken?: string;
  authenticated?: boolean;
  user?: IUser;
}

/**
 * @method restoreTokens - restore tokens from Keychain at start up
 */
export interface IAuthContextValue {
  authState: IAuthContextState;
  getAccessToken: () => string | undefined;
  updateAuthState: (authState: IAuthContextState) => void;
  logout: () => void;
  restoreTokens: () => Promise<void>;
}

interface IAuthProviderProps {
  children: ReactNode;
}

const noAuth = {
  accessToken: undefined,
  refreshToken: undefined,
  authenticated: undefined,
  user: undefined,
} as IAuthContextState;

const AuthContext = createContext<IAuthContextValue | null>(null);
const {Provider} = AuthContext;

const AuthProvider = (props: IAuthProviderProps) => {
  const [authState, setAuthState] = useState<IAuthContextState>(noAuth);

  const refreshAuth = React.useCallback(async (failedRequest: any) => {
    const value = await Keychain.getGenericPassword();
    if (value === false) {
      return;
    }
    const jwt = JSON.parse(value.password) as {refreshToken: string};

    const options = {
      method: 'POST',
      data: {
        refresh_token: jwt.refreshToken,
      },
      url: Config.API_URL + '/auth0/refresh-token',
    };

    try {
      const apiResponse = await axios(options);
      const data = apiResponse.data.data;

      failedRequest.response.config.headers.Authorization =
        'Bearer ' + data.access_token;

      setClientToken(data.access_token);

      await Keychain.setGenericPassword(
        'token',
        JSON.stringify({
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
        }),
      );

      setAuthState({
        accessToken: data.accessToken,
        refreshToken: data.refresh_token,
        authenticated: true,
        user: jwtUser(data.accessToken),
      });

      return await Promise.resolve();
    } catch (e) {
      setAuthState(noAuth);
    }
  }, []);

  const jwtUser = (accessToken?: string) => {
    if (accessToken) {
      return jwt_decode(accessToken) as IUser;
    }
    return undefined;
  };

  const updateAuthState = useCallback(
    async (auth: IAuthContextState) => {
      // fix issue keychain can't setGenericPassword on device Pixel 3,4
      // https://github.com/oblador/react-native-keychain/issues/458
      const defaultKeyChainOptions =
        Platform.OS === 'ios'
          ? {}
          : {
              storage: STORAGE_TYPE.FB,
            };
      await Keychain.setGenericPassword(
        'token',
        JSON.stringify({
          accessToken: auth.accessToken,
          refreshToken: auth.refreshToken,
        }),
        defaultKeyChainOptions,
      );
      setClientToken(auth.accessToken);
      auth.user = jwtUser(auth.accessToken);
      setAuthRefreshTokenInterceptor(refreshAuth);
      setAuthState(auth);
    },
    [refreshAuth],
  );

  const logout = async () => {
    await Keychain.resetGenericPassword();
    setAuthState(noAuth);
  };

  const getAccessToken = () => {
    return authState.accessToken;
  };

  // Restore tokens at start up
  const restoreTokens = useCallback(() => {
    return new Promise<void>((resolve, reject) => {
      try {
        Keychain.getGenericPassword().then(result => {
          if (result) {
            const jwt = JSON.parse(result.password) as {
              accessToken: string;
              refreshToken: string;
            };
            if (jwt && Object.keys(jwt).length !== 0) {
              updateAuthState({
                accessToken: jwt.accessToken,
                refreshToken: jwt.refreshToken,
                authenticated: true,
              });
            }
          }
          resolve();
        });
      } catch (error: any) {
        reject(error);
      }
    });
  }, [updateAuthState]);

  return (
    <Provider
      value={{
        authState,
        getAccessToken,
        updateAuthState,
        logout,
        restoreTokens,
      }}>
      {props.children}
    </Provider>
  );
};

export {AuthContext, AuthProvider};
