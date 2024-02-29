import { Request, Response } from "express";

import { 
  getClinicUser,
} from "./clinicUser.service";

export async function getClinicUserHandler(req: Request, res: Response) {

  const appointment = await getClinicUser({ id: req.params.id });
  if(!appointment) { return res.sendStatus(404); }
  return res.status(200).json(appointment);
}