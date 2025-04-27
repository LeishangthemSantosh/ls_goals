import { createServer } from "http";
import "dotenv/config";
import app from "./src/app.js";
import { AppDataSource } from "./src/config/db.config.js";

const PORT = process.env.PORT || 3009;

const server = createServer(app);

AppDataSource.initialize().then(() => {
  server.listen(PORT, () => {
    console.log("Server start at:", PORT);
  });
});
