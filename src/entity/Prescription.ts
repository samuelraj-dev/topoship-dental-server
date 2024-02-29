import { Entity, PrimaryColumn, Column, BaseEntity, BeforeInsert, JoinColumn, OneToOne, OneToMany } from "typeorm";
import { AppDataSource } from "../utils/data-source"
import { VisitTracker } from "./VisitTracker";
import { MedicineDetail } from "./MedicineDetail";

@Entity({ name: 'prescription' })
export class Prescription extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 20 })
  prescription_id!: string;

  @OneToOne(() => VisitTracker, visit => visit.prescription, {onDelete: 'CASCADE'})
  @JoinColumn()
  visit!: VisitTracker;

  @OneToMany(() => MedicineDetail, medicine => medicine.prescription)
  medicines!: MedicineDetail[];

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
      .getRepository(Prescription)
      .createQueryBuilder('prescription')
      .orderBy('prescription.created_at', 'DESC')
      .getOne();

    let nextId;
    if (latestSelf) {
      const lastSelfId = latestSelf.prescription_id;
      const lastSelfCode = lastSelfId.substring(4, 8);

      if (lastSelfCode === currCode) {
        const lastSelfNum = parseInt(lastSelfId.substring(8), 10);
        const nextSelfNum = lastSelfNum + 1;
        nextId = `PRS_${currCode}${nextSelfNum.toString().padStart(4, '0')}`;
      } else {
        nextId = `PRS_${currCode}0001`;
      }
    } else {
      nextId = `PRS_${currCode}0001`;
    }

    this.prescription_id = nextId;
  }

}