import { Entity, PrimaryColumn, Column, BaseEntity, BeforeInsert } from "typeorm";
import { AppDataSource } from "../utils/data-source";

enum MealRelation {
  BEFORE = 'before',
  AFTER = 'after'
}

@Entity({ name: 'master_medicine' })
//email, dob, age ,ecp, add, city, pc, bg, currmed - nullable
export class Medicine extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 20 })
  medicine_id!: string;

  @Column({ type: 'varchar', length: 50 })
  medicine_name!: string;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @Column({ type: 'varchar', length: 25, nullable: true })
  manufacturer!: string;

  @Column({ type: 'int' })
  unit_price!: number;

  @Column({ type: 'int', nullable: true })
  stock_quantity!: number;

  @Column({ type: 'boolean', default: false })
  is_prescription_required!: boolean;

  @Column({ type: 'varchar', length: 50, nullable: true })
  dental_use!: string;

  @Column({ type: 'boolean', default: false })
  requires_refrigeration!: boolean;

  @Column({ type: 'int', default: 0 })
  morning_dose!: number;

  @Column({ type: 'int', default: 0 })
  afternoon_dose!: number;

  @Column({ type: 'int', default: 0 })
  night_dose!: number;

  @Column({ type: 'enum', enum: MealRelation, default: MealRelation.AFTER })
  meal_relation!: MealRelation;

  @Column({ type: 'int', default: 3 })
  dosing_days!: number;

  @Column({ type: 'text', nullable: true })
  dosing_instructions!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at!: Date;

  @BeforeInsert()
  async createSelfId() {

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currCode = `${currentYear.toString().slice(2)}${currentMonth.toString().padStart(2, '0')}`;

    const latestSelf = await AppDataSource
      .getRepository(Medicine)
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
      } else {
        nextId = `MED_${currCode}0001`;
      }
    } else {
      nextId = `MED_${currCode}0001`;
    }

    this.medicine_id = nextId;
  }

}