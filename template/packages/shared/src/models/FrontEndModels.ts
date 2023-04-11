import {
  IImageBE,
  IUserBE,
} from "./BackEndModels";

export enum SortDirection {
  Asc = "ASC",
  Desc = "DESC",
  None = "NONE",
}

export interface ISortData {
  sortGridBy: string;
  sortGridDirection: SortDirection;
}

export interface IFilterItem {
  category: string;
  value: string;
}

export interface IUser extends IUserBE {
  externalProp?: string;
  accessToken?: string;
}

export interface ISignUpUser<T> {
  email: string;
  password: string;
  given_name?: string;
  family_name?: string;
  metadata?: T;
}

export interface IToken {
  access_token?: string;
  refresh_token?: string;
}

export interface IImage extends IImageBE {
  externalProp?: string;
}

