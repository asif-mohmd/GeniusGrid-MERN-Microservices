import jwt,{ Secret } from "jsonwebtoken";
import "dotenv/config";


  export const loginToken = (email: string,password:string): string => {
  
    const token = jwt.sign(
      {
        email,
        password
      },
      process.env.JWT_SECRET as Secret,
      
    );

    return token
  };  