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
exports.getSessionById = exports.refreshAccessToken = exports.signRefreshToken = exports.signAccessToken = exports.updateSession = exports.createSession = exports.getClinicUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const lodash_1 = require("lodash");
const config_1 = __importDefault(require("config"));
const Session_1 = require("../../../../entity/Session");
const ClinicAuth_1 = require("../../../../entity/ClinicAuth");
const data_source_1 = require("../../../../utils/data-source");
const jwt_1 = require("../../../../utils/jwt");
const register_service_1 = require("../register/register.service");
function getClinicUser(loginInput) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { phone_number, password } = loginInput;
            const clinicAuth = yield data_source_1.AppDataSource
                .getRepository(ClinicAuth_1.ClinicAuth)
                .createQueryBuilder("clinic_auth")
                .where("clinic_auth.phone_number = :phone_number", { phone_number })
                .getOne();
            if (!clinicAuth) {
                return {
                    success: false,
                    message: "Invalid phone number or password",
                };
            }
            if (!clinicAuth.activation && clinicAuth.password == "NA") {
                return {
                    success: false,
                    message: "Please activate your account. Go to register"
                };
            }
            if (!clinicAuth.verified) {
                return {
                    success: false,
                    message: "Please verify your account to login"
                };
            }
            const isValid = yield bcrypt_1.default.compare(password, clinicAuth.password);
            if (!isValid) {
                return {
                    success: false,
                    message: "Invalid phone number or password",
                };
            }
            return {
                success: true,
                clinicAuth
            };
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
}
exports.getClinicUser = getClinicUser;
function createSession({ clinicAuth, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const session = new Session_1.Session();
        session.clinic_auth = clinicAuth;
        return yield data_source_1.AppDataSource.manager.save(session);
    });
}
exports.createSession = createSession;
function updateSession({ id, valid }) {
    return __awaiter(this, void 0, void 0, function* () {
        yield data_source_1.AppDataSource
            .getRepository(Session_1.Session)
            .createQueryBuilder("session")
            .update(Session_1.Session)
            .set({ valid })
            .where("session.session_id = :id", { id })
            .execute();
    });
}
exports.updateSession = updateSession;
function signAccessToken(clinicAuth, session) {
    const payload = (0, lodash_1.omit)(clinicAuth, ClinicAuth_1.privateFields);
    const accessToken = (0, jwt_1.signJwt)(Object.assign(Object.assign({}, payload), { session }), "accessTokenPrivateKey", {
        expiresIn: config_1.default.get('accessTokenTtl') || process.env.ACCESS_TOKEN_TTL,
    });
    return accessToken;
}
exports.signAccessToken = signAccessToken;
function signRefreshToken(clinicAuth, session) {
    return __awaiter(this, void 0, void 0, function* () {
        const payload = (0, lodash_1.omit)(clinicAuth, ClinicAuth_1.privateFields);
        const refreshToken = (0, jwt_1.signJwt)(Object.assign(Object.assign({}, payload), { session }), "refreshTokenPrivateKey", {
            expiresIn: config_1.default.get('refreshTokenTtl') || process.env.REFRESH_TOKEN_TTL,
        });
        return refreshToken;
    });
}
exports.signRefreshToken = signRefreshToken;
function refreshAccessToken(refreshToken) {
    return __awaiter(this, void 0, void 0, function* () {
        const decoded = (0, jwt_1.verifyJwt)(refreshToken, "refreshTokenPublicKey");
        if (!decoded)
            return false;
        if (!decoded.valid || decoded.expired)
            return false;
        const session = yield getSessionById(decoded.decoded.session.session_id);
        if (!session || !session.valid)
            return false;
        const clinicUser = yield (0, register_service_1.getClinicById)(decoded.decoded.clinic_auth_id);
        if (!clinicUser)
            return false;
        const accessToken = signAccessToken(clinicUser, session.session_id);
        return accessToken;
    });
}
exports.refreshAccessToken = refreshAccessToken;
function getSessionById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield data_source_1.AppDataSource
            .getRepository(Session_1.Session)
            .createQueryBuilder("session")
            .where("session.session_id = :id", { id })
            .getOne();
    });
}
exports.getSessionById = getSessionById;
//# sourceMappingURL=login.service.js.map