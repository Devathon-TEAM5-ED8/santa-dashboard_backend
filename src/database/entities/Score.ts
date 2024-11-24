import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import { Children } from "./Children";

// Enumeración para los niveles de comportamiento
export enum BehaviorLevel {
    BUENO = "bueno",
    REGULAR = "regular",
    MALO = "malo",
}

@Entity('scores')
export class Score {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Children, (child) => child.id, { onDelete: "CASCADE" })
    @JoinColumn({ name: "childId" })
    child: Children;

    @Column('varchar', { length: 100 })
    toy: string;

    @Column('int')
    points: number;

    @Column('varchar', { length: 50 })
    classification: string;

    @Column('text')
    photo: string;

    // Columnas para cada tipo de comportamiento
    @Column({
        type: "enum",
        enum: BehaviorLevel,
        default: BehaviorLevel.REGULAR,
    })
    generosity: BehaviorLevel;

    @Column({
        type: "enum",
        enum: BehaviorLevel,
        default: BehaviorLevel.REGULAR,
    })
    kindness: BehaviorLevel;

    @Column({
        type: "enum",
        enum: BehaviorLevel,
        default: BehaviorLevel.REGULAR,
    })
    respect: BehaviorLevel;

    @Column({
        type: "enum",
        enum: BehaviorLevel,
        default: BehaviorLevel.REGULAR,
    })
    obedience: BehaviorLevel;

    @Column({
        type: "enum",
        enum: BehaviorLevel,
        default: BehaviorLevel.REGULAR,
    })
    responsibility: BehaviorLevel;

    @CreateDateColumn()
    creationDate: Date;
}
