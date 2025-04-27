import { Request, Response, NextFunction } from "express";

export class AppError extends Error {
  statusCode: number;
  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  const status = (err instanceof AppError && err.statusCode) || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({
    success: false,
    message,
    status
    // stack: process.env.NODE_ENV === "development" ? err.stack : undefined
  });
}
