import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from "typeorm";

@Entity("reindeer")
export class reindeer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  name: string;

  @Column("text")
  quality: string;

  @Column("int")
  currentPosition: number;

  @CreateDateColumn()
  creationDate: Date;
}
