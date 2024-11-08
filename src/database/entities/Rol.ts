import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity('rol')
export class Rol extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 100 })
    nameRol: string;

    @Column('boolean', { default: true })
    state: boolean;

    @CreateDateColumn()
    creationDate: Date;
}
