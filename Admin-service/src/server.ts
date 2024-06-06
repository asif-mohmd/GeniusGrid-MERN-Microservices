import dotenv from 'dotenv'
import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import path from 'path'
import { AdminController } from './controllers/adminController'
import { AdminInteractor } from './interactor/adminInteractor'
import { AdminRepository } from './repository/adminRepository'
import { connectDB } from './config/mongodb/db'

dotenv.config()
connectDB()

const packageDefinition = protoLoader.loadSync(
  path.join(__dirname, '/protos/admin.proto'),
  { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true }
);

const adminProto = grpc.loadPackageDefinition(packageDefinition)

const repository = new AdminRepository()
const interactor = new AdminInteractor(repository)
const controller = new AdminController(interactor)

const server = new grpc.Server();


const grpcServer = () => {
  server.bindAsync(
    `0.0.0.0:${process.env.ADMIN_GRPC_PORT}`,
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
      if (err) {
        console.log(err, "error happened grpc user service"),port;
        return;
      }
      console.log("grpc user server started on port:", port);
    }
  );
};

    server.addService((adminProto.AdminService as any).service, {

        Login : controller.onLogin.bind(controller),
        AddCategory : controller.addCategory.bind(controller),
        GetAllCategories : controller.getAllCategories.bind(controller)
    
        
        // Implementation of service methods
    });
grpcServer();
