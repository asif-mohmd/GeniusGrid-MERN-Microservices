import { IUserInteractor } from "../interfaces/IUserInteractor";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  msg: string;
  status: string;
  otp: string;
  loginStatus: boolean;
}

export class UserController {
  private interactor: IUserInteractor;

  constructor(interactor: IUserInteractor) {
    this.interactor = interactor;
  }

  onCreateUserCourse: any = async(call:any,callback:any)=>{
    try{
      const {userId, courseId} = call.request as {
        userId: string;  
        courseId : string;
      };
      const response = await this.interactor.createUserCourse(
        userId,
        courseId
      );

    }catch(err){

    } 
  }

  onGetUserDetails: any = async(call:any,callback:any)=>{
    try {
      const {userId} = call.request as {
        userId: string;  
      };
      const response = await this.interactor.getUserDetails(
        userId,
      );

      if (response) {

        callback(null, {
          id:response._id,
          name: response.name,
          email: response.email,
          courses: response.courses,
          avatar: response.avatar
        });
      } else {
        callback(null, {
          passwordUpdate: false,
        });
      }
    } catch (err) {}
  }

  onPasswordUpdate: any = async (call: any, callback: any) => {
    try {
      const request = call.request as {
        email: string;
        password: string;
      };
      const response = await this.interactor.passwordUpdate(
        request.email,
        request.password
      );

      if (response) {
        callback(null, {
          passwordUpdate: true,
        });
      } else {
        callback(null, {
          passwordUpdate: false,
        });
      }
    } catch (err) {}
  };

  onForgotPassword: any = async (call: any, callback: any) => {
    try {
      const request = call.request as {
        email: string;
        password: string;
      };

      const response = await this.interactor.forgotPassword(
        request.email,
        request.password
      );
      if (response.forgotPasswordStatus) {
        callback(null, {
          forgotPasswordStatus: true,
          forgotData: response.activationToken,
        });
      } else {
        callback(null, {
          registerStatus: false,
        });
      }
    } catch (error: any) {
      callback(error);
    }
  };

  onRegister: any = async (call: any, callback: any) => {
    try {
      const request = call.request as {
        name: string;
        email: string;
        password: string;
      };
      const response = await this.interactor.userRegister(request);
      if (response.registerStatus) {
        callback(null, {
          msg: "OTP send",
          registerStatus: true,
          userData: response.activationToken,
        });
      } else {
        callback(null, {
          msg: "Auth error",
          registerStatus: false,
        });
      }
    } catch (error) {
      callback(error);
    }
  };
 
  onActivateUser: any = async (call: any, callback: any) => {
    try {
      const request = call.request as {
        name: string;
        email: string;
        password: string;
      };
      const response = await this.interactor.activateUser(request);
      if (response) {
        callback(null, {
          status: true,
        });
      } else {
        callback(null, {
          status: false,
        });
      }
    } catch (err) {
      callback(err);
    }
  };

  onLogin: any = async (call: any, callback: any) => {
    try {
      const { email, password } = call.request as {
        email: string;
        password: string;
      };
      console.log(email,"------",password)
      const response = await this.interactor.userLogin(email, password);



      callback(null, {
        msg: response.msg,
        status: response.status,
        activationToken: response.activationToken,
        loginStatus: response.loginStatus, 
        userId: response.user._id
      });
    } catch (error) {
      callback(error);
    }
  };

  onGetAllUsers: any = async (call: any, callback: any) => {
    try {
      const response = await this.interactor.getAllUsers();
    
      if (response && response.length > 0) {
        const users = response
    
        callback(null, { users: users });
      } else {
        callback(null, { users: [] }); // Sending an empty array if there are no users
      }
    } catch (error) {
      callback(error);
    }
    
  }

  onBlockUnblock: any = async (call: any, callback: any) => {
    try {
      const {id,isVerified} = call.request 
      const response = await this.interactor.blockUnblockUser(id,isVerified);
    
      if (response) {
        
        callback(null, 
          {userStatus : true}
        );
      } else {
        callback(null, {userStatus : false}); // Sending an empty array if there are no users
      }
    } catch (error) {
      callback(error);
    }
    
  }

  onAvatarURL: any = async (call: any, callback: any) => {
    try{
      console.log("hehrehrehrhehrehrherhehrherhehrhe")
      console.log(call.request)
      const {userId,avatarURL} = call.request

      const response = await this.interactor.uploadAvatar(userId,avatarURL);
      console.log(response,"ggggggggggg")
      if (response) {
        console.log(response,"pppppp")
        
        callback(null, 
          {status : true}
        );
      } else {
        callback(null, {status : false}); // Sending an empty array if there are no users
      }

    }catch(err){
      
    }
  }

  
}
