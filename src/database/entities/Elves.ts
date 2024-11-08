import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity('elves')
export class Elves extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 100 })
    nameElves: string;

    @Column('int')
    age: number;

    @Column('varchar', { length: 255 })
    address: string;

    @Column('decimal', { precision: 4, scale: 2 })
    stature: number;

    @Column('varchar', { length: 100 })
    email: string;

    @Column('timestamp')
    entryDate: Date;

    @Column('int')
    rollId: number;
}
