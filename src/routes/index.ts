// ALL ROUTES FOR THE APPLICATION

import { Express, Request, Response } from "express";
import requireUser from "../api/middleware/requireUser";

// PROD ROUTES
import patientRoutes from "../api/domain/patient/patient.routes";
import appointmentRoutes from "../api/domain/appointment/appointment.routes";
import medicineRoutes from "../api/domain/medicine/medicine.routes";

// AUTH ROUTES
import registerRoutes from "../api/domain/auth/register/register.routes";
import loginRoutes from "../api/domain/auth/login/login.routes";
import resetPasswordRoutes from "../api/domain/auth/resetPassword/resetPassword.routes";

export default function routes(app: Express)
{
  // TESTING
  app.get("/api/check", (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  // PROD ROUTES
  app.use("/api/patient", requireUser, patientRoutes);
  app.use("/api/appointment", requireUser, appointmentRoutes);
  app.use("/api/medicine", requireUser, medicineRoutes);

  // AUTH ROUTES
  app.use("/api/auth/register", registerRoutes);
  app.use("/api/auth/login", loginRoutes);
  app.use("/api/auth/reset-password", resetPasswordRoutes)
  
}