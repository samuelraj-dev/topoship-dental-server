import { Entity, PrimaryColumn, Column, BaseEntity, ManyToOne, BeforeInsert } from "typeorm";
import { AppDataSource } from "../utils/data-source";

import { ClinicInfo } from "./ClinicInfo";

export const privateFields = ['password', 'verification_code', 'password_reset_code', 'verified', 'activation']

@Entity('clinic_user')
export class ClinicUser extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 20, unique: true, nullable: false })
  clinic_user_id!: string;

  @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
  doctor_name!: string;

  @Column({ type: 'varchar', length: 100, unique: true, nullable: true })
  doctor_image!: string;

  @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
  specialization!: string;

  @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
  email!: string;

  @Column({ type: 'varchar', length: 20, unique: true, nullable: false })
  phone_number!: string;

  @Column({ type: 'varchar', length: 100, unique: true, nullable: true, default: null })
  email_otp!: string;

  @Column({ type: 'varchar', length: 100, unique: true, nullable: true, default: null })
  phone_number_otp!: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  password!: string;

  @Column({ type: 'boolean', default: false, nullable: false })
  isOwner!: boolean;

  @Column({ type: 'varchar', length: 100, nullable: false })
  role!: string;

  @Column({ type: 'varchar', length: 100, default: null, nullable: true })
  password_reset_code!: string | null;

  @ManyToOne(() => ClinicInfo, clinicInfo => clinicInfo.clinicUsers, { onDelete: 'CASCADE' })
  clinicInfo!: ClinicInfo;
  
  // Timestamp columns
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at!: Date;
  

  @BeforeInsert()

  async createSelfId() {

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currCode = `${currentYear.toString().slice(2)}${currentMonth.toString().padStart(2, '0')}`;

    const latestSelf = await AppDataSource
      .getRepository(ClinicUser)
      .createQueryBuilder('clinic_auth')
      .orderBy('clinic_auth.created_at', 'DESC')
      .getOne();

    let nextId;
    if (latestSelf) {
      const lastSelfId = latestSelf.clinic_user_id;
      const lastSelfCode = lastSelfId.substring(4, 8);

      if (lastSelfCode === currCode) {
        const lastSelfNum = parseInt(lastSelfId.substring(8), 10);
        const nextSelfNum = lastSelfNum + 1;
        nextId = `USR_${currCode}${nextSelfNum.toString().padStart(4, '0')}`;
      } else {
        nextId = `USR_${currCode}0001`;
      }
    } else {
      nextId = `USR_${currCode}0001`;
    }

    console.log(nextId)

    this.clinic_user_id = nextId;
  }
}