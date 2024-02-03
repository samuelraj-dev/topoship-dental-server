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
exports.getClinicDataHandler = exports.verifyClinicHandler = exports.registerClinicHandler = exports.createClinicHandler = void 0;
const register_service_1 = require("./register.service");
const data_source_1 = require("../../../../utils/data-source");
const mailer_1 = __importDefault(require("../../../../utils/mailer"));
function createClinicHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const clinic = yield (0, register_service_1.createClinic)(req.body);
        if (!clinic) {
            return res.sendStatus(404);
        }
        return res.status(200).json(clinic);
    });
}
exports.createClinicHandler = createClinicHandler;
function registerClinicHandler(req, res) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const clinicAuth = yield (0, register_service_1.checkClinic)(req.body);
        if (!(clinicAuth === null || clinicAuth === void 0 ? void 0 : clinicAuth.success)) {
            return res.status(404).json(clinicAuth);
        }
        yield (0, mailer_1.default)({
            from: "test@test.com",
            to: clinicAuth.data.email,
            subject: "Please verify your account",
            text: `Verification code: ${(_a = clinicAuth.data) === null || _a === void 0 ? void 0 : _a.verification_code}. Id: ${(_b = clinicAuth.data) === null || _b === void 0 ? void 0 : _b.clinic_auth_id}`
        });
        return res.status(200).json(clinicAuth);
    });
}
exports.registerClinicHandler = registerClinicHandler;
function verifyClinicHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, verificationCode } = req.params;
        const clinicUser = yield (0, register_service_1.getClinicById)(id);
        if (!clinicUser) {
            return res.status(404).json({ success: false, message: 'Couldn\'t verify user' });
        }
        if (clinicUser.verified) {
            return res.status(404).json({ success: false, message: 'User already verified' });
        }
        if (clinicUser.verification_code === verificationCode) {
            clinicUser.verified = true;
            yield data_source_1.AppDataSource.manager.save(clinicUser);
            return res.status(200).json({ success: true, message: 'User verified successfully' });
        }
        return res.status(404).json({ success: false, message: 'Couldn\'t verify user' });
    });
}
exports.verifyClinicHandler = verifyClinicHandler;
function getClinicDataHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { phone_number, email, registration_number, clinic_data, password } = req.body;
        const clinicAuth = yield (0, register_service_1.checkClinic)({ phone_number, email, registration_number });
        if (!clinicAuth.success) {
            return res.status(404).json(clinicAuth);
        }
        const data = yield (0, register_service_1.getClinicData)({ clinic_data, password, phone_number });
        if (!data) {
            return res.status(500).json({ success: false, message: "Couldn't save data" });
        }
        return res.status(200).json(data);
    });
}
exports.getClinicDataHandler = getClinicDataHandler;
//# sourceMappingURL=register.controller.js.map