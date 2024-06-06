import { IAdminRepository } from "../interfaces/IAdminRepository";
import { Admin } from "../model/admin.entities";
import { IAdmin } from "../model/schemas/admin.schema";
import Category from "../model/schemas/category.schema"; // Import ICategory interface

export class AdminRepository implements IAdminRepository {
    async getAllCategories() {
        const categories = await Category.find();
        return  categories.map(category => category.categoryName);
    }
    
    async addCategory(categoryName: string): Promise<any> {
        try {
            const category = await Category.create({ categoryName });
            if(category){
                return true
            }else{
                return false
            }
           
        } catch (error) {
            console.error('Error adding category:', error);
            throw error;
        }
    }

    adminLogin(email: string, password: string) {
        throw new Error("Method not implemented.");
    }
}
