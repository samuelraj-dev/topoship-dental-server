import { AppDataSource } from "../../../utils/data-source";
import { Appointment } from "../../../entity/TrnAppointment";
// import { Patient } from "../../../entity/MstPatient";
import { VisitTracker } from "../../../entity/VisitTracker";

export async function getAllVisit()
{
  try {
    
    const data = await AppDataSource
      .getRepository(VisitTracker)
      .createQueryBuilder("visit_tracker")
      .innerJoinAndSelect("visit_tracker.appointment", "appointment")
      .innerJoinAndSelect("appointment.patient", "patient")
      .getMany();

    return data;

  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getVisit({ id }: { id: string })
{
  try {
    const data = await AppDataSource
    .getRepository(VisitTracker)
    .createQueryBuilder("visit_tracker")
    .innerJoinAndSelect("visit_tracker.appointment", "appointment")
    .innerJoinAndSelect("appointment.patient", "patient")
    .where("visit_tracker.visit_id = :id", { id })
    .getOne();

    return data;

  } catch (error: any) {
    throw new Error(error);
  }
}

export async function createVisit(
  visitInput: VisitTracker,
  id: string,
) {
  try {    

    const utcTime = (new Date()).getTime();
    const offset = 5.5 * 60 * 60 * 1000;
    const utcDate = new Date(utcTime);
    const istDate = new Date(utcTime + offset);

    const newVisit: VisitTracker = new VisitTracker();

    const appointment = await AppDataSource
      .getRepository(Appointment)
      .createQueryBuilder("appointment")
      .innerJoinAndSelect("appointment.patient", "patient")
      .where("appointment.appointment_id = :id", { id })
      .getOne();

    if(!appointment) throw new Error('Appointment not found');

    newVisit.visit_type = visitInput.visit_type;
    newVisit.symptoms = visitInput.symptoms;
    newVisit.treatment_details = visitInput.treatment_details;
    newVisit.temperature = visitInput.temperature;
    newVisit.weight = visitInput.weight;
    newVisit.height = visitInput.height;
    newVisit.other_info = visitInput.other_info;
    newVisit.visit_mode = visitInput.visit_mode;
    newVisit.appointment = appointment;
    newVisit.created_at = utcDate;
    newVisit.updated_at = utcDate;

    const createdVisit = await AppDataSource.manager.save(newVisit);

    return createdVisit;
    
  } catch (error: any) {

    throw new Error(error.message);
    
  }
}

export async function updateVisit(
  visitInput: VisitTracker,
  id: string,
) {
  try {    

    const utcTime = (new Date()).getTime();
    const utcDate = new Date(utcTime);

    const visit = await AppDataSource
      .getRepository(VisitTracker)
      .createQueryBuilder("visit_tracker")
      // .innerJoinAndSelect("appointment.patient", "patient")
      .update(VisitTracker)
      .set({
        visit_type: visitInput.visit_type,
        visit_mode: visitInput.visit_mode,
        symptoms: visitInput.symptoms,
        treatment_details: visitInput.treatment_details,
        other_info: visitInput.other_info,
        temperature: visitInput.temperature,
        weight: visitInput.weight,
        height: visitInput.height,
        updated_at: utcDate,
      })
      .where("visit_tracker.visit_id = :id", { id })
      .execute();

    // if(!visit.affected) throw new Error('Visit not found');
    if(!visit.affected) return null;

    return visit;
    
  } catch (error: any) {

    throw new Error(error.message);
    
  }
}

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