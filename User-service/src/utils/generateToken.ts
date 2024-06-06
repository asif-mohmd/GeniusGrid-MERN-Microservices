import jwt,{ Secret } from "jsonwebtoken";

import "dotenv/config";



interface IActivationToken {
    token: string;
    activationCode: string;
  }

  export const generateToken = (userData: Object): IActivationToken => {
   
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();


    const token = jwt.sign(
      {
        userData,
        activationCode,
      },
      process.env.JWT_SECRET as Secret,
      {
        expiresIn: "5m",
      }
    );


    return { token, activationCode };
  };