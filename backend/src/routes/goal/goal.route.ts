import { Router } from "express";
import { GoalController } from "../../controller/goal.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { CreateGoalDto, UpdateGoalDto } from "../../dto/goal.dto.js";
import { validateDto } from "../../middleware/validate.middleware.js";

const router = Router();
const goalController = new GoalController();

router.use(authMiddleware);

router.get("/", goalController.getGoals); // get all goals
router.get("/:goalId", goalController.getGoalById); // get goalByid
router.post("/", validateDto(CreateGoalDto), goalController.createGoal); // add goal
router.put("/:goalId", validateDto(UpdateGoalDto), goalController.updateGoal); // update goal
// router.patch("/:goalId/status") // update status
// router.delete("/:goalId") // delete

// Milestones
// router.get('/:goalId/milestones') // get all milestones
// router.post('/:goalId/milestones') // create milestones
// router.put('/milestones/:id') // update milestones
// router.delete('/milestones/:id') // delete milestones
// router.patch('/milestones/:id/status') // update satus

// Progress
// router.get('/goals/:goalId/progress') // get all progress
// router.post('/goals/:goalId/progress') // add progress
// router.put('/progress/:id') // update progress
// router.delete('/progress/:id') // delete

export default router;
