import {useCallback} from 'react';
import {loginAuth0, signUpAuth0} from '@poeta/shared/build/services';
import {DefaultDALCollection} from '@poeta/shared/build/dal';
import {useAuth} from './useAuth';

export const useAuth0 = () => {
  const authContext = useAuth();

  const login = useCallback(
    async (userName: string, password: string, params?: any) => {
      const responseAuth0 = await loginAuth0(userName.trim(), password.trim());
      const idToken = responseAuth0.idToken;
      const userDAL = DefaultDALCollection.getDALCollection().getUserDAL();
      const response = await userDAL.generateUserToken({
        ...params,
        id_token: idToken,
      });
      const token = response.data;
      await authContext?.updateAuthState({
        accessToken: token.access_token,
        refreshToken: token.refresh_token,
        authenticated: true,
      });
    },
    [],
  );

  const signUp = useCallback(
    async (userName: string, password: string, metadata?: any) => {
      const signupResponse = await signUpAuth0({
        email: userName,
        password: password,
        metadata,
      });
      return signupResponse;
    },
    [],
  );

  return {login, signUp};
};
