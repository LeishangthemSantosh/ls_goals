import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user.entity.js";
import { Progress } from "./progress.entity.js";
import { Milestone } from "./milestone.entity.js";

enum GoalStatus {
  INITIATED = "INITIATED",
  COMPLETED = "COMPLETED",
  IN_PROGRESS = "IN_PROGRESS",
  HOLD = "HOLD",
  CANCELLED = "CANCELLED",
  ARCHIVED = "ARCHIVED",
}

@Entity({ name: "goals" })
export class Goal {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => User, (user) => user.goals, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user!: Relation<User>;

  @Column({ type: "varchar", length: 255, nullable: false })
  title!: string;

  @Column({ type: "text" })
  description!: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  category!: string;

  @Column({ type: "date", nullable: true })
  targeted_date!: Date;

  @Column({ type: "enum", enum: GoalStatus, default: GoalStatus.INITIATED })
  status!: GoalStatus;

  @OneToMany(() => Progress, (progress) => progress.goal)
  progress!: Relation<Progress[]>;

  @OneToMany(() => Milestone, (milestone) => milestone.goal)
  milestones!: Relation<Milestone[]>;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
