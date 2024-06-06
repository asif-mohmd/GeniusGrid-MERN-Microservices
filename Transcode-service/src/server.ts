import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import TranscoderRoute from "./route/route";
import { connectDB } from "./config/mongodb/db";
import * as fs from 'fs';


dotenv.config();
connectDB()

const app: Express = express();
const port = process.env.PORT || 8087;

app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use("/transcode", TranscoderRoute);


app.post("/convert", async (req, res) => {
  // Your video conversion logic here...
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
