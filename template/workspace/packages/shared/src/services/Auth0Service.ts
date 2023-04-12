import Auth0 from "react-native-auth0";
import Config from "react-native-config";
import { ISignUpUser } from "../models";

function auth0() {
  return new Auth0({
    domain: Config.AUTH0_DOMAIN as string,
    clientId: Config.AUTH0_CLIENTID as string,
  });
}

const auth0Connection = "Username-Password-Authentication";

export async function loginAuth0(email: string, password: string) {
  return auth0().auth.passwordRealm({
    username: email,
    password: password,
    realm: auth0Connection,
  });
}

export const signUpAuth0 = <T>(user: ISignUpUser<T>) => {
  return auth0().auth.createUser({
    email: user.email,
    username: user.email,
    password: user.password,
    connection: auth0Connection,
    metadata: user.metadata
  });
  
};

export const resetPasswordAuth0 = (email: string) => {
  return auth0().auth.resetPassword({
    email: email,
    connection: auth0Connection,
  });
};

export const userInfo = (accessToken: string) => {
  return auth0().auth.userInfo({token: accessToken})
};
