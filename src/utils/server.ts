// UTILITY TO INITIALIZE SERVER with MIDDLEWARES

import express from "express";
import config from "config";
import cookieParser from "cookie-parser";
import cors from "cors";
import routes from "../routes/index";
// import deserializeUser from "../api/middleware/deserializeUser";

export default function createServer() {

  // INIT SERVER
  const app = express();

  // MIDDLEWARES
  app.use(cors({
    origin: config.get<string>('origin'),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }))
  app.use(cookieParser());
  app.use(express.json());
  // app.use(deserializeUser);

  // ROUTES
  routes(app);

  // RETURN SERVER
  return app;
}

