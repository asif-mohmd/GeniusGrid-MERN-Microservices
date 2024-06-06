import { CourseController } from "../controllers/courseController"
import { CourseInteractor } from "../interactor/courseInteractor"
import { CourseRepository } from "../repository/courseRepository"
import rabbitClient from "./client"




const repository = new CourseRepository()
const interactor = new CourseInteractor(repository)
const controller = new CourseController(interactor)

export default class MessageHandler {
  static async handle(
    operation: string,
    data: any,
    correlationId: string,
    reply: string
  ){
    let response = data

    console.log("The operation is ",operation)

    switch (operation){
        case "create-edit-course":
            response = await controller.onCreateOrEditCourse.bind(controller)(data);
            break;

        case "get-course-details":
            response = await controller.GetCourseDetails.bind(controller)(data);
            break;

        case "delete-course-details":
             response = await controller.onDeleteCourseDetails.bind(controller)(data);
             break;

        case "get-all-user-courses":
            response = await controller.onGetAllUserCourses.bind(controller)();
             break;

        case "get-user-purchased-courses":
          response = await controller.onGetAllUserPurchasedCourses.bind(controller)(data);
             break;
        case "add-question":
          response = await controller.addQuestion.bind(controller)(data);
             break;
      case "add-answer":
          response = await controller.addAnswer.bind(controller)(data);
           break;
      
            default:
                response = 0;
                break;
    }

    await rabbitClient.produce(response,correlationId,reply)

}
}
