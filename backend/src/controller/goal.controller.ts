import { Response, Request } from "express";
import { GoalService } from "../services/goal.service.js";
import { CreateGoalDto } from "../dto/goal.dto.js";

export class GoalController {
  private readonly goalService = new GoalService();

  getGoals = async (req: Request, res: Response): Promise<void> => {
    res.json(await this.goalService.getGoals());
  };

  createGoal = async (req: Request, res: Response): Promise<void> => {
    const data: CreateGoalDto = req.body;
    const user = (req as Request & { user: any }).user;
    res.json(await this.goalService.createGoal(data, user));
  };

  getGoalById = async (req: Request, res: Response): Promise<void> => {};

  updateGoal = async (req: Request, res: Response): Promise<void> => {};
}
