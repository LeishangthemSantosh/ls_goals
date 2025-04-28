import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from "typeorm";
import { Goal } from "./goal.entity.js";

@Entity({ name: "progress" })
export class Progress {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Goal, (goal) => goal.progress)
  @JoinColumn({ name: "goal_id" })
  goal!: Relation<Goal>;

  @Column({ type: "date", nullable: false })
  date!: Date;

  @Column({ type: "text", nullable: false })
  notes!: string;

  @Column({ type: "decimal", precision: 5, scale: 2, default: 0.0 })
  completion_percentage!: number;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
