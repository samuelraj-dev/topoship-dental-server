import { Request, Response } from "express";

import { 
  getAllMedicine,
  getMedicine,
  createMedicine,
  // updatePatient,
  // deletePatient
} from "./medicine.service";

export async function getAllMedicineHandler(req: Request, res: Response) {

    const appointments = await getAllMedicine();
    if (!appointments) { return res.sendStatus(404); }
    return res.status(200).json(appointments);
}

export async function getMedicineHandler(req: Request, res: Response) {

  const appointment = await getMedicine({ id: req.params.id });
  if(!appointment) { return res.sendStatus(404); }
  return res.status(200).json(appointment);
}

export async function createMedicineHandler(req: Request, res: Response) {
// export async function createPatientHandler(req: Request<{}, {}, CreatePatientInput["body"]>, res: Response) {

  const patient = await createMedicine(req.body);
  if (!patient) { return res.sendStatus(404); }
  return res.status(200).json({ message: 'Patient Created...', patient });
  
}

export async function updateMedicineHandler(req: Request, res: Response) {
  
}

export async function deleteMedicineHandler(req: Request, res: Response) {
  
}