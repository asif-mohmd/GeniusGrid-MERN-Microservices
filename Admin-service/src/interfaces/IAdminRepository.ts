import { IAdmin } from "../model/schemas/admin.schema";
import { Admin } from "../model/admin.entities";

export interface IAdminRepository {
  
    adminLogin(email: string, password: string): any;
    addCategory(categoryName:string): any;
    getAllCategories(): any

}