import dotenv from "dotenv";
import * as grpc from "@grpc/grpc-js"
import * as protoLoader from "@grpc/proto-loader"
import path from "path"
import { CourseController } from "./controllers/courseController";
import { CourseInteractor } from "./interactor/courseInteractor";
import { CourseRepository } from "./repository/courseRepository";
import { connectDB } from "./config/mongodb/db";
import RabbitMQClient from "./rabbitMQ/client"

dotenv.config();
connectDB()

RabbitMQClient.initialize()


const packageDefinition = protoLoader.loadSync(path.join(__dirname,"/protos/course.proto"),
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });


const courseProto = grpc.loadPackageDefinition(packageDefinition)

const repository = new CourseRepository()
const interactor = new CourseInteractor(repository)
const controller = new CourseController(interactor)

const server = new grpc.Server()



const grpcServer = () =>{
    server.bindAsync(`0.0.0.0:${process.env.COURSE_GRPC_PORT}`,
    grpc.ServerCredentials.createInsecure(),
    (err,port)=>{
        if(err){
            console.log(err,"error happened grpc course service");
            return
        }
        console.log("grpc course server started on port:",port)
    }
    )
}

    server.addService((courseProto.CourseService as any).service, {

        // CreateCourse : controller.onCreateCourse.bind(controller),
        ListCourse : controller.onListCourse.bind(controller),
        // GetCourseDetails : controller.onGetCourseDetails.bind(controller),
        // AddLessonContent : controller.onAddLessonsContent.bind(controller)
        
        // Implementation of service methods
    });

grpcServer();


// accescourse