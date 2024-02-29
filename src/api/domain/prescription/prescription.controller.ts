import { Request, Response } from "express";

import { 
  getAllPrescription,
  getPrescription,
  createPrescription,
  // updateAppointment,
  // deleteAppointment
} from "./prescription.service";

export async function getAllPrescriptionHandler(req: Request, res: Response) {

    const prescriptions = await getAllPrescription();
    if (!prescriptions) { return res.sendStatus(404); }
    return res.status(200).json(prescriptions);
}

export async function getPrescriptionHandler(req: Request, res: Response) {

  const prescription = await getPrescription({ id: req.params.id });
  if(!prescription) { return res.sendStatus(404); }
  return res.status(200).json(prescription);
}

export async function createPrescriptionHandler(req: Request, res: Response) {

  const prescription = await createPrescription(req.body, req.params.id);
  if (!prescription) { return res.status(404).json(prescription); }
  return res.status(200).json({ message: 'Prescription Created...', prescription });
  
}

// export async function updatePrescriptionHandler(req: Request, res: Response) {
//   const patient = await updateAppointment(req.body, req.params.id);
//   if (!patient) { return res.sendStatus(404); }
//   return res.status(200).json({ message: 'Appointment Updated...', patient });
// }

// export async function deletePrescriptionHandler(req: Request, res: Response) {
//   const patient = await deleteAppointment(req.params.id);
//   if (!patient) { return res.sendStatus(404); }
//   return res.status(200).json({ message: 'Appointment Deleted...', patient });
  
// }