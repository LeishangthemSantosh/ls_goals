import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { Match } from "./decorators/match.decorator.js";

export class LoginDto {
  @IsNotEmpty({ message: "Email cannot be empty" })
  @IsEmail({}, { message: "Please provide a valid email" })
  email!: string;

  @IsNotEmpty({ message: "Password cannot be empty" })
  password!: string;
}

export class RegisterDto {
  @IsNotEmpty({ message: "User name cannot be empty" })
  name!: string;

  @IsNotEmpty({ message: "Email cannot be empty" })
  @IsEmail({}, { message: "Please provide a valid email" })
  email!: string;

  @IsNotEmpty({ message: "Password cannot be empty" })
  @MinLength(6, { message: "Password must be atleast 6 digit" })
  password!: string;

  @IsNotEmpty({ message: "Confirm Password cannot be empty" })
  @Match("password", { message: "Passwords do not match" })
  confirm_password!: string;
}
