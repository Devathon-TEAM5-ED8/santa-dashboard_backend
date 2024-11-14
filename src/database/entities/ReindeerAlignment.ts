import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { reindeer } from "./Reindeer";

@Entity("reindeerAlignment")
export class reindeerAlignment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("int")
  reindeerId: number;

  @CreateDateColumn()
  creationDate: Date;

  @ManyToOne(() => reindeer, (reindeer) => reindeer.id)
  @JoinColumn({ name: "reindeerId" })
  reindeer: reindeer;
}
