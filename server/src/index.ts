import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import adminRoutes from "./routes/admin";
import bodyParser from "body-parser";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(bodyParser());

app.use("/api/admin", adminRoutes());

const port = process.env.SERVER_PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on ${process.env.SERVER_PORT}`);
});
