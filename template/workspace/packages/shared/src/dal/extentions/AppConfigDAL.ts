import {
  DataListResponse,
  IKeyValue,
  IAppConfig,
  DataResponse,
  APIResponse,
} from "../../models";
import { BaseDAL } from "../BaseDAL";

export class AppConfigDAL extends BaseDAL {
  public getAlls() {
    return this.getList<DataListResponse<[IKeyValue]>, IAppConfig>(
      "/configuration/search"
    );
  }
  protected parseListResponse<BE, FE>(
    resp: DataResponse<DataListResponse<BE>>
  ) {
    if (resp.code === 0) {
      const values = resp.data.data as unknown as IKeyValue[];
      const locations = values.find((v) => v.key === "locations")?.value;
      const appConfig = {
        supportedAreas: locations ? (JSON.parse(locations) as string[]) : [],
      } as IAppConfig;
      return {
        data: appConfig,
      } as unknown as APIResponse<FE>;
    }
    return { code: resp.code, error: resp.message } as APIResponse<FE>;
  }
}
