import { Request, Response } from "express";
import { AppError } from "../middleware/error.middleware.js";
import { AuthService } from "../services/auth.service.js";
import { LoginDto, RegisterDto } from "../dto/Auth.dto.js";

export class AuthController {
  private authService = new AuthService();

  // Login
  login = async (req: Request, res: Response): Promise<void> => {
    const data: LoginDto = req.body;
    res.json(await this.authService.login(data));
  };

  register = async (req: Request, res: Response): Promise<void> => {
    const data: RegisterDto = req.body;

    res.json(await this.authService.register(data));
  };
}
