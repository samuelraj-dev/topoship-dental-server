import { AppDataSource } from "../../../utils/data-source";
import { Medicine } from "../../../entity/MstMedicine";
// import { CreatePatientInput } from "./appointment.schema";

export async function getAllMedicine()
{
  try {
    
    const data = await AppDataSource
      .getRepository(Medicine)
      .createQueryBuilder("master_medicine")
      .getMany();

    return data;

  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getMedicine({ id }: { id: string })
{
  try {
    const data = await AppDataSource
    .getRepository(Medicine)
    .createQueryBuilder("master_medicine")
    .where("master_medicine.medicine_id = :id", { id })
    .getOne();

    return data;

  } catch (error: any) {
    throw new Error(error);
  }
}

export async function createMedicine(
  selfInput: Medicine
) {
  try {    

    const utcTime = (new Date()).getTime();
    const offset = 5.5 * 60 * 60 * 1000;
    const utcDate = new Date(utcTime);
    const istDate = new Date(utcTime + offset);

    const newSelf: Medicine = new Medicine();

    // newSelf.medicine_id = selfInput.medicine_id;
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

    await AppDataSource.manager.save(newSelf);
    console.log(istDate.toISOString());
    console.log(utcDate.toISOString());

    const data = await AppDataSource
      .getRepository(Medicine)
      .createQueryBuilder("master_medicine")
      .where("master_medicine.created_at = :created_at", { created_at: istDate.toISOString().replace(/\.\d+/, ".000") })
      .getOne();

      console.log(data);

    return data;
    
  } catch (error: any) {

    throw new Error(error.message);
    
  }
}

export async function updateMedicine(
  selfInput: Medicine,
  id: string,
) {
  try {    

    const utcTime = (new Date()).getTime();
    const utcDate = new Date(utcTime);

    const self = await AppDataSource
      .getRepository(Medicine)
      .createQueryBuilder('master_medicine')
      .where("master_medicine.medicine_id = :id", { id })
      .getOne()

    if(!self) throw new Error('Medicine not found');

    self.medicine_name = selfInput.medicine_name;
    self.description = selfInput.description;
    self.manufacturer = selfInput.manufacturer;
    self.unit_price = selfInput.unit_price;
    self.stock_quantity = selfInput.stock_quantity;
    self.is_prescription_required = selfInput.is_prescription_required;
    self.dental_use = selfInput.dental_use;
    self.requires_refrigeration = selfInput.requires_refrigeration;
    self.morning_dose = selfInput.morning_dose;
    self.afternoon_dose = selfInput.afternoon_dose;
    self.night_dose = selfInput.night_dose;
    self.meal_relation = selfInput.meal_relation;
    self.dosing_days = selfInput.dosing_days;
    self.dosing_instructions = selfInput.dosing_instructions;
    self.updated_at = utcDate;

    return await AppDataSource.manager.save(self);
    
  } catch (error: any) {

    throw new Error(error.message);
    
  }
}

export async function deleteMedicine(
  id: string,
) {
  try {
    const result = await AppDataSource.getRepository(Medicine)
      .delete(id);

    if (result.affected === 0) {
      return { message: 'Patient not found' };
    } else {
      return { message: 'Success' };
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
}