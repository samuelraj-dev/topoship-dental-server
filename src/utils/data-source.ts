// DEFINE CREDs FOR TYPEORM

import config from "config";

// DATA SOURCE
import { DataSource } from "typeorm";

// ENTITIES
import { Patient } from "../entity/MstPatient";
import { Appointment } from "../entity/TrnAppointment";
import { VisitTracker } from "../entity/VisitTracker";
import { Prescription } from "../entity/Prescription";
import { Medicine } from "../entity/MstMedicine";
import { MedicineDetail } from "../entity/MedicineDetail";
import { ClinicAuth } from "../entity/ClinicAuth";
import { ClinicData } from "../entity/ClinicData";
import { ClinicUser } from "../entity/ClinicUser";
import { ClinicInfo } from "../entity/ClinicInfo";


export const AppDataSource = new DataSource({
  type: "mysql",
  host: config.get<string>('dbCred.host') || process.env.MYSQL_HOST,
  username: config.get<string>('dbCred.userName') || process.env.MYSQL_USER,
  password: config.get<string>('dbCred.password') || process.env.MYSQL_PASSWORD,
  database: config.get<string>('dbCred.dbName') || process.env.MYSQL_DATABASE,
  logging: true,
  // synchronize: true,
  entities: [ Patient, Appointment, VisitTracker, Prescription, Medicine, MedicineDetail, ClinicAuth, ClinicData, ClinicUser, ClinicInfo],
  timezone: 'local',
})