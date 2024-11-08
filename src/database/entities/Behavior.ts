import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity('behavior')
export class Behavior extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    behavior: string;

    @Column('int')
    points: number;

    @Column('int')
    childId: number;

    @CreateDateColumn()
    creationDate: Date;
}
