import { Router } from "express";
import { GoalController } from "../../controller/goal.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { CreateGoalDto } from "../../dto/goal.dto.js";
import { validateDto } from "../../middleware/validate.middleware.js";

const router = Router();
const goalController = new GoalController();

router.use(authMiddleware);

router.get("/", goalController.getGoals);
router.post("/", validateDto(CreateGoalDto), goalController.createGoal);
router.get("/:goalId", goalController.getGoalById);
router.post("/:goalId", goalController.updateGoal);

export default router;
