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
exports.resetPasswordHandler = exports.resetPasswordEmailHandler = void 0;
const uuid_1 = require("uuid");
const logger_1 = __importDefault(require("../../../../utils/logger"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("config"));
const data_source_1 = require("../../../../utils/data-source");
const mailer_1 = __importDefault(require("../../../../utils/mailer"));
const resetPassword_service_1 = require("./resetPassword.service");
const register_service_1 = require("../register/register.service");
function resetPasswordEmailHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email } = req.body;
        const message = "If user with that email is registered, you will recieve a password reset email";
        const clinicUser = yield (0, resetPassword_service_1.getClinicByEmail)(email);
        if (!clinicUser) {
            logger_1.default.info(`User with email ${email} doesn't exist`);
            return res.status(200).json({ success: true, message });
        }
        if (!clinicUser.verified) {
            return res.status(404).json({ success: false, message: 'User is not verified yet' });
        }
        const passwordResetCode = (0, uuid_1.v4)();
        clinicUser.password_reset_code = passwordResetCode;
        yield data_source_1.AppDataSource.manager.save(clinicUser);
        yield (0, mailer_1.default)({
            from: "test@test.com",
            to: clinicUser.email,
            subject: "Reset your password",
            text: `Password reset code: ${passwordResetCode}. Id: ${clinicUser.clinic_auth_id}`
        });
        logger_1.default.info(`Password reset email sent to ${email}`);
        return res.status(200).json({ success: true, message });
    });
}
exports.resetPasswordEmailHandler = resetPasswordEmailHandler;
function resetPasswordHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, passwordResetCode } = req.params;
        const { password } = req.body;
        const clinicUser = yield (0, register_service_1.getClinicById)(id);
        if (!clinicUser || !clinicUser.password_reset_code || clinicUser.password_reset_code !== passwordResetCode) {
            return res.status(400).json({ success: false, message: 'Couldn\'t reset password' });
        }
        clinicUser.password_reset_code = null;
        const saltWorkFactor = config_1.default.get('saltWorkFactor') || parseInt(process.env.SALT_WORK_FACTOR);
        const salt = yield bcrypt_1.default.genSalt(saltWorkFactor);
        const hash = yield bcrypt_1.default.hashSync(password, salt);
        clinicUser.password = hash;
        yield data_source_1.AppDataSource.manager.save(clinicUser);
        return res.status(200).json({ success: true, message: 'Password reset success' });
    });
}
exports.resetPasswordHandler = resetPasswordHandler;
//# sourceMappingURL=resetPassword.controller.js.map