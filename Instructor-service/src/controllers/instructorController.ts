import { IInstructorInteractor } from "../interfaces/IInstructorInteractor";
const mongoose = require('mongoose');

export class InstructorController {
  private interactor: IInstructorInteractor;

  constructor(interactor: IInstructorInteractor) {
    this.interactor = interactor;
  }

  onRegister: any = async (call: any, callback: any) => {
    try {
      const request = call.request as {
        name: string;
        email: string;
        password: string;
      };
      const response = await this.interactor.instructorRegister(request);
      if (response.registerStatus) {
        callback(null, {
          msg: "OTP send",
          registerStatus: true,
          instructorData: response.activationToken,
        });
      } else {
        callback(null, {
          msg: "User Already exists",
          registerStatus: false,
        });
      }
    } catch (error) {
      callback(error);
    }
  };

  onActivateInstructor: any = async (call: any, callback: any) => {
    try {
      const request = call.request as {
        name: string;
        email: string;
        password: string;
      };
      const response = await this.interactor.activateInstructor(request);
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
      const response = await this.interactor.instructorLogin(email, password);
      callback(null, {
        msg: response.msg,
        status: response.status,
        activationToken: response.activationToken,
        loginStatus: response.loginStatus,
      });
    } catch (error) {
      callback(error);
    }
  };

  onGetAllInstructors: any = async (call: any, callback: any) => {
    try {
      const response = await this.interactor.getAllInstructors();
    
      if (response && response.length > 0) {
        const instructors = response
    
        callback(null, { instructors: instructors });
      } else {
        callback(null, { instructors: [] }); // Sending an empty array if there are no users
      }
    } catch (error) {
      callback(error);
    }
    
  }

  onBlockUnblock: any = async (call: any, callback: any) => {
    try {
      const {id,isVerified} = call.request 
      const response = await this.interactor.blockUnblockInstructor(id,isVerified);
    
      if (response) {
        
        callback(null, 
          {instructorStatus : true}
        );
      } else {
        callback(null, {instructorStatus : false}); // Sending an empty array if there are no users
      }
    } catch (error) {
      callback(error);
    }
    
  }

  onGetProfile: any = async (call: any, callback: any) => {
    try {
      const {instructorId} = call.request as {
        instructorId : string
      }
      const response = await this.interactor.getProfile(instructorId);
    
      if (response) {
        
        callback(null, 
          { name : response.name,
            email : response.email
          }
        );
      } else {
        callback(null, {instructorStatus : false}); // Sending an empty array if there are no users
      }
    } catch (error) {
      callback(error);
    }
    
  }


}
