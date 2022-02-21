import {
  Entity,
  Column,
  OneToMany,
  BeforeInsert,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Logs } from "../logs/logs.entity";
import bcrypt from "bcrypt";

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

  @BeforeInsert()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }
}
