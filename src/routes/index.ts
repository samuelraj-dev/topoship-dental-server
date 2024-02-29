// ALL ROUTES FOR THE APPLICATION

import { Express, Request, Response } from "express";
import requireUser from "../api/middleware/requireUser";

// PROD ROUTES
import clinicUserRoutes from "../api/domain/clinicUser/clinicUser.routes";

import patientRoutes from "../api/domain/patient/patient.routes";
import appointmentRoutes from "../api/domain/appointment/appointment.routes";
import medicineRoutes from "../api/domain/medicine/medicine.routes";
import visitRoutes from "../api/domain/visit/visit.routes";
import prescriptionRoutes from "../api/domain/prescription/prescription.routes";
import medicineDetailRoutes from "../api/domain/medicineDetail/medicineDetail.routes";

// AUTH ROUTES
import registerRoutes from "../api/domain/auth/register/register.routes";
import loginRoutes from "../api/domain/auth/login/login.routes";
import { authMiddleware } from "../api/middleware/auth.middleware";

export default function routes(app: Express)
{
  // TESTING
  app.get("/api/healthcheck", (req: Request, res: Response) => {
    res.sendStatus(200);
  });
  app.get("/api/authcheck", authMiddleware, (req: Request, res: Response) => {
    // @ts-ignore
    console.log(req.jwt);
    res.status(200).json({ success: true, message: "You are authorized" });
  })

  // PROD ROUTES
  app.use("/api/clinic-user", authMiddleware, clinicUserRoutes)

  app.use("/api/patient", authMiddleware, patientRoutes);
  app.use("/api/appointment", authMiddleware, appointmentRoutes);
  app.use("/api/medicine", authMiddleware, medicineRoutes);
  app.use("/api/visit", authMiddleware, visitRoutes);
  app.use("/api/prescription", authMiddleware, prescriptionRoutes);
  app.use("/api/medicineDetail", authMiddleware, medicineDetailRoutes);

  // AUTH ROUTES
  app.use("/api/auth/register", registerRoutes);
  app.use("/api/auth/login", loginRoutes);
  
}