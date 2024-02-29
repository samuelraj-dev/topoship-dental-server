import { AppDataSource } from "../../../utils/data-source";
import { Patient, PatientInput } from "../../../entity/MstPatient";

export async function getPatientCount()
{
  try {
    
    const totalCount = await AppDataSource
      .getRepository(Patient)
      .count();

    const lastMonthCountRes = await AppDataSource
      .getRepository(Patient)
      .createQueryBuilder()
      .select("COUNT(*)", "count")
      .where(`EXTRACT(YEAR FROM created_at) = EXTRACT(YEAR FROM CURRENT_DATE)`)
      .andWhere(`EXTRACT(MONTH FROM created_at) = EXTRACT(MONTH FROM CURRENT_DATE)`)
      .getRawOne();

    const lastMonthCount = parseInt(lastMonthCountRes.count);

    return {totalCount, lastMonthCount};

  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getAllPatient()
{
  try {
    
    const data = await AppDataSource
      .getRepository(Patient)
      .createQueryBuilder("patient")
      .getMany();

    return data;

  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getPatient({ id }: { id: string })
{
  try {
    const data = await AppDataSource
    .getRepository(Patient)
    .createQueryBuilder("master_patient")
    .leftJoinAndSelect("master_patient.appointments", "appointments")
    .where("master_patient.patient_id = :id", { id })
    .getOne();

    return data;

  } catch (error: any) {
    throw new Error(error);
  }
}

export async function createPatient(
  patientInput: PatientInput
) {
  try {    

    const utcTime = (new Date()).getTime();
    const offset = 5.5 * 60 * 60 * 1000;
    const utcDate = new Date(utcTime);
    const istDate = new Date(utcTime + offset);

    const newPatient: Patient = new Patient();

    newPatient.patient_name = patientInput.patient_name;
    newPatient.mobile = patientInput.mobile;
    newPatient.email = patientInput.email;
    newPatient.gender = patientInput.gender;
    newPatient.age = patientInput.age;
    newPatient.emergency_mobile =  patientInput.emergency_mobile;
    newPatient.address = patientInput.address;
    newPatient.city = patientInput.city;
    newPatient.state = patientInput.state;
    newPatient.country = patientInput.country;
    newPatient.pincode =  patientInput.pincode;
    newPatient.blood_group = patientInput.blood_group;
    newPatient.current_medication =  patientInput.current_medication;
    newPatient.created_at = utcDate;
    newPatient.updated_at = utcDate;

    await AppDataSource.manager.save(newPatient);
    console.log(istDate.toISOString());
    console.log(utcDate.toISOString());

    const data = await AppDataSource
      .getRepository(Patient)
      .createQueryBuilder("master_patient")
      .where("master_patient.created_at = :created_at", { created_at: istDate.toISOString().replace(/\.\d+/, ".000") })
      .getOne();

      console.log(data);

    return data;
    
  } catch (error: any) {

    throw new Error(error.message);
    
  }
}


export async function updatePatient(
  patientInput: PatientInput,
  id: string
) {
  try {    

    const utcTime = (new Date()).getTime();
    const utcDate = new Date(utcTime);    

    const data = await AppDataSource.getRepository(Patient)
      .createQueryBuilder()
      .update(Patient)
      .set({
        patient_name: patientInput.patient_name,
        mobile: patientInput.mobile,
        email: patientInput.email,
        gender: patientInput.gender,
        age: patientInput.age,
        emergency_mobile:  patientInput.emergency_mobile,
        address: patientInput.address,
        city: patientInput.city,
        state: patientInput.state,
        country: patientInput.country,
        pincode:  patientInput.pincode,
        blood_group: patientInput.blood_group,
        current_medication:  patientInput.current_medication,
        updated_at: utcDate,
      })
      .where("patient_id = :id", { id })
      .execute();

    console.log(data);

    return data;
    
  } catch (error: any) {

    throw new Error(error.message);
    
  }
}


export async function deletePatient(
  id: string
) {
  try {

    const result = await AppDataSource.getRepository(Patient)
      .delete(id);

    if (result.affected === 0) {
      return { message: 'Patient not found' };
    } else {
      return { message: 'Success' };
    }
    
  } catch (error: any) {

    throw new Error(error.message);
    
  }
}