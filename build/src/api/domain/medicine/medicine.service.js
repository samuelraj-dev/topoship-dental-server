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
exports.createMedicine = exports.getMedicine = exports.getAllMedicine = void 0;
const data_source_1 = require("../../../utils/data-source");
const MstMedicine_1 = require("../../../entity/MstMedicine");
function getAllMedicine() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield data_source_1.AppDataSource
                .getRepository(MstMedicine_1.Medicine)
                .createQueryBuilder("master_medicine")
                .getMany();
            return data;
        }
        catch (error) {
            throw new Error(error);
        }
    });
}
exports.getAllMedicine = getAllMedicine;
function getMedicine({ id }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield data_source_1.AppDataSource
                .getRepository(MstMedicine_1.Medicine)
                .createQueryBuilder("master_medicine")
                .where("master_medicine.medicine_id = :id", { id })
                .getOne();
            return data;
        }
        catch (error) {
            throw new Error(error);
        }
    });
}
exports.getMedicine = getMedicine;
function createMedicine(selfInput) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const utcTime = (new Date()).getTime();
            const offset = 5.5 * 60 * 60 * 1000;
            const utcDate = new Date(utcTime);
            const istDate = new Date(utcTime + offset);
            const newSelf = new MstMedicine_1.Medicine();
            newSelf.medicine_name = selfInput.medicine_name;
            newSelf.description = selfInput.description;
            newSelf.manufacturer = selfInput.manufacturer;
            newSelf.unit_price = selfInput.unit_price;
            newSelf.stock_quantity = selfInput.stock_quantity;
            newSelf.is_prescription_required = selfInput.is_prescription_required;
            newSelf.dental_use = selfInput.dental_use;
            newSelf.requires_refrigeration = selfInput.requires_refrigeration;
            newSelf.morning_dose = selfInput.morning_dose;
            newSelf.afternoon_dose = selfInput.afternoon_dose;
            newSelf.night_dose = selfInput.night_dose;
            newSelf.meal_relation = selfInput.meal_relation;
            newSelf.dosing_days = selfInput.dosing_days;
            newSelf.dosing_instructions = selfInput.dosing_instructions;
            newSelf.created_at = utcDate;
            newSelf.updated_at = utcDate;
            yield data_source_1.AppDataSource.manager.save(newSelf);
            console.log(istDate.toISOString());
            console.log(utcDate.toISOString());
            const data = yield data_source_1.AppDataSource
                .getRepository(MstMedicine_1.Medicine)
                .createQueryBuilder("master_medicine")
                .where("master_medicine.created_at = :created_at", { created_at: istDate.toISOString().replace(/\.\d+/, ".000") })
                .getOne();
            console.log(data);
            return data;
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
}
exports.createMedicine = createMedicine;
//# sourceMappingURL=medicine.service.js.map