import jwt,{ Secret } from "jsonwebtoken";
import "dotenv/config";


  export const loginToken = (instructorId: string): string => {
   
   

    const token = jwt.sign(
      {
        instructorId
      },
      process.env.JWT_SECRET as Secret,
      
    );


    return token
  };