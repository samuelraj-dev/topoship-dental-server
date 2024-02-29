import { Request, Response } from "express";

import { 
  getAllVisit,
  getVisit,
  createVisit,
  updateVisit,
  // deleteAppointment
} from "./visit.service";

export async function getAllVisitHandler(req: Request, res: Response) {

    const visits = await getAllVisit();
    if (!visits) { return res.sendStatus(404); }
    return res.status(200).json(visits);
}

export async function getVisitHandler(req: Request, res: Response) {

  const visit = await getVisit({ id: req.params.id });
  if(!visit) { return res.sendStatus(404); }
  return res.status(200).json(visit);
}

export async function createVisitHandler(req: Request, res: Response) {

  const visit = await createVisit(req.body, req.params.id);
  if (!visit) { return res.status(404).json(visit); }
  return res.status(200).json({ message: 'Visit Created...', visit });
  
}

export async function updateVisitHandler(req: Request, res: Response) {
  const visit = await updateVisit(req.body, req.params.id);
  if (!visit) { return res.sendStatus(404); }
  return res.status(200).json({ message: 'Visit Updated...', visit });
}