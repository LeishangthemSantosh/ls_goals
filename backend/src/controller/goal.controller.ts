import { Response, Request } from "express";
import { GoalService } from "../services/goal.service.js";
import { CreateGoalDto, UpdateGoalDto } from "../dto/goal.dto.js";

export class GoalController {
  private readonly goalService = new GoalService();

  getGoals = async (req: Request, res: Response): Promise<void> => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const orderBy = (req.query.orderBy as string) || "created_at";
    const order =
      (req.query.order as string)?.toUpperCase() === "DESC" ? "DESC" : "ASC";
    const status = req.query.page as string;

    const user = (req as Request & { user: any }).user;

    res.json(
      await this.goalService.getGoals(page, limit, orderBy, order, user, status)
    );
  };

  createGoal = async (req: Request, res: Response): Promise<void> => {
    const data: CreateGoalDto = req.body;
    const user = (req as Request & { user: any }).user;
    res.json(await this.goalService.createGoal(data, user));
  };

  getGoalById = async (req: Request, res: Response): Promise<void> => {
    res.send(await this.goalService.getGoalById(req.params.id));
  };

  updateGoal = async (req: Request, res: Response): Promise<void> => {
    const data: UpdateGoalDto = req.body;
    const goalId: string = req.params.id;
    res.send(await this.goalService.updateGoal(data, goalId))
  };
}
