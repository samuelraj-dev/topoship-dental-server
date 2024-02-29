import { Entity, PrimaryColumn, Column, BaseEntity, BeforeInsert, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { AppDataSource } from "../utils/data-source";
import { Patient } from "./MstPatient";
import { VisitTracker } from "./VisitTracker";

export enum Status {
  PENDING = 'pending',
  DONE = 'done',
  CANCELED = 'canceled',
}  

@Entity({ name: 'appointment' })
//email, dob, age ,ecp, add, city, pc, bg, currmed - nullable
export class Appointment extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 20 })
  appointment_id!: string;

  @Column({ type: 'varchar', length: 50 })
  doctor_name!: string;

  @Column({ type: 'varchar', length: 20 })
  patient_id!: string;

  @Column({ type: 'date' })
  appointment_date!: Date;

  @Column({ type: 'time' })
  appointment_time!: string;

  @Column({ type: 'text' })
  visit_purpose!: string;

  @Column({ type: 'enum', enum: Status, default: Status.PENDING })
  status!: Status;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at!: Date;

  @OneToOne(() => VisitTracker, visit => visit.appointment)
  visit!: Patient;

  @ManyToOne(() => Patient, patient => patient.appointments, { onDelete: 'SET NULL' })
  patient!: Patient;

  @BeforeInsert()
  async createPatientId() {

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currCode = `${currentYear.toString().slice(2)}${currentMonth.toString().padStart(2, '0')}`;

    const latestAppointment = await AppDataSource
      .getRepository(Appointment)
      .createQueryBuilder('appointment')
      .orderBy('appointment.created_at', 'DESC')
      .getOne();

    let nextId;
    if (latestAppointment) {
      const lastAppointmentId = latestAppointment.appointment_id;
      const lastAppointmentCode = lastAppointmentId.substring(4, 8);

      if (lastAppointmentCode === currCode) {
        const lastAppointmentNum = parseInt(lastAppointmentId.substring(8), 10);
        const nextAppointmentNum = lastAppointmentNum + 1;
        nextId = `APP_${currCode}${nextAppointmentNum.toString().padStart(4, '0')}`;
      } else {
        nextId = `APP_${currCode}0001`;
      }
    } else {
      nextId = `APP_${currCode}0001`;
    }

    this.appointment_id = nextId;
  }

}