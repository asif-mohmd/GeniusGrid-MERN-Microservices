import { connectDB } from "./config/mongoDB/db";
import dotenv from "dotenv"
import RabbitMQClient from "./rabbitMQ/client"

console.log("order service")

dotenv.config();
connectDB()

RabbitMQClient.initialize()