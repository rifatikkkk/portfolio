import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

import routes from "./routes";

const app: Express = express();

app.use("/api", routes());

const port = process.env.SERVER_PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on ${process.env.SERVER_PORT}`);
});
