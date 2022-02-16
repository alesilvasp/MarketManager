import { Entity, Column, PrimaryColumn, OneToOne, OneToMany, JoinColumn } from "typeorm";
import { Logs } from "../logs/logs.entity";


@Entity()
export class User {

    @PrimaryColumn('uuid')
    readonly id!: string; 

    @Column()
    name!: string;

    @Column({ unique: true})
    email!: string;

    @Column()
    password!: string;

    @Column()
    isAdm!: boolean;

    @OneToMany(type => Logs, log => log.user)
    logs!: Logs[]

    
}
