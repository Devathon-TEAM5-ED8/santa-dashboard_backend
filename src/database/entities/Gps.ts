import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('gps')
export class Gps extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('decimal', { precision: 15, scale: 10 })
    latitude: number;

    @Column('decimal', { precision: 15, scale: 10 })
    longitude: number;

    @Column('char', { length: 60 })
    city: string;

    @Column('char', { length: 60 })
    address: string;

    @Column('timestamp')
    searchDate: Date;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

}
