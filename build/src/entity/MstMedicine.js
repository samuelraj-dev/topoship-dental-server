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
var Medicine_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Medicine = void 0;
const typeorm_1 = require("typeorm");
const data_source_1 = require("../utils/data-source");
var MealRelation;
(function (MealRelation) {
    MealRelation["BEFORE"] = "before";
    MealRelation["AFTER"] = "after";
})(MealRelation || (MealRelation = {}));
let Medicine = Medicine_1 = class Medicine extends typeorm_1.BaseEntity {
    createSelfId() {
        return __awaiter(this, void 0, void 0, function* () {
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const currentMonth = currentDate.getMonth() + 1;
            const currCode = `${currentYear.toString().slice(2)}${currentMonth.toString().padStart(2, '0')}`;
            const latestSelf = yield data_source_1.AppDataSource
                .getRepository(Medicine_1)
                .createQueryBuilder('master_medicine')
                .orderBy('master_medicine.created_at', 'DESC')
                .getOne();
            let nextId;
            if (latestSelf) {
                const lastSelfId = latestSelf.medicine_id;
                const lastSelfCode = lastSelfId.substring(4, 8);
                if (lastSelfCode === currCode) {
                    const lastSelfNum = parseInt(lastSelfId.substring(8), 10);
                    const nextSelfNum = lastSelfNum + 1;
                    nextId = `MED_${currCode}${nextSelfNum.toString().padStart(4, '0')}`;
                }
                else {
                    nextId = `MED_${currCode}0001`;
                }
            }
            else {
                nextId = `MED_${currCode}0001`;
            }
            this.medicine_id = nextId;
        });
    }
};
exports.Medicine = Medicine;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], Medicine.prototype, "medicine_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], Medicine.prototype, "medicine_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Medicine.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 25, nullable: true }),
    __metadata("design:type", String)
], Medicine.prototype, "manufacturer", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Medicine.prototype, "unit_price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Medicine.prototype, "stock_quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Medicine.prototype, "is_prescription_required", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", String)
], Medicine.prototype, "dental_use", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Medicine.prototype, "requires_refrigeration", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Medicine.prototype, "morning_dose", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Medicine.prototype, "afternoon_dose", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Medicine.prototype, "night_dose", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: MealRelation, default: MealRelation.AFTER }),
    __metadata("design:type", String)
], Medicine.prototype, "meal_relation", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 3 }),
    __metadata("design:type", Number)
], Medicine.prototype, "dosing_days", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Medicine.prototype, "dosing_instructions", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Medicine.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Medicine.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Medicine.prototype, "createSelfId", null);
exports.Medicine = Medicine = Medicine_1 = __decorate([
    (0, typeorm_1.Entity)({ name: 'master_medicine' })
], Medicine);
//# sourceMappingURL=MstMedicine.js.map