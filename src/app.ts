import dotenv from "dotenv"
dotenv.config();
import config from "config";

import logger from "./utils/logger";
import createServer from "./utils/server";
import connectDB from "./utils/connectDB";

const port = config.get<number>('port');
const app = createServer();

// MAIN FUNCTION - RUNS SERVER
function main() {

  app.listen(port, async () => {
    logger.info(`App is running at http://localhost:${port}/`);
    
    await connectDB();
  });
}

main();