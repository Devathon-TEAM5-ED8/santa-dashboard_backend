import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('gps')
export class Gps extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('decimal', { precision: 9, scale: 6 })
    coor_latitude: number;

    @Column('decimal', { precision: 9, scale: 6 })
    coor_length: number;

    @Column('char', { length: 60 })
    address: string;

    @Column('timestamp')
    search_date: Date;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

}