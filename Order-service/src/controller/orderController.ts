import { IOrderInteractor } from "../interfaces/IOrderInteractor";

export class OrderController {
  private interactor: IOrderInteractor;

  constructor(interactor: IOrderInteractor) {
    this.interactor = interactor;
  }

  onMakePayment = async (data: any) => {
    try {
      const courseDetails = data.courseData;
      const userDetails = data.userData;
      //   const userDetails = data.userDetails
      return await this.interactor.makePayment(data);
    } catch (err) {}
  };

  onGetPurchasedUsers = async (instructorId: string) => {
    try {
      //   const userDetails = data.userDetails
      return await this.interactor.getPurchasedUsers(instructorId);
    } catch (err) {}
  };
}
