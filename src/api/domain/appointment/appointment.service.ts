import { AppDataSource } from "../../../utils/data-source";
import { Appointment } from "../../../entity/TrnAppointment";
import { Patient } from "../../../entity/MstPatient";
// import { CreatePatientInput } from "./appointment.schema";

export async function getAllAppointment()
{
  try {
    
    const data = await AppDataSource
      .getRepository(Appointment)
      .createQueryBuilder("appointment")
      .innerJoinAndSelect("appointment.patient", "patient")
      .orderBy({
        "appointment.appointment_date": "ASC",    // Sorting by date in ascending order
        "appointment.appointment_time": "ASC",    // Sorting by time in ascending order
      })
      .getMany();

    return data;

  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getAppointment({ id }: { id: string })
{
  try {
    const data = await AppDataSource
    .getRepository(Appointment)
    .createQueryBuilder("appointment")
    .innerJoinAndSelect("appointment.patient", "patient")
    .where("appointment.appointment_id = :id", { id })
    .getOne();

    return data;

  } catch (error: any) {
    throw new Error(error);
  }
}

export async function createAppointment(
  appointmentInput: Appointment
) {
  try {    

    const utcTime = (new Date()).getTime();
    const offset = 5.5 * 60 * 60 * 1000;
    const utcDate = new Date(utcTime);
    const istDate = new Date(utcTime + offset);

    const newAppointment: Appointment = new Appointment();

    const patient = await AppDataSource
    .getRepository(Patient)
    .createQueryBuilder("master_patient")
    .where("master_patient.patient_id = :id", { id: appointmentInput.patient_id })
    .getOne();

    console.log(`patient not found ${appointmentInput.patient_id}`)
    if(!patient) throw new Error('Patient not found');

    newAppointment.doctor_name = appointmentInput.doctor_name;
    newAppointment.patient_id = appointmentInput.patient_id;
    newAppointment.appointment_date = appointmentInput.appointment_date;
    newAppointment.appointment_time = appointmentInput.appointment_time;
    newAppointment.visit_purpose = appointmentInput.visit_purpose;
    newAppointment.patient = patient;
    newAppointment.created_at = utcDate;
    newAppointment.updated_at = utcDate;

    
    await AppDataSource.manager.save(newAppointment);
    console.log(istDate.toISOString());
    console.log(utcDate.toISOString());
    
    

    const data = await AppDataSource
      .getRepository(Appointment)
      .createQueryBuilder("appointment")
      .innerJoinAndSelect("appointment.patient", "patient")
      .where("appointment.created_at = :created_at", { created_at: istDate.toISOString().replace(/\.\d+/, ".000") })
      .getOne();

    console.log(data);

    // patient?.appointments = [data]

    await AppDataSource.manager.save(patient);

    return data;
    
  } catch (error: any) {

    throw new Error(error.message);
    
  }
}

export async function updateAppointment(
  appointmentInput: Appointment,
  id: string,
) {
  try {    

    const utcTime = (new Date()).getTime();
    const utcDate = new Date(utcTime);

    // const patient = await AppDataSource
    //   .getRepository(Patient)
    //   .createQueryBuilder("master_patient")
    //   .where("master_patient.patient_id = :id", { id: appointmentInput.patient_id })
    //   .getOne();

    // if(!patient) throw new Error("patient not found")

    const data = await AppDataSource
      .getRepository(Appointment)
      .createQueryBuilder("appointment")
      .innerJoinAndSelect("appointment.patient", "patient")
      .update(Appointment)
      .set({
        doctor_name: appointmentInput.doctor_name,
        patient_id: appointmentInput.patient_id,
        appointment_date: appointmentInput.appointment_date,
        appointment_time: appointmentInput.appointment_time,
        visit_purpose: appointmentInput.visit_purpose,
        patient: { patient_id: appointmentInput.patient_id },
        status: appointmentInput.status,
        updated_at: utcDate,
      })
      .where("appointment_id = :id", { id })
      .execute();

    console.log(data);

    // patient?.appointments = [data]

    // await AppDataSource.manager.save(patient);

    return data;
    
  } catch (error: any) {

    throw new Error(error.message);
    
  }
}


export async function deleteAppointment(
  id: string,
) {
  try {    

    const result = await AppDataSource.getRepository(Appointment)
      .delete(id);

    if (result.affected === 0) {
      return { message: 'Appointment not found' };
    } else {
      return { message: 'Success' };
    }
    
  } catch (error: any) {

    throw new Error(error.message);
    
  }
}





















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