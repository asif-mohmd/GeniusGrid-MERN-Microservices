import jwt,{ Secret } from "jsonwebtoken";
import "dotenv/config";


  export const loginToken = (userId: string): string => {
   
   

    const token = jwt.sign(
      {
        userId
      },
      process.env.JWT_SECRET as Secret,
      
    );


    return token
  };