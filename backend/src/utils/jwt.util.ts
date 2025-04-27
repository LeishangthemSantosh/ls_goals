import jwt, { JwtPayload } from "jsonwebtoken";
import "dotenv/config";

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "c144652ef13a8026d68d599db0bbb74a6793b3384338df417ad2b3fec5600342c1b5609a9348ac6bbc6085e590f7abeaad96b21a86cf2e948897105b9f58cf21";

const JWT_EXPIPRE = process.env.JWT_EXPIRE || "24h";

export const generateToken = (payload: object): string => {
  const options = { expiresIn: JWT_EXPIPRE as jwt.SignOptions["expiresIn"] };
  return jwt.sign(payload, JWT_SECRET, options);
};

export const verifyToken = (token: string): JwtPayload | string => {
  return jwt.verify(token, JWT_SECRET);
};
