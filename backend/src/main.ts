import express from "express";
import LoggerConsole from "./infra/logger/LoggerConsole";

const app = express();

app.use(express.json())

const PORT = 4000;

const logger = new LoggerConsole()

app.listen(PORT, () => {
  logger.log(`Server listening on port ${PORT}`);
});