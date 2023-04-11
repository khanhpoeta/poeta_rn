import { IImageId, IPrescriptionBE } from "./BackEndModels";
import { IPrescription } from "./FrontEndModels";

export function iPrescriptionBEMapper(
  prescription: IPrescription
): IPrescriptionBE {
  const patientProfile = prescription.patient_profile;
  const location = patientProfile?.location;
  const insuranceImages = patientProfile?.insurance_images?.map<IImageId>(
    (e) => ({
      id: e.id,
      type: e.type,
    })
  );
  const prescriptionImages = prescription.prescription_images
    ?.reduce((accumulator, cur) => {
      accumulator.push(`${cur.id}`);
      return accumulator;
    }, [] as string[])
    .join(",");

  return {
    location_id: patientProfile?.location_id,
    address: location?.address,
    city: location?.city,
    country: location?.country,
    image_insurance_ids: insuranceImages,
    image_prescription_ids: prescriptionImages ?? "",
    location_google_place_id: location?.google_place_id,
    location_lat: parseFloat(location?.lat ?? "0.0"),
    location_lng: parseFloat(location?.lng ?? "0.0"),
    location_name: location?.name,
    patient_email: patientProfile?.email,
    patient_insurance_ids: insuranceImages,
    patient_note: prescription.patient_note,
    patient_phone_number: patientProfile?.phone_number,
    postal_code: location?.postal_code,
    province: location?.province,
    patient_profile_id: patientProfile?.id,
    prescription_status_code:
      prescription.prescription_status_code?.toUpperCase(),
    id: prescription.id,
  } as IPrescriptionBE;
}
