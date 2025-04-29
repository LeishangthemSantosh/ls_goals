import { Repository } from "typeorm";
import { CreateGoalDto } from "../dto/goal.dto.js";
import { Goal, GoalStatus } from "../entities/goal.entity.js";
import { AppDataSource } from "../config/db.config.js";

export class GoalService {
  private goalRepossitory: Repository<Goal>;

  constructor() {
    this.goalRepossitory = AppDataSource.getRepository(Goal);
  }

  async getGoals() {}

  async createGoal(goalDto: CreateGoalDto, user: object): Promise<object> {
    console.log(user);

    const { title, description, targeted_date, category } = goalDto;
    const goals = this.goalRepossitory.create({
      title,
      description,
      targeted_date,
      category,
      status: GoalStatus.INITIATED,
    });
    await this.goalRepossitory.save(goals);
    return { status: 200, success: true, message: "Goal created successfuly" };
  }

  async getGoalById() {}

  async updateGoal() {}
}
