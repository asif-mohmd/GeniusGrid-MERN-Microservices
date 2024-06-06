import dotenv from "dotenv";
import * as grpc from "@grpc/grpc-js"
import * as protoLoader from "@grpc/proto-loader"
import path from "path"
import { InstructorController } from "./controllers/instructorController";
import { InstructorInteractor } from "./interactor/instructorInteractor";
import { InstructorRepository } from "./repository/instructorRepository";
import { connectDB } from "./config/mongodb/db";

dotenv.config();
connectDB()


const packageDefinition = protoLoader.loadSync(path.join(__dirname,"/protos/instructor.proto"),
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });


const instructorProto = grpc.loadPackageDefinition(packageDefinition)

const repository = new InstructorRepository()
const interactor = new InstructorInteractor(repository)
const controller = new InstructorController(interactor)

const server = new grpc.Server()

const grpcServer = () =>{
    server.bindAsync(`0.0.0.0:${process.env.INSTRUCTOR_GRPC_PORT}`,
    grpc.ServerCredentials.createInsecure(),
    (err,port)=>{
        if(err){
            console.log(err,"error happened grpc user service");
            return
        }
        console.log("grpc instructor server started on port:",port)
    }
    )
}

    server.addService((instructorProto.InstructorService as any).service, {

        Register : controller.onRegister.bind(controller),
        Login : controller.onLogin.bind(controller),
        ActivateInstructor : controller.onActivateInstructor.bind(controller),
        GetAllInstructors : controller.onGetAllInstructors.bind(controller),
        InstructorBlockUnblock : controller.onBlockUnblock.bind(controller),
        Profile : controller.onGetProfile.bind(controller)

        
        // Implementation of service methods
    });

grpcServer();


