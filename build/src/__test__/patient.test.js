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
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../utils/server"));
const connectDB_1 = __importDefault(require("../utils/connectDB"));
const data_source_1 = require("../utils/data-source");
const patient_service_1 = require("../api/domain/patient/patient.service");
const app = (0, server_1.default)();
const patientPayload = {
    "patient_name": "Google",
    "mobile": "1234567890",
    "email": "john.doe@example.com",
    "gender": "male",
    "dob": "1990-01-01",
    "age": 32,
    "emergency_mobile": "9876543210",
    "address": "123 Main Street",
    "city": "ExampleCity",
    "state": "andaman_and_nicobar_islands",
    "country": "india",
    "pincode": "400001",
    "blood_group": "A+",
    "current_medication": "None"
};
describe("patient", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, connectDB_1.default)();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.AppDataSource.destroy();
    }));
    describe("get patient route", () => {
        describe("given the product does not exist", () => {
            it("should return a 404", () => __awaiter(void 0, void 0, void 0, function* () {
                const patient_id = 'abc';
                yield (0, supertest_1.default)(app).get(`/api/patient/${patient_id}`).expect(404);
            }));
        });
        describe("given the product does exist", () => {
            it("should return a 200 status and the patient", () => __awaiter(void 0, void 0, void 0, function* () {
                const product = yield (0, patient_service_1.createPatient)(patientPayload);
                const { body, statusCode } = yield (0, supertest_1.default)(app)
                    .post(`/api/patient`);
                expect(statusCode).toBe(200);
                expect(body.message).toBe('Patient Created...');
            }));
        });
    });
});
//# sourceMappingURL=patient.test.js.map