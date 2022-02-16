import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class StockProduct {

    @PrimaryGeneratedColumn()
    readonly id!: number

    @Column({ unique: true })
    name!: string

    @Column('float')
    stock!: number

    @Column()
    batch!: string

    @CreateDateColumn()
    expires_in!: string

}