import { Repository } from "typeorm";
import { AppDataSource } from "../config/db.config.js";
import { hashedPassword, comparePassword } from "../utils/password.util.js";
import { User, UserStatus } from "../entities/user.entity.js";
import { generateToken } from "../utils/jwt.util.js";
import { LoginDto, RegisterDto } from "../dto/auth.dto.js";

export class AuthService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async login(data: LoginDto): Promise<object> {
    const { email, password } = data;

    // Check Email is Valid
    const user = await this.userRepository.findOne({
      where: { email, status: UserStatus.ACTIVE },
    });

    if (!user) {
      return {
        message: "Email not exists",
        status: 404,
        success: true,
      };
    }

    // Check Password is Valid
    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return {
        message: "Incorrect password",
        status: 401,
        success: true,
      };
    }

    // Generate token
    const token = generateToken({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    return {
      status: 200,
      success: true,
      data: {
        token: token,
        name: user.name,
        email: user.email,
      },
      message: "User login successfully",
    };
  }

  async register(data: RegisterDto): Promise<object> {
    const { name, email, password } = data;

    const existingUser = await this.userRepository.exists({
      where: { email: email },
    });

    if (existingUser) {
      return {
        message: "Email already exists",
        status: 409,
        success: true,
      };
    }

    const user = this.userRepository.create({
      name,
      email,
      password: await hashedPassword(password),
    });

    await this.userRepository.save(user);

    return {
      ok: true,
      status: 200,
      message: "User registered successfully",
    };
  }
}
