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
exports.getCurrentUserHandler = exports.refreshAccessTokenHandler = exports.deleteSessionHandler = exports.createSessionHandler = void 0;
const lodash_1 = require("lodash");
const jwt_1 = require("../../../../utils/jwt");
const register_service_1 = require("../register/register.service");
const login_service_1 = require("./login.service");
function createSessionHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield (0, login_service_1.getClinicUser)(req.body);
        if (!data.success) {
            return res.status(404).json(data);
        }
        ;
        const session = yield (0, login_service_1.createSession)(data.clinicAuth);
        const accessToken = (0, login_service_1.signAccessToken)(data.clinicAuth, session);
        const refreshToken = yield (0, login_service_1.signRefreshToken)(data.clinicAuth, session);
        res.cookie("accessToken", accessToken, {
            maxAge: 3.154e10,
            httpOnly: true,
            domain: 'localhost',
            path: '/',
            sameSite: "strict",
            secure: false,
        });
        res.cookie("refreshToken", refreshToken, {
            maxAge: 3.154e10,
            httpOnly: true,
            domain: 'localhost',
            path: '/',
            sameSite: "strict",
            secure: false,
        });
        return res.status(200).json({
            accessToken,
            refreshToken,
        });
    });
}
exports.createSessionHandler = createSessionHandler;
function deleteSessionHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const sessionId = res.locals.user.decoded.session.session_id;
        yield (0, login_service_1.updateSession)({ id: sessionId, valid: false });
        return res.send({
            accessToken: null,
            refreshToken: null,
        });
    });
}
exports.deleteSessionHandler = deleteSessionHandler;
function refreshAccessTokenHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const refreshToken = (0, lodash_1.get)(req, 'headers.x-refresh');
        const decoded = (0, jwt_1.verifyJwt)(refreshToken, "refreshTokenPublicKey");
        if (!decoded.valid || decoded.expired) {
            return res.status(401).json({ success: false, message: 'Couldn\'t refresh token1' });
        }
        console.log(decoded);
        const session = yield (0, login_service_1.getSessionById)(decoded.decoded.session.session_id);
        if (!session || !session.valid) {
            return res.status(401).json({ success: false, message: 'Couldn\'t refresh token2' });
        }
        const clinicUser = yield (0, register_service_1.getClinicById)(decoded.decoded.clinic_auth_id);
        if (!clinicUser) {
            return res.status(401).json({ success: false, message: 'Couldn\'t refresh token3' });
        }
        const accessToken = (0, login_service_1.signAccessToken)(clinicUser, session.session_id);
        return res.send({ accessToken });
    });
}
exports.refreshAccessTokenHandler = refreshAccessTokenHandler;
function getCurrentUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        return res.send(res.locals.user);
    });
}
exports.getCurrentUserHandler = getCurrentUserHandler;
//# sourceMappingURL=login.controller.js.map