import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity('children')
export class Children extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 100 })
    nameChild: string;

    @Column('boolean', { default: false })
    willReceiveGift: boolean;

    @Column('int')
    rollId: number;

    @CreateDateColumn()
    creationDate: Date;
}
