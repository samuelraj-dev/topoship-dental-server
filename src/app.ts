import dotenv from "dotenv"
dotenv.config();
import config from "config";

import logger from "./utils/logger";
import createServer from "./utils/server";
import connectDB from "./utils/connectDB";

import "./keep_alive.js";

// const port = config.get<number>('port') || process.env.PORT;
const port = config.get<number>('port');
const app = createServer();

// MAIN FUNCTION - RUNS SERVER
function main() {

  app.listen(port, async () => {
    logger.info(`app running on port: ${port}, ${config.get<string>('origin')}`);
    
    await connectDB();
  });
}

main();
