import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { dirname } from "path";
import { fileURLToPath } from "url";

dotenv.config();

// Fix __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

type DbType = "mysql" | "mariadb" | "postgres" | "sqlite" | "mssql";

const dbType = (process.env.DB_TYPE || "mariadb") as DbType;
const host = process.env.DB_HOST || "localhost";
const port = Number(process.env.DB_PORT) || 3307;
const username = process.env.DB_USER || "santosh";
const password = process.env.DB_PASS || "mygoalapp123";
const database = process.env.DB_NAME || "goal_app";
const dbsync = Boolean(process.env.DB_SYNC || true);

export const AppDataSource = new DataSource({
  type: dbType,
  host,
  port,
  username,
  password,
  database,
  synchronize: dbsync,
  logging: false,
  entities: [__dirname + "/../entities/*.entity.ts"],
  migrations: [],
  subscribers: [],
});
