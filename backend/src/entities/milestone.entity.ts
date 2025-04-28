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

export enum MilestoneStatus {
  PENDING = "PENDING",
  INPROGRESS = "INPROGRESS",
  COMPLETED = "COMPLETED",
  HOLD = "HOLD",
  CANCELLED = "CANCELLED",
}

@Entity({ name: "milestones" })
export class Milestone {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Goal, (goal) => goal.milestones)
  @JoinColumn({ name: "goal_id" })
  goal!: Relation<Goal>;

  @Column({ type: "varchar", length: 255, nullable: false })
  title!: string;

  @Column({ type: "text", nullable: false })
  description!: string;

  @Column({ type: "date", nullable: true })
  due_date!: Date;

  @Column({ type: "enum", enum: MilestoneStatus })
  status!: MilestoneStatus;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
