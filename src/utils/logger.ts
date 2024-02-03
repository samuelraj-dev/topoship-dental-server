import pino from "pino";
import dayjs from "dayjs";
import config from "config";

const level = config.get<string>('logLevel') || process.env.LOG_LEVEL;

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    }
  },
  level,
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});

export default logger;