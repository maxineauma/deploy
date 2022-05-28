import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";

import { connection } from "./controllers/Database.js";
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("combined"));

app.use("/user", userRoutes);
app.use("/task", taskRoutes);
app.use("/comment", commentRoutes);

app.get("/", (req, res) => {
  res.sendStatus(200);
});

connection.connect(() => {
  app.listen(PORT, "0.0.0.0");
});