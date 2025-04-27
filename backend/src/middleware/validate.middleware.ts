import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";

export function validateDto(dtoClass: any) {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const output = plainToInstance(dtoClass, req.body);

    const errors = await validate(output);

    if (errors.length > 0) {
      const messages = errors
        .map((err) => Object.values(err.constraints || {}))
        .flat();
      res.status(400).json({ errors: messages });
      return;
    }

    next();
  };
}
