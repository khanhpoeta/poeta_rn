import axios from 'axios';
import {authClient} from './HttpClient';
import Config from 'react-native-config';
import {APIResponse, DataListResponse, DataResponse} from '../models';

/// <reference />
export abstract class BaseDAL {
  async getList<BE, FE>(url: string, params?: object) {
    try {
      const resp = await authClient.get<DataResponse<DataListResponse<BE>>>(
        url,
        {params: params},
      );
      return this.parseListResponse<BE, FE>(resp.data);
    } catch (error: any) {
      return {error: error} as APIResponse<FE>;
    }
  }

  protected async get<BE, FE>(url: string, params?: object) {
    try {
      const resp = await authClient.get<DataResponse<BE>>(url, {
        params: params,
      });
      return this.parseResponse<BE, FE>(resp.data);
    } catch (error: any) {
      return {error: error} as APIResponse<FE>;
    }
  }

  protected async post<BE, FE>(url: string, params?: object) {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const resp = await authClient.post<DataResponse<BE>>(url, params, config);
      return this.parseResponse<BE, FE>(resp.data);
    } catch (error: any) {
      return {error: error} as APIResponse<FE>;
    }
  }

  protected async postForm<BE, FE>(url: string, params?: FormData) {
    try {
      const abort = axios.CancelToken.source();
      const id = setTimeout(
        () => abort.cancel(`Timeout.`),
        Number(Config.API_REQUEST_TIMEOUT),
      );
      const resp = await authClient.post(url, params, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        cancelToken: abort.token,
      });
      clearTimeout(id);
      return this.parseResponse<BE, FE>(resp.data);
    } catch (error: any) {
      return {error: error} as APIResponse<FE>;
    }
  }

  protected async patch<BE, FE>(url: string, params?: object) {
    try {
      const resp = await authClient.patch<DataResponse<BE>>(url, params);
      return this.parseResponse<BE, FE>(resp.data);
    } catch (error: any) {
      return {error: error} as APIResponse<FE>;
    }
  }

  protected async put<BE, FE>(url: string, params?: object) {
    try {
      const resp = await authClient.put<DataResponse<BE>>(url, params);
      return this.parseResponse<BE, FE>(resp.data);
    } catch (error: any) {
      return {error: error} as APIResponse<FE>;
    }
  }

  protected parseResponse<BE, FE>(resp: DataResponse<BE>) {
    if (resp.code == 0) {
      const data = resp.data as unknown as FE;
      return {
        data,
      } as APIResponse<FE>;
    }
    return {code: resp.code, error: resp.message} as APIResponse<FE>;
  }

  protected parseListResponse<BE, FE>(
    resp: DataResponse<DataListResponse<BE>>,
  ) {
    if (resp.code == 0) {
      const data = resp.data as unknown as FE;
      return {
        data,
      } as APIResponse<FE>;
    }
    return {code: resp.code, error: resp.message} as APIResponse<FE>;
  }
}
