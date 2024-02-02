import { Request, Response } from "express";

import { 
  getAllPatient,
  getPatient,
  createPatient,
  updatePatient,
  deletePatient
} from "./patient.service";
import { PatientInput } from "./patient.schema";

export async function getAllPatientHandler(req: Request, res: Response) {

    const patients = await getAllPatient();
    if (!patients) { return res.sendStatus(404); }
    return res.status(200).json(patients);
}

export async function getPatientHandler(req: Request, res: Response) {

  const patient = await getPatient({ id: req.params.id });
  if(!patient) { return res.sendStatus(404); }
  return res.status(200).json(patient);
}

// export async function createPatientHandler(req: Request, res: Response) {
export async function createPatientHandler(req: Request<{}, {}, PatientInput["body"] >, res: Response) {

  // @ts-ignore
  const patient = await createPatient(req.body);
  if (!patient) { return res.sendStatus(404); }
  return res.status(200).json({ message: 'Patient Created...', patient });
  
}

export async function updatePatientHandler(req: Request, res: Response) {
  const patient = await updatePatient(req.body, req.params.id);
  if (!patient) { return res.sendStatus(404); }
  return res.status(200).json({ message: 'Patient Updated...', patient });
}

export async function deletePatientHandler(req: Request, res: Response) {
  const patient = await deletePatient(req.params.id);
  if (!patient) { return res.sendStatus(404); }
  return res.status(200).json({ message: 'Patient Deleted...', patient });
}