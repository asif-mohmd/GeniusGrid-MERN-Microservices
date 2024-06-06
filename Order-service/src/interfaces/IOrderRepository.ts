import { OrderData } from "../entities/orderEntities";

export interface IOrderRepository {
    // createCourseData(courseData: Course):Promise<any | null>;
    createOrder(orderDetails: OrderData):Promise<any | null>
    getPurchasedUsers(instructorId:string):Promise<any | null>


}