"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAppointment = exports.updateAppointment = exports.createAppointment = exports.getAppointment = exports.getAllAppointment = void 0;
const data_source_1 = require("../../../utils/data-source");
const TrnAppointment_1 = require("../../../entity/TrnAppointment");
const MstPatient_1 = require("../../../entity/MstPatient");
function getAllAppointment() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield data_source_1.AppDataSource
                .getRepository(TrnAppointment_1.Appointment)
                .createQueryBuilder("appointment")
                .innerJoinAndSelect("appointment.patient", "patient")
                .orderBy({
                "appointment.appointment_date": "ASC",
                "appointment.appointment_time": "ASC",
            })
                .getMany();
            return data;
        }
        catch (error) {
            throw new Error(error);
        }
    });
}
exports.getAllAppointment = getAllAppointment;
function getAppointment({ id }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield data_source_1.AppDataSource
                .getRepository(TrnAppointment_1.Appointment)
                .createQueryBuilder("appointment")
                .innerJoinAndSelect("appointment.patient", "patient")
                .where("appointment.appointment_id = :id", { id })
                .getOne();
            return data;
        }
        catch (error) {
            throw new Error(error);
        }
    });
}
exports.getAppointment = getAppointment;
function createAppointment(appointmentInput) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const utcTime = (new Date()).getTime();
            const offset = 5.5 * 60 * 60 * 1000;
            const utcDate = new Date(utcTime);
            const istDate = new Date(utcTime + offset);
            const newAppointment = new TrnAppointment_1.Appointment();
            const patient = yield data_source_1.AppDataSource
                .getRepository(MstPatient_1.Patient)
                .createQueryBuilder("master_patient")
                .where("master_patient.patient_id = :id", { id: appointmentInput.patient_id })
                .getOne();
            if (!patient)
                throw new Error("patient not found");
            newAppointment.doctor_name = appointmentInput.doctor_name;
            newAppointment.patient_id = appointmentInput.patient_id;
            newAppointment.appointment_date = appointmentInput.appointment_date;
            newAppointment.appointment_time = appointmentInput.appointment_time;
            newAppointment.visit_purpose = appointmentInput.visit_purpose;
            newAppointment.patient = patient;
            newAppointment.created_at = utcDate;
            newAppointment.updated_at = utcDate;
            yield data_source_1.AppDataSource.manager.save(newAppointment);
            console.log(istDate.toISOString());
            console.log(utcDate.toISOString());
            const data = yield data_source_1.AppDataSource
                .getRepository(TrnAppointment_1.Appointment)
                .createQueryBuilder("appointment")
                .innerJoinAndSelect("appointment.patient", "patient")
                .where("appointment.created_at = :created_at", { created_at: istDate.toISOString().replace(/\.\d+/, ".000") })
                .getOne();
            console.log(data);
            yield data_source_1.AppDataSource.manager.save(patient);
            return data;
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
}
exports.createAppointment = createAppointment;
function updateAppointment(appointmentInput, id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const utcTime = (new Date()).getTime();
            const utcDate = new Date(utcTime);
            const data = yield data_source_1.AppDataSource
                .getRepository(TrnAppointment_1.Appointment)
                .createQueryBuilder("appointment")
                .innerJoinAndSelect("appointment.patient", "patient")
                .update(TrnAppointment_1.Appointment)
                .set({
                doctor_name: appointmentInput.doctor_name,
                patient_id: appointmentInput.patient_id,
                appointment_date: appointmentInput.appointment_date,
                appointment_time: appointmentInput.appointment_time,
                visit_purpose: appointmentInput.visit_purpose,
                patient: { patient_id: appointmentInput.patient_id },
                status: appointmentInput.status,
                updated_at: utcDate,
            })
                .where("appointment_id = :id", { id })
                .execute();
            console.log(data);
            return data;
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
}
exports.updateAppointment = updateAppointment;
function deleteAppointment(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield data_source_1.AppDataSource.getRepository(TrnAppointment_1.Appointment)
                .delete(id);
            if (result.affected === 0) {
                return { message: 'Appointment not found' };
            }
            else {
                return { message: 'Success' };
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
}
exports.deleteAppointment = deleteAppointment;
//# sourceMappingURL=appointment.service.js.map