// INSERT INTO `clinic_auth`(`registration_number`, `activation`, `email`, `phone_number`, `password`) VALUES ('123', 0,'sam@gmail.com','9999999999','NA')
import bcrypt from "bcrypt";
import config from "config";
import { v4 as uuidv4 } from 'uuid';

import { AppDataSource } from "../../../../utils/data-source";
import { ClinicAuth } from "../../../../entity/ClinicAuth";
import { ClinicData } from "../../../../entity/ClinicData";

export async function createClinic(
  clinicAuthInput: ClinicAuth
) {
  try {    

    const utcTime = (new Date()).getTime();
    const offset = 5.5 * 60 * 60 * 1000;
    const utcDate = new Date(utcTime);
    const istDate = new Date(utcTime + offset);

    const newClinicAuth: ClinicAuth = new ClinicAuth();

    newClinicAuth.registration_number = clinicAuthInput.registration_number;
    newClinicAuth.activation = clinicAuthInput.activation;
    newClinicAuth.email = clinicAuthInput.email;
    newClinicAuth.phone_number = clinicAuthInput.phone_number;
    newClinicAuth.password = clinicAuthInput.password;
    newClinicAuth.verification_code = uuidv4();
    newClinicAuth.password_reset_code = null;
    newClinicAuth.verified = false;
    newClinicAuth.created_at = utcDate;
    newClinicAuth.updated_at = utcDate;

    await AppDataSource.manager.save(newClinicAuth);
    console.log(istDate.toISOString());
    console.log(utcDate.toISOString());

    const data = await AppDataSource
      .getRepository(ClinicAuth)
      .createQueryBuilder("clinic_auth")
      .where("clinic_auth.created_at = :created_at", { created_at: istDate.toISOString().replace(/\.\d+/, ".000") })
      .getOne();

      console.log(data);

    return data;
    
  } catch (error: any) {

    throw new Error(error.message);
    
  }
}

export async function checkClinic(
  { registration_number, phone_number, email }: { registration_number: String, phone_number: string, email: String }
) {
  try {

    const data = await AppDataSource
      .getRepository(ClinicAuth)
      .createQueryBuilder("clinic_auth")
      .where("clinic_auth.phone_number = :phone_number", { phone_number })
      .getOne();

    if (!data) {
      return {
        success: false,
        message: "Phone number didn't match",
      };
    }

    if (data?.email !== email) {
      return {
        success: false,
        message: "Email didn't match",
      };
    }

    if (data?.registration_number !== registration_number) {
      return {
        success: false,
        message: "Registration number didn't match",
      };
    }

    if(data.activation && data.password !== "NA") {
      return {
        success: false,
        message: "You've already registered. Go to login page"
      }
    }

    return {
      success: true,
      data
    };
    
  } catch (error: any) {

    throw new Error(error.message);
    
  }
}

export async function getClinicById(id: string) {
  const data = await AppDataSource
    .getRepository(ClinicAuth)
    .createQueryBuilder("clinic_auth")
    .where("clinic_auth.clinic_auth_id = :id", { id })
    .getOne();

  return data;
}

export async function getClinicData(
  { clinic_data, password, phone_number }: { clinic_data: any, password: string, phone_number: string }
) {
  const utcTime = (new Date()).getTime();
  const offset = 5.5 * 60 * 60 * 1000;
  const utcDate = new Date(utcTime);
  const istDate = new Date(utcTime + offset);

  const clinicData = new ClinicData();

  clinicData.clinic_name = clinic_data.clinic_name;
  clinicData.description = clinic_data.description;
  clinicData.address = clinic_data.address;
  clinicData.email = clinic_data.email;
  clinicData.phone_number = clinic_data.phone_number;
  clinicData.is_active = clinic_data.is_active;
  clinicData.accreditation_body = clinic_data.accreditation_body;
  clinicData.registration_date = clinic_data.registration_date;
  clinicData.accreditation_expiry_date = clinic_data.accreditation_expiry_date;
  clinicData.additional_information = clinic_data.additional_information;
  clinicData.is_two_factor_authentication_enabled = clinic_data.is_two_factor_authentication_enabled;
  clinicData.created_at = utcDate;
  clinicData.updated_at = utcDate;
  // @ts-ignore
  // clinicData.clinic_auth = clinicAuth;
  await AppDataSource.manager.save(clinicData);

  const data = await AppDataSource
      .getRepository(ClinicData)
      .createQueryBuilder("clinic_data")
      .where("clinic_data.created_at = :created_at", { created_at: istDate.toISOString().replace(/\.\d+/, ".000") })
      .getOne();

  // @ts-ignore
  const saltWorkFactor = config.get<number>('saltWorkFactor') || parseInt(process.env.SALT_WORK_FACTOR);
  const salt = await bcrypt.genSalt(saltWorkFactor);
  const hash = await bcrypt.hashSync(password, salt);

  await AppDataSource
    .createQueryBuilder()
    .update(ClinicAuth)
    .set({ activation: true, password: hash })
    .where("phone_number = :phone_number", { phone_number })
    .execute()

    return data;
}