import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm"
import { User } from "../user/user.entity";

@Entity()
export class ResetToken {

    @PrimaryGeneratedColumn()
    readonly id!: number

    @Column()
    token!: string

    @CreateDateColumn()
    created_at!: Date

    @OneToOne((type) => User, {
        eager: true
    })@JoinColumn()
    user!: User

}