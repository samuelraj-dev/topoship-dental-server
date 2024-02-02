// CONNECT TO MYSQL DATABASE USING TYPEORM

import { AppDataSource } from "./data-source";
import logger from "./logger";

export default async function connectDB() {
  try {
    await AppDataSource.initialize();
    logger.info(`Connected to the database`);
  } catch (error: any) {
    logger.error(`Error initializing data source: ${error.message}`);
    process.exit(1);
  }
}