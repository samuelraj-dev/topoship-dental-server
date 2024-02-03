"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const config_1 = __importDefault(require("config"));
const typeorm_1 = require("typeorm");
const MstPatient_1 = require("../entity/MstPatient");
const TrnAppointment_1 = require("../entity/TrnAppointment");
const MstMedicine_1 = require("../entity/MstMedicine");
const ClinicAuth_1 = require("../entity/ClinicAuth");
const ClinicData_1 = require("../entity/ClinicData");
const Session_1 = require("../entity/Session");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: config_1.default.get('dbCred.host') || process.env.MYSQL_HOST,
    username: config_1.default.get('dbCred.userName') || process.env.MYSQL_USER,
    password: config_1.default.get('dbCred.password') || process.env.MYSQL_PASSWORD,
    database: config_1.default.get('dbCred.dbName') || process.env.MYSQL_DATABASE,
    logging: true,
    entities: [MstPatient_1.Patient, TrnAppointment_1.Appointment, MstMedicine_1.Medicine, ClinicAuth_1.ClinicAuth, ClinicData_1.ClinicData, Session_1.Session],
    timezone: 'local',
});
//# sourceMappingURL=data-source.js.map