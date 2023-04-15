import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import Config from 'react-native-config';

export const authClient = axios.create({
  baseURL: Config.API_URL,
});

export const publicClient = axios.create({
  baseURL: Config.API_URL,
});

export const setClientToken = (token: string | undefined) => {
  authClient.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const setAuthRefreshTokenInterceptor = (
  refreshAuthLogic: (failedRequest: any) => Promise<any>,
) => {
  createAuthRefreshInterceptor(authClient, refreshAuthLogic, {
    statusCodes: [401],
  });
};
