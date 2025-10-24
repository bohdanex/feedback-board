import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  comment!: string;

  @Column({ type: "int", default: 5 })
  rating!: number;
}
