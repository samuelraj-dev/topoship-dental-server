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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = void 0;
const typeorm_1 = require("typeorm");
const ClinicAuth_1 = require("./ClinicAuth");
let Session = class Session extends typeorm_1.BaseEntity {
};
exports.Session = Session;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", String)
], Session.prototype, "session_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ClinicAuth_1.ClinicAuth, (clinic_auth) => clinic_auth.sessions, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'clinic_auth_id' }),
    __metadata("design:type", ClinicAuth_1.ClinicAuth)
], Session.prototype, "clinic_auth", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], Session.prototype, "valid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Session.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Session.prototype, "updated_at", void 0);
exports.Session = Session = __decorate([
    (0, typeorm_1.Entity)({ name: 'session' })
], Session);
//# sourceMappingURL=Session.js.map