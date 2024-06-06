import { Admin } from "../model/admin.entities";

export interface IAdminInteractor {
 
    adminLogin(email: string, password: string): any;
    addCategory(categoryName:string): any;
    getAllCategories(): any
}
