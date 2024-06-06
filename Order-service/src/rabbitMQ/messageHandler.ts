
import { OrderController } from "../controller/orderController"
import { OrderInteractor } from "../interactor/orderInteractor"
import { OrderRepository } from "../repository/orderRepository"
import rabbitClient from "./client"




const repository = new OrderRepository()
const interactor = new OrderInteractor(repository)
const controller = new OrderController(interactor)

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
        case "make-payment":
            response = await controller.onMakePayment.bind(controller)(data);
            break;
        case "get-course-purchased-users":
            response = await controller.onGetPurchasedUsers.bind(controller)(data)
            break;
      

            default:
                response = 0;
                break
    }

    await rabbitClient.produce(response,correlationId,reply)

}
}
