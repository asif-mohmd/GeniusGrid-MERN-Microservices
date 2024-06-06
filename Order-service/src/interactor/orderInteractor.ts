import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

import { CourseDetails } from "../entities/orderEntities";
import { IOrderRepository } from "../interfaces/IOrderRepository";

export class OrderInteractor implements OrderInteractor {
  private repository: IOrderRepository;

  constructor(repository: IOrderRepository) {
    this.repository = repository;
  }

  async getPurchasedUsers(instructorId: any): Promise<boolean | any> {
return await this.repository.getPurchasedUsers(instructorId)
  }

  async makePayment(data: any): Promise<boolean | any> {
    try {

      const courseDetails = data.courseData;
      const userDetails = data.userData;

      const orderDetails = {
        courseId: courseDetails._id,
        userId: userDetails.id,
        userName: userDetails.name,
        userEmail: userDetails.email,
        instructorId: courseDetails.instructorId,
        courseName: courseDetails.courseName,
        courseCategory: courseDetails.courseCategory,
        coursePrice: courseDetails.coursePrice,
      };


      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        success_url: `${process.env.CLIENT_SITE_URL}/payment/success`,
        cancel_url: `${process.env.CLIENT_SITE_URL}`,
        client_reference_id: data._id,
        line_items: [
          {
            price_data: {
              currency: "inr",
              // Convert the string to 'unknown' first, then to 'number'
              unit_amount: (Number(courseDetails.coursePrice) as number) * 100,
              product_data: {
                name: courseDetails.courseName,
                description: courseDetails.courseDescription,
                images: [courseDetails.thumbnail],
              },
            },
            quantity: 1,
          },
        ],
      });

      const createOrder = await this.repository.createOrder(orderDetails);

      if (createOrder) {
        return session;
      } else {
        return false;
      }
      // console.log(session, "sessionsss");
    } catch (error) {
      console.log("order intra errrr:", error);
      return error;
    }
  }
}
