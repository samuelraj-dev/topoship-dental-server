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
var ClinicAuth_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClinicAuth = exports.privateFields = void 0;
const typeorm_1 = require("typeorm");
const data_source_1 = require("../utils/data-source");
const Session_1 = require("./Session");
exports.privateFields = ['password', 'verification_code', 'password_reset_code', 'verified', 'activation'];
let ClinicAuth = ClinicAuth_1 = class ClinicAuth extends typeorm_1.BaseEntity {
    createSelfId() {
        return __awaiter(this, void 0, void 0, function* () {
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const currentMonth = currentDate.getMonth() + 1;
            const currCode = `${currentYear.toString().slice(2)}${currentMonth.toString().padStart(2, '0')}`;
            const latestSelf = yield data_source_1.AppDataSource
                .getRepository(ClinicAuth_1)
                .createQueryBuilder('clinic_auth')
                .orderBy('clinic_auth.created_at', 'DESC')
                .getOne();
            let nextId;
            if (latestSelf) {
                const lastSelfId = latestSelf.clinic_auth_id;
                const lastSelfCode = lastSelfId.substring(4, 8);
                if (lastSelfCode === currCode) {
                    const lastSelfNum = parseInt(lastSelfId.substring(8), 10);
                    const nextSelfNum = lastSelfNum + 1;
                    nextId = `USR_${currCode}${nextSelfNum.toString().padStart(4, '0')}`;
                }
                else {
                    nextId = `USR_${currCode}0001`;
                }
            }
            else {
                nextId = `USR_${currCode}0001`;
            }
            console.log(nextId);
            this.clinic_auth_id = nextId;
        });
    }
};
exports.ClinicAuth = ClinicAuth;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'varchar', length: 20, unique: true, nullable: false }),
    __metadata("design:type", String)
], ClinicAuth.prototype, "clinic_auth_id", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Session_1.Session, session => session.clinic_auth),
    __metadata("design:type", Array)
], ClinicAuth.prototype, "sessions", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, unique: true, nullable: false }),
    __metadata("design:type", String)
], ClinicAuth.prototype, "registration_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false, nullable: false }),
    __metadata("design:type", Boolean)
], ClinicAuth.prototype, "activation", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, unique: true, nullable: false }),
    __metadata("design:type", String)
], ClinicAuth.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, unique: true, nullable: false }),
    __metadata("design:type", String)
], ClinicAuth.prototype, "phone_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: false }),
    __metadata("design:type", String)
], ClinicAuth.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: false }),
    __metadata("design:type", String)
], ClinicAuth.prototype, "verification_code", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", Object)
], ClinicAuth.prototype, "password_reset_code", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false, nullable: false }),
    __metadata("design:type", Boolean)
], ClinicAuth.prototype, "verified", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], ClinicAuth.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], ClinicAuth.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClinicAuth.prototype, "createSelfId", null);
exports.ClinicAuth = ClinicAuth = ClinicAuth_1 = __decorate([
    (0, typeorm_1.Entity)('clinic_auth')
], ClinicAuth);
//# sourceMappingURL=ClinicAuth.js.map