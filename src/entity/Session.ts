import { Entity, PrimaryColumn, Column, BaseEntity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";

import { ClinicAuth } from "./ClinicAuth";

// import { v4 as uuidv4 } from "uuid";

@Entity({ name: 'session' })
export class Session extends BaseEntity {
  @PrimaryGeneratedColumn()
  session_id!: string;

  @ManyToOne(() => ClinicAuth, (clinic_auth) => clinic_auth.sessions, {onDelete: 'SET NULL'})
  @JoinColumn({ name: 'clinic_auth_id' })
  clinic_auth!: ClinicAuth;
  // @Column({ type: 'varchar', length: 20 })
  // clinic_auth_id!: string;

  @Column({ type: 'boolean', default: true })
  valid!: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at!: Date;


}