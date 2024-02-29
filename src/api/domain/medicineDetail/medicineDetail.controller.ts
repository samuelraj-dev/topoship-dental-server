import { Request, Response } from "express";

import { 
  getAllMedicineDetail,
  getMedicineDetail,
  createMedicineDetail,
  // updateAppointment,
  // deleteAppointment
} from "./medicineDetail.service";

export async function getAllMedicineDetailHandler(req: Request, res: Response) {

    const medicineDetail = await getAllMedicineDetail();
    if (!medicineDetail) { return res.sendStatus(404); }
    return res.status(200).json(medicineDetail);
}

export async function getMedicineDetailHandler(req: Request, res: Response) {

  const medicineDetail = await getMedicineDetail({ id: req.params.id });
  if(!medicineDetail) { return res.sendStatus(404); }
  return res.status(200).json(medicineDetail);
}

export async function createMedicineDetailHandler(req: Request, res: Response) {

  const medicineDetail = await createMedicineDetail(req.body, req.params.id);
  if (!medicineDetail) { return res.status(404).json(medicineDetail); }
  return res.status(200).json({ message: 'medicineDetail Created...', medicineDetail });
  
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