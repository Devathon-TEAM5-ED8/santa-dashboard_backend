import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Reindeer } from "./Reindeer";

@Entity("reindeerAlignment")
export class reindeerAlignment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("int")
  reindeerId: number;

  @CreateDateColumn()
  creationDate: Date;

  @ManyToOne(() => Reindeer, (reindeer) => reindeer.id)
  @JoinColumn({ name: "reindeerId" })
  reindeer: Reindeer;
}
