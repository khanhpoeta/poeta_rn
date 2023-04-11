import {
  ITokenBE,
  IToken,
} from "../models";
import { BaseDAL } from "./BaseDAL";

export class UserDAL extends BaseDAL {
  public generateUserToken(params?: ITokenBE) {
    return this.get<ITokenBE, IToken>("/auth0/generate-token", params);
  }
}
