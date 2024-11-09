import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from "typeorm";

@Entity("climate")
export class climate extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("decimal", { precision: 5, scale: 2 })
  temperature: number;

  @Column("decimal", { precision: 5, scale: 2 })
  minTemperature: number;

  @Column("decimal", { precision: 5, scale: 2 })
  windSpeed: number;

  @Column("decimal", { precision: 5, scale: 2 })
  visibility: number;

  @Column("decimal", { precision: 5, scale: 2 })
  humidity: number;

  @Column("text")
  weatherState: string;

  @Column("text")
  recommendations: string;

  @CreateDateColumn()
  creationDate: Date;
}
