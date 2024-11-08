import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity('cards')
export class Cards extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    title: string;

    @Column('text')
    content: string;

    @Column('int')
    childId: number;

    @Column('boolean', { default: true })
    state: boolean;

    @CreateDateColumn()
    creationDate: Date;
}
