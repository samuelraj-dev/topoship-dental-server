import { Request, Response, } from "express";

// import {
//   // registerClinic,
//   // createClinic,
//   // getClinicById,
//   // getClinicData,
// } from "./register.service";

import { registerClinic, verifyClinic } from "./register.service";

import { AppDataSource } from "../../../../utils/data-source"
import { ClinicUser } from "../../../../entity/ClinicUser";
import { ClinicInfo } from "../../../../entity/ClinicInfo";
// import sendMail from "../../../../utils/mailer";

interface RegisterClinicResponse {
  success: boolean,
  message: string,
  errorCode: number,
}

export async function registerClinicHandler(req: Request, res: Response) {

  if(!req.params.registration_number) {
    return res.status(401).json({ success: false, message: "Not allowed to register" });
  }

  const clinicInfo = await AppDataSource
    .getRepository(ClinicInfo)
    .createQueryBuilder("clinic_info")
    .where("clinic_info.registration_number = :registration_number", { registration_number: req.params.registration_number })
    .getOne();
  
  if(!clinicInfo) {
    return res.status(401).json({ success: false, message: "Not allowed to register" });
  }

  if(clinicInfo.email !== req.body.email || clinicInfo.phone_number !== req.body.phone_number) {
    return res.status(401).json({ success: false, message: "Invalid input" });
  }

  if(clinicInfo?.activation && clinicInfo.verified) {
    return res.status(403).json({ success: false, message: "Already registered" });
  }

  if(clinicInfo?.activation && !clinicInfo.verified) {
    return res.status(403).json({ success: false, message: "Go to verification page" });
  }
  // @ts-ignore
  if(!req.file) {
    // @ts-ignore
    console.log(req.file);
    console.log(req.body)
    return res.status(403).json({ success: false, message: "Internal image process problem" });
  }
  console.log(req.file);

  const response = await registerClinic({ registrationNumber: req.params.registration_number ,clinicInfoInput: req.body, doctorName: req.body.doctor_name, specialization: req.body.specialization, password: req.body.password });
  return res.status(response.code).json({ success: response.success, message: response.message });
}

export async function verifyClinicHandler(req: Request, res: Response) {
  if(!req.params.registration_number) {
    return res.status(401).json({ success: false, message: "Invalid Request0" });
  }

  const clinicInfo = await AppDataSource
    .getRepository(ClinicInfo)
    .createQueryBuilder("clinic_info")
    .where("clinic_info.registration_number = :registration_number", { registration_number: req.params.registration_number })
    .getOne();
  
  if(!clinicInfo) {
    return res.status(401).json({ success: false, message: "Invalid Request1" });
  }

  if(clinicInfo?.activation && clinicInfo.verified) {
    return res.status(403).json({ success: false, message: "Invalid Request2" });
  }

  const response = await verifyClinic({ registrationNumber: req.params.registration_number, clinicVerifyInput: req.body });
  // @ts-ignore
  return res.status(response.code).json({ success: response.success, message: response.message });
}

// export async function createClinicHandler(req: Request, res: Response) {
// // export async function createPatientHandler(req: Request<{}, {}, CreatePatientInput["body"]>, res: Response) {
  
//   const clinic = await createClinic(req.body);
//   if(!clinic) { return res.sendStatus(404); }
//   return res.status(200).json(clinic);
  
// }

// export async function registerClinicHandler(req: Request, res: Response) {

//   const clinicAuth = await checkClinic(req.body);
//   if (!clinicAuth?.success) {
//     return res.status(404).json(clinicAuth);
//   }

//   await sendMail({
//     from: "test@test.com",
//     // @ts-ignore
//     to: clinicAuth.data.email,
//     subject: "Please verify your account",
//     text: `Verification code: ${clinicAuth.data?.verification_code}. Id: ${clinicAuth.data?.clinic_auth_id}`
//   })

//   return res.status(200).json(clinicAuth);

// }

// export async function verifyClinicHandler(req: Request, res: Response) {
//   const { id, verificationCode } = req.params;

//   // find user by id
//   const clinicUser = await getClinicById(id);

//   if(!clinicUser) {
//     return res.status(404).json({ success: false, message: 'Couldn\'t verify user' });
//   }

//   // check to see if the are already verified
//   if(clinicUser.verified) {
//     return res.status(404).json({ success: false, message: 'User already verified' });
//   }

//   // check to see if the verification code matches
//   if(clinicUser.verification_code === verificationCode) {
//     clinicUser.verified = true;
//     await AppDataSource.manager.save(clinicUser);
//     return res.status(200).json({ success: true, message: 'User verified successfully' });
//   }

//   return res.status(500).json({ success: false, message: 'Couldn\'t verify user' });
// }

// export async function getClinicDataHandler(req: Request, res: Response) {

//   const { phone_number, email, registration_number, clinic_data, password } = req.body;

//   const clinicAuth: { success: boolean, message?: string, data?: ClinicAuth } = await checkClinic({ phone_number, email, registration_number });
//   if (!clinicAuth.success) {
//     return res.status(404).json(clinicAuth);
//   }

//   const data = await getClinicData({ clinic_data, password, phone_number });

//   if(!data) {
//     return res.status(500).json({ success: false, message: "Couldn't save data" })
//   }

//   return res.status(200).json(data);
// }
