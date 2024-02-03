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
var Appointment_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appointment = void 0;
const typeorm_1 = require("typeorm");
const data_source_1 = require("../utils/data-source");
let Appointment = Appointment_1 = class Appointment extends typeorm_1.BaseEntity {
    createPatientId() {
        return __awaiter(this, void 0, void 0, function* () {
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const currentMonth = currentDate.getMonth() + 1;
            const currCode = `${currentYear.toString().slice(2)}${currentMonth.toString().padStart(2, '0')}`;
            const latestAppointment = yield data_source_1.AppDataSource
                .getRepository(Appointment_1)
                .createQueryBuilder('appointment')
                .orderBy('appointment.created_at', 'DESC')
                .getOne();
            let nextId;
            if (latestAppointment) {
                const lastAppointmentId = latestAppointment.appointment_id;
                const lastAppointmentCode = lastAppointmentId.substring(4, 8);
                if (lastAppointmentCode === currCode) {
                    const lastAppointmentNum = parseInt(lastAppointmentId.substring(8), 10);
                    const nextAppointmentNum = lastAppointmentNum + 1;
                    nextId = `APP_${currCode}${nextAppointmentNum.toString().padStart(4, '0')}`;
                }
                else {
                    nextId = `APP_${currCode}0001`;
                }
            }
            else {
                nextId = `APP_${currCode}0001`;
            }
            this.appointment_id = nextId;
        });
    }
};
exports.Appointment = Appointment;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], Appointment.prototype, "appointment_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], Appointment.prototype, "doctor_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], Appointment.prototype, "patient_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], Appointment.prototype, "patient_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Appointment.prototype, "appointment_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time' }),
    __metadata("design:type", String)
], Appointment.prototype, "appointment_time", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Appointment.prototype, "visit_purpose", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Appointment.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Appointment.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Appointment.prototype, "createPatientId", null);
exports.Appointment = Appointment = Appointment_1 = __decorate([
    (0, typeorm_1.Entity)({ name: 'doctor_master' })
], Appointment);
//# sourceMappingURL=TrnTreatmentDetail.js.map