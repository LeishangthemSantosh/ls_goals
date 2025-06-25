import {
  IsDate,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsString,
} from "class-validator";
import { GoalStatus } from "../entities/goal.entity.js";

export class CreateGoalDto {
  @IsString({ message: "Title must be of type string" })
  @IsNotEmpty({ message: "Title cannot be empty" })
  title!: string;

  @IsString({ message: "Description must be of type string" })
  @IsNotEmpty({ message: "Desciption cannot be empty" })
  description!: string;

  @IsString({ message: "Category must be of type string" })
  @IsNotEmpty({ message: "Category cannot be empty" })
  category!: string;

  @IsDateString(
    { strict: true },
    { message: "Target date must be of type date" }
  )
  @IsNotEmpty({ message: "Target date cannot be empty" })
  targeted_date!: string;
}

export class UpdateGoalDto {
  @IsString({ message: "Title must be of type string" })
  @IsNotEmpty({ message: "Title cannot be empty" })
  title!: string;

  @IsString({ message: "Description must be of type string" })
  @IsNotEmpty({ message: "Desciption cannot be empty" })
  description!: string;

  @IsString({ message: "Category must be of type string" })
  @IsNotEmpty({ message: "Category cannot be empty" })
  category!: string;

  @IsDateString(
    { strict: true },
    { message: "Target date must be of type date" }
  )
  @IsNotEmpty({ message: "Target date cannot be empty" })
  targeted_date!: string;

  @IsEnum(GoalStatus, { message: "Invalid status" })
  status!: GoalStatus;
}
