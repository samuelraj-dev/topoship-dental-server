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
exports.resetPassword = exports.getClinicByEmail = void 0;
const uuid_1 = require("uuid");
const data_source_1 = require("../../../../utils/data-source");
const ClinicAuth_1 = require("../../../../entity/ClinicAuth");
function getClinicByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield data_source_1.AppDataSource
            .getRepository(ClinicAuth_1.ClinicAuth)
            .createQueryBuilder("clinic_auth")
            .where("clinic_auth.email = :email", { email })
            .getOne();
        return data;
    });
}
exports.getClinicByEmail = getClinicByEmail;
function resetPassword(clinicAuthInput) {
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
exports.resetPassword = resetPassword;
//# sourceMappingURL=resetPassword.service.js.map