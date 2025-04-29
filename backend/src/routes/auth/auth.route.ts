import { Router } from "express";
import { ExampleController } from "../../controller/example.controller.js";
import { validateDto } from "../../middleware/validate.middleware.js";
import { AuthController } from "../../controller/auth.controller.js";
import { LoginDto, RegisterDto } from "../../dto/auth.dto.js";

const router = Router();
const exampleController = new ExampleController();
const authController = new AuthController();

router.get("/example", exampleController.getExample);
router.post("/login", validateDto(LoginDto), authController.login);
router.post("/register", validateDto(RegisterDto), authController.register);

export default router;
