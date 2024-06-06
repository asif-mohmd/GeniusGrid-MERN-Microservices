import jwt,{ Secret } from "jsonwebtoken";
import "dotenv/config";



interface IActivationToken {
    token: string;
    activationCode: string;
  }

  export const generateToken = (instructorData: Object): IActivationToken => {
   
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();


    const token = jwt.sign(
      {
        instructorData,
        activationCode,
      },
      process.env.JWT_SECRET as Secret,
      
    );


    return { token, activationCode };
  };