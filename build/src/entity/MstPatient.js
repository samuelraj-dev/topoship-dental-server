"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var Patient_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Patient = exports.Country = exports.State = exports.Gender = void 0;
const typeorm_1 = require("typeorm");
const data_source_1 = require("../utils/data-source");
const TrnAppointment_1 = require("./TrnAppointment");
var Gender;
(function (Gender) {
    Gender["MALE"] = "male";
    Gender["FEMALE"] = "female";
    Gender["OTHER"] = "other";
})(Gender || (exports.Gender = Gender = {}));
var State;
(function (State) {
    State["AndhraPradesh"] = "andhra_pradesh";
    State["ArunachalPradesh"] = "arunachal_pradesh";
    State["Assam"] = "assam";
    State["Bihar"] = "bihar";
    State["Chhattisgarh"] = "chhattisgarh";
    State["Goa"] = "goa";
    State["Gujarat"] = "gujarat";
    State["Haryana"] = "haryana";
    State["HimachalPradesh"] = "himachal_pradesh";
    State["Jharkhand"] = "jharkhand";
    State["Karnataka"] = "karnataka";
    State["Kerala"] = "kerala";
    State["MadhyaPradesh"] = "madhya_pradesh";
    State["Maharashtra"] = "maharashtra";
    State["Manipur"] = "manipur";
    State["Meghalaya"] = "meghalaya";
    State["Mizoram"] = "mizoram";
    State["Nagaland"] = "nagaland";
    State["Odisha"] = "odisha";
    State["Punjab"] = "punjab";
    State["Rajasthan"] = "rajasthan";
    State["Sikkim"] = "sikkim";
    State["TamilNadu"] = "tamil_nadu";
    State["Telangana"] = "telangana";
    State["Tripura"] = "tripura";
    State["UttarPradesh"] = "uttar_pradesh";
    State["Uttarakhand"] = "uttarakhand";
    State["WestBengal"] = "west_bengal";
    State["AndamanAndNicobarIslands"] = "andaman_and_nicobar_islands";
    State["Chandigarh"] = "chandigarh";
    State["DadraAndNagarHaveliAndDamanAndDiu"] = "dadra_and_nagar_haveli_and_daman_and_diu";
    State["Lakshadweep"] = "lakshadweep";
    State["Delhi"] = "delhi";
    State["Puducherry"] = "puducherry";
})(State || (exports.State = State = {}));
var Country;
(function (Country) {
    Country["India"] = "india";
    Country["Other"] = "other";
})(Country || (exports.Country = Country = {}));
let Patient = Patient_1 = class Patient extends typeorm_1.BaseEntity {
    createPatientId() {
        return __awaiter(this, void 0, void 0, function* () {
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const currentMonth = currentDate.getMonth() + 1;
            const currCode = `${currentYear.toString().slice(2)}${currentMonth.toString().padStart(2, '0')}`;
            const latestPatient = yield data_source_1.AppDataSource
                .getRepository(Patient_1)
                .createQueryBuilder('patient')
                .orderBy('patient.created_at', 'DESC')
                .getOne();
            let nextId;
            if (latestPatient) {
                const lastPatientId = latestPatient.patient_id;
                const lastPatientCode = lastPatientId.substring(4, 8);
                if (lastPatientCode === currCode) {
                    const lastPatientNum = parseInt(lastPatientId.substring(8), 10);
                    const nextPatientNum = lastPatientNum + 1;
                    nextId = `PAT_${currCode}${nextPatientNum.toString().padStart(4, '0')}`;
                }
                else {
                    nextId = `PAT_${currCode}0001`;
                }
            }
            else {
                nextId = `PAT_${currCode}0001`;
            }
            this.patient_id = nextId;
        });
    }
};
exports.Patient = Patient;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], Patient.prototype, "patient_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 25 }),
    __metadata("design:type", String)
], Patient.prototype, "patient_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 45 }),
    __metadata("design:type", String)
], Patient.prototype, "mobile", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 25, nullable: true }),
    __metadata("design:type", Object)
], Patient.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: Gender }),
    __metadata("design:type", String)
], Patient.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', width: 3, nullable: true }),
    __metadata("design:type", Number)
], Patient.prototype, "age", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 45, nullable: true }),
    __metadata("design:type", Object)
], Patient.prototype, "emergency_mobile", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Patient.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 45, nullable: true }),
    __metadata("design:type", String)
], Patient.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: State }),
    __metadata("design:type", String)
], Patient.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: Country }),
    __metadata("design:type", String)
], Patient.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 10, nullable: true }),
    __metadata("design:type", String)
], Patient.prototype, "pincode", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 10, nullable: true }),
    __metadata("design:type", String)
], Patient.prototype, "blood_group", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Patient.prototype, "current_medication", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Patient.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Patient.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => TrnAppointment_1.Appointment, appointment => appointment.patient),
    __metadata("design:type", Array)
], Patient.prototype, "appointments", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Patient.prototype, "createPatientId", null);
exports.Patient = Patient = Patient_1 = __decorate([
    (0, typeorm_1.Entity)({ name: 'master_patient' })
], Patient);
//# sourceMappingURL=MstPatient.js.map