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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClinicData = exports.getClinicById = exports.checkClinic = exports.createClinic = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("config"));
const uuid_1 = require("uuid");
const data_source_1 = require("../../../../utils/data-source");
const ClinicAuth_1 = require("../../../../entity/ClinicAuth");
const ClinicData_1 = require("../../../../entity/ClinicData");
function createClinic(clinicAuthInput) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const utcTime = (new Date()).getTime();
            const offset = 5.5 * 60 * 60 * 1000;
            const utcDate = new Date(utcTime);
            const istDate = new Date(utcTime + offset);
            const newClinicAuth = new ClinicAuth_1.ClinicAuth();
            newClinicAuth.registration_number = clinicAuthInput.registration_number;
            newClinicAuth.activation = clinicAuthInput.activation;
            newClinicAuth.email = clinicAuthInput.email;
            newClinicAuth.phone_number = clinicAuthInput.phone_number;
            newClinicAuth.password = clinicAuthInput.password;
            newClinicAuth.verification_code = (0, uuid_1.v4)();
            newClinicAuth.password_reset_code = null;
            newClinicAuth.verified = false;
            newClinicAuth.created_at = utcDate;
            newClinicAuth.updated_at = utcDate;
            yield data_source_1.AppDataSource.manager.save(newClinicAuth);
            console.log(istDate.toISOString());
            console.log(utcDate.toISOString());
            const data = yield data_source_1.AppDataSource
                .getRepository(ClinicAuth_1.ClinicAuth)
                .createQueryBuilder("clinic_auth")
                .where("clinic_auth.created_at = :created_at", { created_at: istDate.toISOString().replace(/\.\d+/, ".000") })
                .getOne();
            console.log(data);
            return data;
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
}
exports.createClinic = createClinic;
function checkClinic({ registration_number, phone_number, email }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield data_source_1.AppDataSource
                .getRepository(ClinicAuth_1.ClinicAuth)
                .createQueryBuilder("clinic_auth")
                .where("clinic_auth.phone_number = :phone_number", { phone_number })
                .getOne();
            if (!data) {
                return {
                    success: false,
                    message: "Phone number didn't match",
                };
            }
            if ((data === null || data === void 0 ? void 0 : data.email) !== email) {
                return {
                    success: false,
                    message: "Email didn't match",
                };
            }
            if ((data === null || data === void 0 ? void 0 : data.registration_number) !== registration_number) {
                return {
                    success: false,
                    message: "Registration number didn't match",
                };
            }
            if (data.activation && data.password !== "NA") {
                return {
                    success: false,
                    message: "You've already registered. Go to login page"
                };
            }
            return {
                success: true,
                data
            };
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
}
exports.checkClinic = checkClinic;
function getClinicById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield data_source_1.AppDataSource
            .getRepository(ClinicAuth_1.ClinicAuth)
            .createQueryBuilder("clinic_auth")
            .where("clinic_auth.clinic_auth_id = :id", { id })
            .getOne();
        return data;
    });
}
exports.getClinicById = getClinicById;
function getClinicData({ clinic_data, password, phone_number }) {
    return __awaiter(this, void 0, void 0, function* () {
        const utcTime = (new Date()).getTime();
        const offset = 5.5 * 60 * 60 * 1000;
        const utcDate = new Date(utcTime);
        const istDate = new Date(utcTime + offset);
        const clinicData = new ClinicData_1.ClinicData();
        clinicData.clinic_name = clinic_data.clinic_name;
        clinicData.description = clinic_data.description;
        clinicData.address = clinic_data.address;
        clinicData.email = clinic_data.email;
        clinicData.phone_number = clinic_data.phone_number;
        clinicData.is_active = clinic_data.is_active;
        clinicData.accreditation_body = clinic_data.accreditation_body;
        clinicData.registration_date = clinic_data.registration_date;
        clinicData.accreditation_expiry_date = clinic_data.accreditation_expiry_date;
        clinicData.additional_information = clinic_data.additional_information;
        clinicData.is_two_factor_authentication_enabled = clinic_data.is_two_factor_authentication_enabled;
        clinicData.created_at = utcDate;
        clinicData.updated_at = utcDate;
        yield data_source_1.AppDataSource.manager.save(clinicData);
        const data = yield data_source_1.AppDataSource
            .getRepository(ClinicData_1.ClinicData)
            .createQueryBuilder("clinic_data")
            .where("clinic_data.created_at = :created_at", { created_at: istDate.toISOString().replace(/\.\d+/, ".000") })
            .getOne();
        const saltWorkFactor = config_1.default.get('saltWorkFactor') || parseInt(process.env.SALT_WORK_FACTOR);
        const salt = yield bcrypt_1.default.genSalt(saltWorkFactor);
        const hash = yield bcrypt_1.default.hashSync(password, salt);
        yield data_source_1.AppDataSource
            .createQueryBuilder()
            .update(ClinicAuth_1.ClinicAuth)
            .set({ activation: true, password: hash })
            .where("phone_number = :phone_number", { phone_number })
            .execute();
        return data;
    });
}
exports.getClinicData = getClinicData;
//# sourceMappingURL=register.service.js.map