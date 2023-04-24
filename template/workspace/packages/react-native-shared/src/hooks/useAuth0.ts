import {useCallback} from 'react';
import {loginAuth0, signUpAuth0} from '@poeta/shared/build/services';
import {DefaultDALCollection} from '@poeta/shared/build/dal';
import {useAuth} from './useAuth';

export const useAuth0 = () => {
  const authContext = useAuth();

  const login = useCallback(
    (userName: string, password: string, params?: any) => {
      return new Promise<void>((resolve, reject) => {
        loginAuth0(userName.trim(), password.trim())
          .then(responseAuth0 => {
            const idToken = responseAuth0.idToken;
            return DefaultDALCollection.getDALCollection()
              .getUserDAL()
              .generateUserToken({
                ...params,
                id_token: idToken,
              });
          })
          .then(async response => {
            const token = response.data;
            await authContext?.updateAuthState({
              accessToken: token.access_token,
              refreshToken: token.refresh_token,
              authenticated: true,
            });
            resolve();
          })
          .catch(error => reject(error));
      });
    },
    [authContext],
  );

  const signUp = useCallback(
    async (userName: string, password: string, metadata?: any) => {
      return new Promise((resolve, reject) => {
        signUpAuth0({
          email: userName,
          password: password,
          metadata,
        })
          .then(signupResponse => resolve(signupResponse))
          .catch(error => reject(error));
      });
    },
    [],
  );

  return {login, signUp};
};
