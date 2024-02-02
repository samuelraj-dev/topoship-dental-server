import { Request, Response, } from "express";

import {
  checkClinic,
  createClinic,
  getClinicById,
  getClinicData,
} from "./register.service";

import { AppDataSource } from "../../../../utils/data-source"
import { ClinicData } from "../../../../entity/ClinicData";
import { ClinicAuth } from "../../../../entity/ClinicAuth";
import sendMail from "../../../../utils/mailer";

export async function createClinicHandler(req: Request, res: Response) {
// export async function createPatientHandler(req: Request<{}, {}, CreatePatientInput["body"]>, res: Response) {
  
  const clinic = await createClinic(req.body);
  if(!clinic) { return res.sendStatus(404); }
  return res.status(200).json(clinic);
  
}

export async function registerClinicHandler(req: Request, res: Response) {

  const clinicAuth = await checkClinic(req.body);
  if (!clinicAuth?.success) {
    return res.status(404).json(clinicAuth);
  }

  await sendMail({
    from: "test@test.com",
    // @ts-ignore
    to: clinicAuth.data.email,
    subject: "Please verify your account",
    text: `Verification code: ${clinicAuth.data?.verification_code}. Id: ${clinicAuth.data?.clinic_auth_id}`
  })

  return res.status(200).json(clinicAuth);

}

export async function verifyClinicHandler(req: Request, res: Response) {
  const { id, verificationCode } = req.params;

  // find user by id
  const clinicUser = await getClinicById(id);

  if(!clinicUser) {
    return res.status(404).json({ success: false, message: 'Couldn\'t verify user' });
  }

  // check to see if the are already verified
  if(clinicUser.verified) {
    return res.status(404).json({ success: false, message: 'User already verified' });
  }

  // check to see if the verification code matches
  if(clinicUser.verification_code === verificationCode) {
    clinicUser.verified = true;
    await AppDataSource.manager.save(clinicUser);
    return res.status(200).json({ success: true, message: 'User verified successfully' });
  }

  return res.status(404).json({ success: false, message: 'Couldn\'t verify user' });
}

export async function getClinicDataHandler(req: Request, res: Response) {

  const { phone_number, email, registration_number, clinic_data, password } = req.body;

  const clinicAuth: { success: boolean, message?: string, data?: ClinicAuth } = await checkClinic({ phone_number, email, registration_number });
  if (!clinicAuth.success) {
    return res.status(404).json(clinicAuth);
  }

  const data = await getClinicData({ clinic_data, password, phone_number });

  if(!data) {
    return res.status(500).json({ success: false, message: "Couldn't save data" })
  }

  return res.status(200).json(data);
}
