"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const requireUser_1 = __importDefault(require("../api/middleware/requireUser"));
const patient_routes_1 = __importDefault(require("../api/domain/patient/patient.routes"));
const appointment_routes_1 = __importDefault(require("../api/domain/appointment/appointment.routes"));
const medicine_routes_1 = __importDefault(require("../api/domain/medicine/medicine.routes"));
const register_routes_1 = __importDefault(require("../api/domain/auth/register/register.routes"));
const login_routes_1 = __importDefault(require("../api/domain/auth/login/login.routes"));
const resetPassword_routes_1 = __importDefault(require("../api/domain/auth/resetPassword/resetPassword.routes"));
function routes(app) {
    app.get("/api/check", (req, res) => {
        res.sendStatus(200);
    });
    app.use("/api/patient", requireUser_1.default, patient_routes_1.default);
    app.use("/api/appointment", requireUser_1.default, appointment_routes_1.default);
    app.use("/api/medicine", requireUser_1.default, medicine_routes_1.default);
    app.use("/api/auth/register", register_routes_1.default);
    app.use("/api/auth/login", login_routes_1.default);
    app.use("/api/auth/reset-password", resetPassword_routes_1.default);
}
exports.default = routes;
//# sourceMappingURL=index.js.map