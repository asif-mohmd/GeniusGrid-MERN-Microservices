import { response } from "express";
import { IAdminInteractor } from "../interfaces/IAdminInteractor";

export class AdminController {
  private interactor: IAdminInteractor;

  constructor(interactor: IAdminInteractor) {
    this.interactor = interactor;
  }

  onLogin: any = async (call: any, callback: any) => {
    try {
      const { email, password } = call.request as {
        email: string;
        password: string;
      };
      const response = await this.interactor.adminLogin(email, password);
      if (response.loginStatus) {
        callback(null, {
          msg: "login successful",
          loginStatus: true,
          activationToken: response.activationToken,
        });
      } else {
        callback(null, {
          msg: "Admin login failed",
          loginStatus: false,
        });
      }
    } catch (error) {
      callback(error);
    }
  };

  addCategory: any = async (call: any, callback: any) => {
    try {
      const { categoryName } = call.request as {
        categoryName: string;
      };

      const response = await this.interactor.addCategory(categoryName);
      if (response) {
        callback(null, {
          status: true,
        });
      } else {
        callback(null, {
          status: false,
        });
      }
    } catch (error) {
      callback(error);
    }
  };
  getAllCategories: any = async (call: any, callback: any) => {
    try {
      const response = await this.interactor.getAllCategories();

      if (response && response.length > 0) {
        let res = {
          ...response,
        };

        callback(null, {
          status: true,
          categoryNames: response,
        });
      } else {
        callback(null, {
          status: false,
        });
      }
    } catch (error) {
      callback(error);
    }
  };
}
