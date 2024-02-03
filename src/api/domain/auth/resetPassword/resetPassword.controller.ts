import { Request, Response, } from "express";
import { v4 as uuidv4 } from "uuid";
import logger from "../../../../utils/logger";
import bcrypt from "bcrypt";
import config from "config";

import { AppDataSource } from "../../../../utils/data-source";
import sendMail from "../../../../utils/mailer";

import {
  getClinicByEmail,
  // resetPassword,
} from "./resetPassword.service";
import { getClinicById } from "../register/register.service";


export async function resetPasswordEmailHandler(req: Request, res: Response) {
// export async function createPatientHandler(req: Request<{}, {}, CreatePatientInput["body"]>, res: Response) {
  
  const { email } = req.body
  const message = "If user with that email is registered, you will recieve a password reset email";

  const clinicUser = await getClinicByEmail(email);
  if(!clinicUser) {
    logger.info(`User with email ${email} doesn't exist`);
    return res.status(200).json({ success: true, message });
  }

  if(!clinicUser.verified) {
    return res.status(404).json({ success: false, message: 'User is not verified yet' });
  }

  const passwordResetCode = uuidv4();

  clinicUser.password_reset_code = passwordResetCode;
  await AppDataSource.manager.save(clinicUser);

  await sendMail({
    from: "test@test.com",
    to: clinicUser.email,
    subject: "Reset your password",
    text: `Password reset code: ${passwordResetCode}. Id: ${clinicUser.clinic_auth_id}`
  })

  logger.info(`Password reset email sent to ${email}`);

  return res.status(200).json({ success: true, message });
  
}

export async function resetPasswordHandler(req: Request, res: Response) {
  const { id, passwordResetCode } = req.params;
  const { password } = req.body;

  const clinicUser = await getClinicById(id);

  if(!clinicUser || !clinicUser.password_reset_code || clinicUser.password_reset_code !== passwordResetCode) {
    return res.status(400).json({ success: false, message: 'Couldn\'t reset password' });
  }
  
  clinicUser.password_reset_code = null;

  // @ts-ignore
  const saltWorkFactor = config.get<number>('saltWorkFactor') || parseInt(process.env.SALT_WORK_FACTOR);
  const salt = await bcrypt.genSalt(saltWorkFactor);
  const hash = await bcrypt.hashSync(password, salt);
  clinicUser.password = hash;

  await AppDataSource.manager.save(clinicUser);

  return res.status(200).json({ success: true, message: 'Password reset success' })
}