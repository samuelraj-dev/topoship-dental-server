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
exports.deletePatient = exports.updatePatient = exports.createPatient = exports.getPatient = exports.getAllPatient = void 0;
const data_source_1 = require("../../../utils/data-source");
const MstPatient_1 = require("../../../entity/MstPatient");
function getAllPatient() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield data_source_1.AppDataSource
                .getRepository(MstPatient_1.Patient)
                .createQueryBuilder("patient")
                .getMany();
            return data;
        }
        catch (error) {
            throw new Error(error);
        }
    });
}
exports.getAllPatient = getAllPatient;
function getPatient({ id }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield data_source_1.AppDataSource
                .getRepository(MstPatient_1.Patient)
                .createQueryBuilder("master_patient")
                .leftJoinAndSelect("master_patient.appointments", "appointments")
                .where("master_patient.patient_id = :id", { id })
                .getOne();
            return data;
        }
        catch (error) {
            throw new Error(error);
        }
    });
}
exports.getPatient = getPatient;
function createPatient(patientInput) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const utcTime = (new Date()).getTime();
            const offset = 5.5 * 60 * 60 * 1000;
            const utcDate = new Date(utcTime);
            const istDate = new Date(utcTime + offset);
            const newPatient = new MstPatient_1.Patient();
            newPatient.patient_name = patientInput.patient_name;
            newPatient.mobile = patientInput.mobile;
            newPatient.email = patientInput.email;
            newPatient.gender = patientInput.gender;
            newPatient.age = patientInput.age;
            newPatient.emergency_mobile = patientInput.emergency_mobile;
            newPatient.address = patientInput.address;
            newPatient.city = patientInput.city;
            newPatient.state = patientInput.state;
            newPatient.country = patientInput.country;
            newPatient.pincode = patientInput.pincode;
            newPatient.blood_group = patientInput.blood_group;
            newPatient.current_medication = patientInput.current_medication;
            newPatient.created_at = utcDate;
            newPatient.updated_at = utcDate;
            yield data_source_1.AppDataSource.manager.save(newPatient);
            console.log(istDate.toISOString());
            console.log(utcDate.toISOString());
            const data = yield data_source_1.AppDataSource
                .getRepository(MstPatient_1.Patient)
                .createQueryBuilder("master_patient")
                .where("master_patient.created_at = :created_at", { created_at: istDate.toISOString().replace(/\.\d+/, ".000") })
                .getOne();
            console.log(data);
            return data;
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
}
exports.createPatient = createPatient;
function updatePatient(patientInput, id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const utcTime = (new Date()).getTime();
            const utcDate = new Date(utcTime);
            const data = yield data_source_1.AppDataSource.getRepository(MstPatient_1.Patient)
                .createQueryBuilder()
                .update(MstPatient_1.Patient)
                .set({
                patient_name: patientInput.patient_name,
                mobile: patientInput.mobile,
                email: patientInput.email,
                gender: patientInput.gender,
                age: patientInput.age,
                emergency_mobile: patientInput.emergency_mobile,
                address: patientInput.address,
                city: patientInput.city,
                state: patientInput.state,
                country: patientInput.country,
                pincode: patientInput.pincode,
                blood_group: patientInput.blood_group,
                current_medication: patientInput.current_medication,
                updated_at: utcDate,
            })
                .where("patient_id = :id", { id })
                .execute();
            console.log(data);
            return data;
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
}
exports.updatePatient = updatePatient;
function deletePatient(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield data_source_1.AppDataSource.getRepository(MstPatient_1.Patient)
                .delete(id);
            if (result.affected === 0) {
                return { message: 'Patient not found' };
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
exports.deletePatient = deletePatient;
//# sourceMappingURL=patient.service.js.map