import dotenv from "dotenv";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";
import { UserController } from "./controllers/userController";
import { UserInteractor } from "./interactor/userInteractor";
import { UserRepository } from "./repository/UserRepository";
import { connectDB } from "./config/mongodb/db";
import express, { Express } from "express";
import healthCheckRouter from "./utils/healthcheck";
const app: Express = express()

dotenv.config();
connectDB();

app.use("/health", healthCheckRouter);


const packageDefinition = protoLoader.loadSync(
  path.join(__dirname, "/protos/user.proto"),
  { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true }
);

const userProto = grpc.loadPackageDefinition(packageDefinition);

const repository = new UserRepository();
const service = new UserInteractor(repository);
const controller = new UserController(service);

const server = new grpc.Server();

const grpcServer = () => {
  server.bindAsync(
    `0.0.0.0:${process.env.USER_GRPC_PORT}`,
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
      if (err) {
        console.log(err, "error happened grpc user service");
        return;
      }
      console.log("grpc user server started on port:", port);
    }
  );
};

server.addService((userProto.UserService as any).service, {
  Register: controller.onRegister.bind(controller),
  Login: controller.onLogin.bind(controller),
  ActivateUser: controller.onActivateUser.bind(controller),
  ForgotPassword: controller.onForgotPassword.bind(controller),
  PasswordUpdate: controller.onPasswordUpdate.bind(controller),
  GetAllUsers : controller.onGetAllUsers.bind(controller),
  UserBlockUnblock : controller.onBlockUnblock.bind(controller),
  GetUserDetails : controller.onGetUserDetails.bind(controller),
  CreateUserCourse : controller.onCreateUserCourse.bind(controller),
  AvatarURL : controller.onAvatarURL.bind(controller)


  // Implementation of service methods
});
grpcServer();
