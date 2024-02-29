import { Entity, PrimaryColumn, Column, BaseEntity, BeforeInsert, OneToOne, OneToMany } from "typeorm";
import { AppDataSource } from "../utils/data-source";
import { Appointment } from "./TrnAppointment";
import { VisitTracker } from "./VisitTracker";

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export enum State {
  AndhraPradesh = 'andhra_pradesh',
  ArunachalPradesh = 'arunachal_pradesh',
  Assam = 'assam',
  Bihar = 'bihar',
  Chhattisgarh = 'chhattisgarh',
  Goa = 'goa',
  Gujarat = 'gujarat',
  Haryana = 'haryana',
  HimachalPradesh = 'himachal_pradesh',
  Jharkhand = 'jharkhand',
  Karnataka = 'karnataka',
  Kerala = 'kerala',
  MadhyaPradesh = 'madhya_pradesh',
  Maharashtra = 'maharashtra',
  Manipur = 'manipur',
  Meghalaya = 'meghalaya',
  Mizoram = 'mizoram',
  Nagaland = 'nagaland',
  Odisha = 'odisha',
  Punjab = 'punjab',
  Rajasthan = 'rajasthan',
  Sikkim = 'sikkim',
  TamilNadu = 'tamil_nadu',
  Telangana = 'telangana',
  Tripura = 'tripura',
  UttarPradesh = 'uttar_pradesh',
  Uttarakhand = 'uttarakhand',
  WestBengal = 'west_bengal',
  AndamanAndNicobarIslands = 'andaman_and_nicobar_islands',
  Chandigarh = 'chandigarh',
  DadraAndNagarHaveliAndDamanAndDiu = 'dadra_and_nagar_haveli_and_daman_and_diu',
  Lakshadweep = 'lakshadweep',
  Delhi = 'delhi',
  Puducherry = 'puducherry',
}

export enum Country {
  India = 'india',
  Other = 'other',
}

@Entity({ name: 'master_patient' })
export class Patient extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 20 })
  patient_id!: string;

  @Column({ type: 'varchar', length: 25 })
  patient_name!: string;

  @Column({ type: 'varchar', length: 45 })
  mobile!: string;

  @Column({ type: 'varchar', length: 25, nullable: true })
  email!: string | null;

  @Column({ type: 'enum', enum: Gender })
  gender!: Gender;

  @Column({ type: 'int', width: 3, nullable: true })
  age!: number;

  @Column({ type: 'varchar', length: 45, nullable: true })
  emergency_mobile!: string | null;

  @Column({ type: 'text', nullable: true })
  address!: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  city!: string;

  @Column({ type: 'enum', enum: State, default: State.TamilNadu })
  state!: State;

  @Column({ type: 'enum', enum: Country, default: Country.India })
  country!: Country;

  @Column({ type: 'varchar', length: 10, nullable: true })
  pincode!: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  blood_group!: string;

  @Column({ type: 'text', nullable: true })
  current_medication!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at!: Date;

  // @OneToOne(() => Appointment, appointment => appointment.patient)
  // appointment!: Appointment;

  @OneToMany(() => Appointment, appointment => appointment.patient)
  appointments!: Appointment[];

  // @OneToMany(() => VisitTracker, visit => visit.patient)
  // visits!: VisitTracker[];

  @BeforeInsert()
  async createPatientId() {

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currCode = `${currentYear.toString().slice(2)}${currentMonth.toString().padStart(2, '0')}`;

    const latestPatient = await AppDataSource
      .getRepository(Patient)
      .createQueryBuilder('patient')
      .orderBy('patient.created_at', 'DESC')
      .getOne();

    let nextId;
    if (latestPatient) {
      const lastPatientId = latestPatient.patient_id;
      const lastPatientCode = lastPatientId.substring(4, 8);

      if (lastPatientCode === currCode) {
        const lastPatientNum = parseInt(lastPatientId.substring(8), 10);
        const nextPatientNum = lastPatientNum + 1;
        nextId = `PAT_${currCode}${nextPatientNum.toString().padStart(4, '0')}`;
      } else {
        nextId = `PAT_${currCode}0001`;
      }
    } else {
      nextId = `PAT_${currCode}0001`;
    }

    this.patient_id = nextId;
  }

}

export interface PatientInput extends Omit<Patient, "patient_id" | "created_at" | "updated_at" | "createPatientId" | "hasId" | "save" | "remove" | "softRemove" | "recover" | "reload"> {
  
}