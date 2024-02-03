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
var ClinicData_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClinicData = void 0;
const typeorm_1 = require("typeorm");
const data_source_1 = require("../utils/data-source");
let ClinicData = ClinicData_1 = class ClinicData extends typeorm_1.BaseEntity {
    createSelfId() {
        return __awaiter(this, void 0, void 0, function* () {
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const currentMonth = currentDate.getMonth() + 1;
            const currCode = `${currentYear.toString().slice(2)}${currentMonth.toString().padStart(2, '0')}`;
            const latestSelf = yield data_source_1.AppDataSource
                .getRepository(ClinicData_1)
                .createQueryBuilder('clinic_data')
                .orderBy('clinic_data.created_at', 'DESC')
                .getOne();
            let nextId;
            if (latestSelf) {
                const lastSelfId = latestSelf.clinic_id;
                const lastSelfCode = lastSelfId.substring(4, 8);
                if (lastSelfCode === currCode) {
                    const lastSelfNum = parseInt(lastSelfId.substring(8), 10);
                    const nextSelfNum = lastSelfNum + 1;
                    nextId = `CLI_${currCode}${nextSelfNum.toString().padStart(4, '0')}`;
                }
                else {
                    nextId = `CLI_${currCode}0001`;
                }
            }
            else {
                nextId = `CLI_${currCode}0001`;
            }
            this.clinic_id = nextId;
        });
    }
};
exports.ClinicData = ClinicData;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'varchar', length: 20, nullable: false }),
    __metadata("design:type", String)
], ClinicData.prototype, "clinic_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 150, nullable: false }),
    __metadata("design:type", String)
], ClinicData.prototype, "clinic_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], ClinicData.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: false }),
    __metadata("design:type", String)
], ClinicData.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: false }),
    __metadata("design:type", String)
], ClinicData.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, nullable: false }),
    __metadata("design:type", String)
], ClinicData.prototype, "phone_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], ClinicData.prototype, "is_active", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", Object)
], ClinicData.prototype, "accreditation_body", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], ClinicData.prototype, "registration_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Object)
], ClinicData.prototype, "accreditation_expiry_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], ClinicData.prototype, "additional_information", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], ClinicData.prototype, "is_two_factor_authentication_enabled", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], ClinicData.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], ClinicData.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClinicData.prototype, "createSelfId", null);
exports.ClinicData = ClinicData = ClinicData_1 = __decorate([
    (0, typeorm_1.Entity)('clinic_data')
], ClinicData);
//# sourceMappingURL=ClinicData.js.map