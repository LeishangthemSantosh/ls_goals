import { Router } from "express";
import { ExampleController } from "../../controller/example.controller.js";

const router = Router();
const exampleController = new ExampleController();

router.get("/example", exampleController.getExample);

export default router;
