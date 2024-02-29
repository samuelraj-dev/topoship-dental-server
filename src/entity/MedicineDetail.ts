import { Entity, PrimaryColumn, Column, BaseEntity, BeforeInsert, ManyToOne } from "typeorm";
import { AppDataSource } from "../utils/data-source"
import { Prescription } from "./Prescription";

enum MealRelation {
    BEFORE = 'before',
    AFTER = 'after'
}

@Entity({ name: 'medicine_detail' })
export class MedicineDetail extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 20 })
  medicine_detail_id!: string;

  @ManyToOne(() => Prescription, prescription => prescription.medicines, { onDelete: 'SET NULL' })
  prescription!: Prescription;

  @Column({ type: 'varchar', length: 50 })
  medicine_name!: string;

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
      .getRepository(MedicineDetail)
      .createQueryBuilder('medicine_detail')
      .orderBy('medicine_detail.created_at', 'DESC')
      .getOne();

    let nextId;
    if (latestSelf) {
      const lastSelfId = latestSelf.medicine_detail_id;
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

    this.medicine_detail_id = nextId;
  }

}