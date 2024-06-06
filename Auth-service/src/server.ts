import dotenv from "dotenv";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";
import { AuthController } from "./controller/authController";


dotenv.config();

const packageDefinition = protoLoader.loadSync(
  path.join(__dirname, "/protos/auth.proto"),
  { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true }
);

const authProto = grpc.loadPackageDefinition(packageDefinition);



const controller = new AuthController();

const server = new grpc.Server();

const grpcServer = () => {
  server.bindAsync(
    `0.0.0.0:${process.env.AUTH_GRPC_PORT}`,
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
      if (err) {
        console.log(err, "error happened grpc user service");
        return;
      }
      console.log("grpc auth server started on port:", port);
    }
  );
};

server.addService((authProto.AuthService as any).service, {
  AuthToken: controller.isAuthenticated
});
grpcServer();
