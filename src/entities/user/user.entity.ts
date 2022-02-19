import {
  Entity,
  Column,
  PrimaryColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Logs } from "../logs/logs.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column()
  isAdm!: boolean;

  @OneToMany((type) => Logs, (log) => log.user)
  logs!: Logs[];
}
