import { connectDB } from "./config/mongoDB/db";
import dotenv from "dotenv"
import RabbitMQClient from "./rabbitMQ/client"

dotenv.config();
connectDB()

RabbitMQClient.initialize()