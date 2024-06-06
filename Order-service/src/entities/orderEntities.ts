export interface CourseDetails {
    _id:string;
    instructorILd : string;
    thumbnail: string
    courseName: string;
    courseDescription: string;
    coursePrice: string;
    estimatedPrice: string;
    courseCategory: string;
    totalVideos: string;
    courseLevel: string;
    demoURL: string;
    benefits: Array<string>;
    prerequisites: Array<string>;
    instructorId:string;
    lessons: LessonVideo[][];
}

interface LessonVideo  {
    videoTitle: string;
    videoURL: string;
    subtitleURL: string;
    videoDescription: string;
    links: string[];
}

export interface OrderData{
    courseId : string;
    userId : string
    userName : string,
    userEmail : string,
    instructorId : string
    courseName : string
    courseCategory : string
    coursePrice : string
}


// import Stripe from 'stripe'
// const stripe = new Stripe(process.env.STRIPE_SECRET as string)

// import { CourseDetails } from "../entities/orderEntities";
// import { IOrderRepository } from "../interfaces/IOrderRepository";
// import { model } from 'mongoose';
// import client from '../rabbitMQ/client';

// export class OrderInteractor implements OrderInteractor {
//     private repository: IOrderRepository;
   
  
//     constructor(repository: IOrderRepository) {
//       this.repository = repository;
//     }

//     async makePayment(courseDetails: CourseDetails): Promise<boolean | any> {

//         try {
//             const paymentIntent  = await stripe.paymentIntents.create({
//                 amount: parseInt(courseDetails.coursePrice, 10),
//                 currency: 'inr' ,
//                 automatic_payment_methods :{
//                     enabled: true,
//                 }
//             });
//             return  paymentIntent ?.client_secret
//         } catch (error) {
//             return error
//         }
      
//     }

   
// }