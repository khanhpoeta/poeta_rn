import {IUser} from '../models/FrontEndModels';
import {ApiObjectViewModel} from './APIObjectViewModel';

export class PatientProfileViewModel extends ApiObjectViewModel {
  first_name: string;
  last_name: string;
  birth_day?: number;
  health_care_number?: string;
  email: string;
  phone_number: string;
  address: string;
  user_location_id: number;
  constructor(source: PatientProfileViewModel | IUser) {
    super(source);
    this.id = source.id;
    this.first_name = source.first_name;
    this.last_name = source.last_name;
    this.birth_day = source.birth_day;
    this.health_care_number = source.health_care_number;
    this.email = source.email;
    this.phone_number = source.phone_number;
    this.address = source.address;
    this.user_location_id = source.user_location_id;
  }

  static createFromExisting(source: PatientProfileViewModel | IUser) {
    return new PatientProfileViewModel(source);
  }

  static createFromExistingCollection(
    source: PatientProfileViewModel[] | IUser[],
  ) {
    return source.map(m => {
      return this.createFromExisting(m);
    });
  }
}
