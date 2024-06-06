import { IAdminRepository } from "../interfaces/IAdminRepository";
import { Admin } from "../model/admin.entities";
import { IAdmin } from "../model/schemas/admin.schema";
import { loginToken } from "../utils/loginToken";

export class AdminInteractor implements IAdminRepository {
  private repository: IAdminRepository;
  constructor(repository: IAdminRepository) {
    this.repository = repository
  }
  async addCategory(categoryName: string): Promise<boolean> {
    return await this.repository.addCategory(categoryName)
  }

  async getAllCategories(): Promise<any> {
    try {
      const response = await this.repository.getAllCategories()
      return response;
    } catch (error) {
    }
  }


  adminLogin(email: string, password: string) {
    try {

      if (email === "asifasifpsps@gmail.com" && password === "123") {
        const activationToken = loginToken(email, password);
        let loginStatus: boolean = true;
        const response = { msg: "Login successful", status: 201, activationToken, loginStatus };
        return response;
      } else {
        let loginStatus: boolean = false;
        const response = { msg: "Login Failed", status: 401, loginStatus };
        return response;
      }
    } catch (err: any) {
      let loginStatus: boolean = false;
      const response = { msg: "Login Failed", status: 402, loginStatus };
      return response;
    }
  }



}