import { IAuthController } from "../interface/IAuthController";
import jwt from 'jsonwebtoken';


export class AuthController implements IAuthController{

    isAuthenticated : any = async(call:any,callback:any)=>{

        try{
            const userData = call.request.token || ""
            const decoded: any = jwt.verify(userData, process.env.JWT_SECRET || "");
            if(!decoded){
                callback(null,{status:false})
            }else{
                callback(null,{status:true})
            }
           
        }catch(e: any){
            callback(e, null)
        }
    }

}