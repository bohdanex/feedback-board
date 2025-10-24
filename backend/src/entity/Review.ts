import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Review {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  comment!: string;

  @Column({ type: "int", default: 5 })
  rating!: number;
}
