import { Request, Response } from "express";
import { AppError } from "../middleware/error.middleware.js";
import { ExampleService } from "../services/example.service.js";

export class ExampleController {
  private exampleService = new ExampleService();
  getExample = async (req: Request, res: Response): Promise<void> => {
    const message = await this.exampleService.getExample();

    /**
     * 
     * Test Error Handler
        const condition = false;

        if (!condition) {
        throw new AppError("Something went wrong", 400);
        }
     */

    res.json({
      success: true,
      status: 200,
      data: message,
      message: "Successfully setup Controller"
    });
  };
}
