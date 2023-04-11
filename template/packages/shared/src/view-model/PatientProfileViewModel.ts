import {
  IIsuranceImage,
  IPatchPatientProfile,
  IPostPatientProfile,
  IIsuranceImagePost,
} from "../models/BackEndModels";
import { IPatientProfile } from "../models/FrontEndModels";
import { ApiObjectViewModel } from "./APIObjectViewModel";

export class PatientProfileViewModel extends ApiObjectViewModel {
  first_name: string;
  last_name: string;
  relationships_code: string;
  birth_day?: number;
  health_care_number?: string;
  email: string;
  phone_number: string;
  address: string;
  user_location_id: number;
  relationships_name?: string;
  insurance_images?: IIsuranceImage[];

  constructor(source: PatientProfileViewModel | IPatientProfile) {
    super(source);
    this.id = source.id;
    this.first_name = source.first_name;
    this.last_name = source.last_name;
    this.relationships_code = source.relationships_code;
    this.birth_day = source.birth_day;
    this.health_care_number = source.health_care_number;
    this.email = source.email;
    this.phone_number = source.phone_number;
    this.address = source.address;
    this.insurance_images = source.insurance_images;
    this.user_location_id = source.user_location_id;
    this.relationships_name = source.relationships_name;
  }

  toCreatePatientProfile(): IPostPatientProfile {
    return {
      first_name: this.first_name,
      last_name: this.last_name,
      relationships_code: this.relationships_code,
      birth_day: this.birth_day,
      health_care_number: this.health_care_number,
      email: this.email,
      phone_number: this.phone_number,
      user_location_id: this.user_location_id,
      insurance_images: this.toIsuranceImagePost(),
    } as IPostPatientProfile;
  }

  toUpdatePatientProfile(): IPatchPatientProfile {
    return {
      id: this.id,
      first_name: this.first_name,
      last_name: this.last_name,
      relationships_code: this.relationships_code,
      birth_day: this.birth_day,
      health_care_number: this.health_care_number,
      email: this.email,
      phone_number: this.phone_number,
      user_location_id: this.user_location_id,
      insurance_images: this.toIsuranceImagePost(),
    } as IPatchPatientProfile;
  }

  private toIsuranceImagePost() {
    return this.insurance_images?.map(
      (img) =>
        <IIsuranceImagePost>{
          image_id: img.id,
          type: img.type,
        }
    );
  }

  static createFromExisting(source: PatientProfileViewModel | IPatientProfile) {
    return new PatientProfileViewModel(source);
  }

  static createFromExistingCollection(
    source: PatientProfileViewModel[] | IPatientProfile[]
  ) {
    return source.map((m) => {
      return this.createFromExisting(m);
    });
  }
}
