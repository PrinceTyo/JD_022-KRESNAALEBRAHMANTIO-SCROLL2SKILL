import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes";

dotenv.config();
const app: Application = express();

app.use(cors());
app.use(express.json());
app.use("/api", routes);

export default app;