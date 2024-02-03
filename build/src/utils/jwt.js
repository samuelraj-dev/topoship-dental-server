"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = exports.signJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("config"));
const logger_1 = __importDefault(require("./logger"));
function signJwt(object, keyName, options) {
    const signingKey = config_1.default.get(`jwtKeys.${keyName}`);
    return jsonwebtoken_1.default.sign(object, signingKey, Object.assign(Object.assign({}, (options && options)), { algorithm: 'RS256' }));
}
exports.signJwt = signJwt;
function verifyJwt(token, keyName) {
    const publicKey = config_1.default.get(`jwtKeys.${keyName}`);
    try {
        const decoded = jsonwebtoken_1.default.verify(token, publicKey);
        logger_1.default.info("success");
        return {
            valid: true,
            expired: false,
            decoded,
        };
    }
    catch (e) {
        logger_1.default.error(e.message);
        return {
            valid: false,
            expired: e.message === "jwt expired",
            decoded: null,
        };
    }
}
exports.verifyJwt = verifyJwt;
//# sourceMappingURL=jwt.js.map