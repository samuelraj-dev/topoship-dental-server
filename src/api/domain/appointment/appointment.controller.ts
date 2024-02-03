import { Request, Response } from "express";

import { 
  getAllAppointment,
  getAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment
} from "./appointment.service";

export async function getAllAppointmentHandler(req: Request, res: Response) {

    const appointments = await getAllAppointment();
    if (!appointments) { return res.sendStatus(404); }
    return res.status(200).json(appointments);
}

export async function getAppointmentHandler(req: Request, res: Response) {

  const appointment = await getAppointment({ id: req.params.id });
  if(!appointment) { return res.sendStatus(404); }
  return res.status(200).json(appointment);
}

export async function createAppointmentHandler(req: Request, res: Response) {
// export async function createPatientHandler(req: Request<{}, {}, CreatePatientInput["body"]>, res: Response) {

  const patient = await createAppointment(req.body);
  if (!patient) { return res.status(404).json(patient); }
  return res.status(200).json({ message: 'Appointment Created...', patient });
  
}

export async function updateAppointmentHandler(req: Request, res: Response) {
  const patient = await updateAppointment(req.body, req.params.id);
  if (!patient) { return res.sendStatus(404); }
  return res.status(200).json({ message: 'Appointment Updated...', patient });
}

export async function deleteAppointmentHandler(req: Request, res: Response) {
  const patient = await deleteAppointment(req.params.id);
  if (!patient) { return res.sendStatus(404); }
  return res.status(200).json({ message: 'Appointment Deleted...', patient });
  
}