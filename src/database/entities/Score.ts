import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import { Children } from "./Children";

@Entity('scores')
export class Score {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Children, (child) => child.id, { onDelete: "CASCADE" })
    @JoinColumn({ name: "childId" })
    child: Children;

    @Column('varchar', { length: 50, default: 'Bueno' })
    behavior: string;

    @CreateDateColumn()
    creationDate: Date;
}
