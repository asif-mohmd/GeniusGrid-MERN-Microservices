import { CourseDetails } from "../entities/orderEntities";

export interface IOrderInteractor {
    makePayment(courseDetails:CourseDetails):Promise<any | null>
    getPurchasedUsers(instructorId:string):Promise<any | null>

  
}