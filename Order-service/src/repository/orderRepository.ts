import { OrderData } from "../entities/orderEntities";
import { IOrderRepository } from "../interfaces/IOrderRepository";
import Order from "../model/order.schema";

export class OrderRepository implements IOrderRepository {
  async getPurchasedUsers(instructorId: string) {
    try {
      const orders = await Order.find({ instructorId: instructorId });
      return orders;
    } catch (error) {}
  }
  async createOrder(orderDetails: OrderData): Promise<any> {
    return await Order.create(orderDetails);
  }
}
