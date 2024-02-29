import { Entity, PrimaryColumn, Column, BaseEntity, BeforeInsert, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import { AppDataSource } from "../utils/data-source";
import { Patient } from "./MstPatient";
import { Prescription } from "./Prescription";
import { Appointment } from "./TrnAppointment";

enum VisitType {
  direct = 'direct',
  appointment = 'appointment'
}

enum VisitMode {
  single = 'single',
  multiple = 'multiple'
}

@Entity({ name: 'visit_tracker' })
export class VisitTracker extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 20 })
  visit_id!: string;

  @Column({ type: 'enum', enum: VisitType, default: VisitType.appointment })
  visit_type!: VisitType;

  @OneToOne(() => Appointment, appointment => appointment.visit, {onDelete: 'CASCADE'})
  @JoinColumn()
  appointment!: Appointment;

  // @ManyToOne(() => Patient, patient => patient.visits, { onDelete: 'SET NULL' })
  // patient!: Patient;

  @OneToOne(() => Prescription, prescription => prescription.visit)
  prescription!: Prescription;

  @Column({ type: 'varchar', length: 20 })
  symptoms!: string;

  @Column({ type: 'text' })
  treatment_details!: string;

  @Column({ type: 'varchar', length: 7 })
  temperature!: string;

  @Column({ type: 'varchar', length: 7 })
  weight!: string;

  @Column({ type: 'varchar', length: 7 })
  height!: string;

  @Column({ type: 'text', nullable: true })
  other_info!: string;

  @Column({ type: 'enum', enum: VisitMode, default: VisitMode.single })
  visit_mode!: VisitMode;


  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at!: Date;

  @BeforeInsert()
  async createPatientId() {

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currCode = `${currentYear.toString().slice(2)}${currentMonth.toString().padStart(2, '0')}`;

    const latestAppointment = await AppDataSource
      .getRepository(VisitTracker)
      .createQueryBuilder('visit_tracker')
      .orderBy('visit_tracker.created_at', 'DESC')
      .getOne();

    let nextId;
    if (latestAppointment) {
      const lastAppointmentId = latestAppointment.visit_id;
      const lastAppointmentCode = lastAppointmentId.substring(4, 8);

      if (lastAppointmentCode === currCode) {
        const lastAppointmentNum = parseInt(lastAppointmentId.substring(8), 10);
        const nextAppointmentNum = lastAppointmentNum + 1;
        nextId = `VST_${currCode}${nextAppointmentNum.toString().padStart(4, '0')}`;
      } else {
        nextId = `VST_${currCode}0001`;
      }
    } else {
      nextId = `VST_${currCode}0001`;
    }

    this.visit_id = nextId;
  }

}