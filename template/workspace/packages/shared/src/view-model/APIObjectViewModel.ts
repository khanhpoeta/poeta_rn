import {IApiObject, ObjectStatus} from '../models/BackEndModels';

export class ApiObjectViewModel {
  public id?: number;
  public status?: ObjectStatus;

  public constructor(source: IApiObject | ApiObjectViewModel) {
    this.id = source.id;
    this.status = source.status;
  }
}
