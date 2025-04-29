import { Repository } from "typeorm";
import { CreateGoalDto } from "../dto/goal.dto.js";
import { Goal, GoalStatus } from "../entities/goal.entity.js";
import { AppDataSource } from "../config/db.config.js";
import { User } from "../entities/user.entity.js";

export class GoalService {
  private goalRepository: Repository<Goal>;
  private userRepository: Repository<User>;

  constructor() {
    this.goalRepository = AppDataSource.getRepository(Goal);
    this.userRepository = AppDataSource.getRepository(User);
  }

  async getGoals(
    page: number,
    limit: number,
    orderBy: string,
    order: "ASC" | "DESC",
    userData: { id: string },
    status?: string
  ) {
    const user = await this.userRepository.findOneBy({ id: userData.id });
    if (!user) {
      return { status: 404, success: false, message: "User not found" };
    }
    const offset = (page - 1) * limit;

    const queryBuilder = this.goalRepository
      .createQueryBuilder("goal")
      .leftJoin("goal.user", "user")
      .select([
        "goal.id AS goal_id",
        "goal.title AS goal_title",
        "goal.category AS goal_category",
        "goal.status AS goal_status",
        "user.id AS user_id",
        "user.name AS user_name",
      ])
      .where("user.id = :userId", { userId: user.id });

    if (status) {
      queryBuilder.where("goal.status = :status", { status });
    }

    queryBuilder.orderBy(orderBy, order).offset(offset).limit(limit);

    const goals = await queryBuilder.getRawMany();

    return {
      message: "Goals fetch succesfully",
      status: 200,
      success: true,
      data: goals,
    };
  }

  async createGoal(
    goalDto: CreateGoalDto,
    userData: { id: string }
  ): Promise<object> {
    const user = await this.userRepository.findOneBy({ id: userData.id });
    if (!user) {
      return { status: 404, success: false, message: "User not found" };
    }

    const { title, description, targeted_date, category } = goalDto;
    const goals = this.goalRepository.create({
      title,
      description,
      targeted_date,
      category,
      status: GoalStatus.INITIATED,
      user,
    });
    await this.goalRepository.save(goals);
    return { status: 200, success: true, message: "Goal created successfuly" };
  }

  async getGoalById() {}

  async updateGoal() {}
}
