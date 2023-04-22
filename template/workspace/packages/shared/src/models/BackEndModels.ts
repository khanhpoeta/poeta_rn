import {ModelType, FileType, ObjectStatus} from '@/constant/enum';

export interface IApiObject {
  id: number;
  status?: ObjectStatus;
}

export interface ISystemObject extends IApiObject {
  createdBy: number;
  created_at: number;
  updateBy: number;
  updated_at: number;
}

export interface ITokenBE {
  id_token?: string;
  type?: string;
}

export interface IUploadFile {
  file: {
    uri: string;
    type: string;
    name: string;
  };
  model_type: ModelType;
  model_sub_type: FileType;
}

export interface IImageBE extends IApiObject {
  name?: string;
  url: string;
  medium?: string;
  small?: string;
  thumb?: string;
  file_type_id?: FileType;
}

export interface IPaging {
  page?: number;
  perPage?: number;
}

export interface IAppConfig extends ISystemObject {
  supportedAreas: string[];
}

export interface IKeyValue {
  key: string;
  value: string;
}

export interface IUserBE extends IApiObject {
  name: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  website: string;
  address: string;
  birth_day: number;
  health_care_number?: string;
  location_id: number;
  user_location_id: number;
}
