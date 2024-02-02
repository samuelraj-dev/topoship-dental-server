// INSERT INTO `clinic_auth`(`registration_number`, `activation`, `email`, `phone_number`, `password`) VALUES ('123', 0,'sam@gmail.com','9999999999','NA')
import bcrypt from "bcrypt";
import config from "config";
// import { nanoid } from "nanoid";
import { v4 as uuidv4 } from 'uuid';
// const ID = nanoid();
// console.log(ID);

import { AppDataSource } from "../../../../utils/data-source";
import { ClinicAuth } from "../../../../entity/ClinicAuth";
import { ClinicData } from "../../../../entity/ClinicData";

export async function getClinicByEmail(email: string) {
  const data = await AppDataSource
    .getRepository(ClinicAuth)
    .createQueryBuilder("clinic_auth")
    .where("clinic_auth.email = :email", { email })
    .getOne();

  return data;
}

export async function resetPassword(
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