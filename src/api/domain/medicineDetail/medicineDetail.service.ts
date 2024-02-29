import { AppDataSource } from "../../../utils/data-source";
import { Appointment } from "../../../entity/TrnAppointment";
// import { Patient } from "../../../entity/MstPatient";
import { VisitTracker } from "../../../entity/VisitTracker";
import { Prescription } from "../../../entity/Prescription";
import { MedicineDetail } from "../../../entity/MedicineDetail";

export async function getAllMedicineDetail()
{
  try {
    
    const data = await AppDataSource
      .getRepository(MedicineDetail)
      .createQueryBuilder("medicine_detail")
      .innerJoinAndSelect("medicine_detail.prescription", "prescription")
      .getMany();

    return data;

  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getMedicineDetail({ id }: { id: string })
{
  try {
    const data = await AppDataSource
    .getRepository(MedicineDetail)
    .createQueryBuilder("medicine_detail")
    .innerJoinAndSelect("medicine_detail.prescription", "prescription")
    .where("medicine_detail.medicine_detail_id = :id", { id })
    .getOne();

    return data;

  } catch (error: any) {
    throw new Error(error);
  }
}

export async function createMedicineDetail(
  medicineDetailInput: MedicineDetail,
  id: string,
) {
  try {    

    const utcTime = (new Date()).getTime();
    const offset = 5.5 * 60 * 60 * 1000;
    const utcDate = new Date(utcTime);
    const istDate = new Date(utcTime + offset);

    const newMedicineDetail: MedicineDetail = new MedicineDetail();

    const prescription = await AppDataSource
      .getRepository(Prescription)
      .createQueryBuilder("prescription")
      .where("prescription.prescription_id = :id", { id })
      .getOne();

    if(!prescription) throw new Error('Prescription not found');

    newMedicineDetail.medicine_name = medicineDetailInput.medicine_name;
    newMedicineDetail.morning_dose = medicineDetailInput.morning_dose;
    newMedicineDetail.afternoon_dose = medicineDetailInput.afternoon_dose;
    newMedicineDetail.meal_relation = medicineDetailInput.meal_relation;
    newMedicineDetail.dosing_days = medicineDetailInput.dosing_days;
    newMedicineDetail.dosing_instructions = medicineDetailInput.dosing_instructions;
    newMedicineDetail.prescription = prescription;
    newMedicineDetail.created_at = utcDate;
    newMedicineDetail.updated_at = utcDate;

    const createdMedicineDetail = await AppDataSource.manager.save(newMedicineDetail);

    return createdMedicineDetail;
    
  } catch (error: any) {

    throw new Error(error.message);
    
  }
}

// export async function updateAppointment(
//   appointmentInput: Appointment,
//   id: string,
// ) {
//   try {    

//     const utcTime = (new Date()).getTime();
//     const utcDate = new Date(utcTime);

//     // const patient = await AppDataSource
//     //   .getRepository(Patient)
//     //   .createQueryBuilder("master_patient")
//     //   .where("master_patient.patient_id = :id", { id: appointmentInput.patient_id })
//     //   .getOne();

//     // if(!patient) throw new Error("patient not found")

//     const data = await AppDataSource
//       .getRepository(Appointment)
//       .createQueryBuilder("appointment")
//       .innerJoinAndSelect("appointment.patient", "patient")
//       .update(Appointment)
//       .set({
//         doctor_name: appointmentInput.doctor_name,
//         patient_id: appointmentInput.patient_id,
//         appointment_date: appointmentInput.appointment_date,
//         appointment_time: appointmentInput.appointment_time,
//         visit_purpose: appointmentInput.visit_purpose,
//         patient: { patient_id: appointmentInput.patient_id },
//         status: appointmentInput.status,
//         updated_at: utcDate,
//       })
//       .where("appointment_id = :id", { id })
//       .execute();

//     console.log(data);

//     // patient?.appointments = [data]

//     // await AppDataSource.manager.save(patient);

//     return data;
    
//   } catch (error: any) {

//     throw new Error(error.message);
    
//   }
// }


// export async function deleteAppointment(
//   id: string,
// ) {
//   try {    

//     const result = await AppDataSource.getRepository(Appointment)
//       .delete(id);

//     if (result.affected === 0) {
//       return { message: 'Appointment not found' };
//     } else {
//       return { message: 'Success' };
//     }
    
//   } catch (error: any) {

//     throw new Error(error.message);
    
//   }
// }





















// {
    //   patientId: "dummy",
    //   patientName: patient.patientName,
    //   patientMobile: patient.patientMobile,
    //   patientEmail: patient.patientEmail,
    //   patientGender: patient.patientGender,
    //   patientDob: patient.patientDob,
    //   patientAge: patient.patientAge,
    //   emergencyContactPhone: patient.emergencyContactPhone,
    //   address: patient.address,
    //   city: patient.city,
    //   state: patient.state,
    //   country: patient.country,
    //   pincode: patient.pincode,
    //   bloodGroup: patient.bloodGroup,
    //   currentMedication: patient.currentMedication,
    // }