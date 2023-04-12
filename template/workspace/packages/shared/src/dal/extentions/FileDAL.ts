import { IUploadFile, IImageBE, IImage } from "../../models";
import { BaseDAL } from "../BaseDAL";

export class FileDAL extends BaseDAL {
  public upload(params: IUploadFile) {
    const formData = new FormData();
    formData.append("model_type", params?.model_type);
    formData.append("model_sub_type", params?.model_sub_type);
    formData.append("file", JSON.parse(JSON.stringify(params.file)));
    return this.postForm<IImageBE, IImage>("/file/upload", formData);
  }
}
