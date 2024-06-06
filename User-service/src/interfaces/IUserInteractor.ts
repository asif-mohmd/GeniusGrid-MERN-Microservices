import { User } from "../entities/user.entities";

export interface IUserInteractor {
    userRegister(userData: {
        name: string;
        email: string;
        password?: string;
        avatar?: string
        
      }): any;
      activateUser(userData: {
        name: string;
        email: string;
        password: string;
      }): any;
      getUser(id: string): Promise<User | any>;
      userLogin(email: string, password: string): any;
      updateUserInfo(id: string, name: string): any;

      updatePassword(oldPassword: string, newPassword: string, userId: string): any;
      forgotPassword(email: string, password: string): any;
      passwordUpdate(email: string, password: string): any;
      getAllUsers():any;
      blockUnblockUser(userId:string,isVerified:Boolean):Promise<Boolean  | void>
      getUserDetails(userId:string):Promise<User | undefined>
      createUserCourse(userId:string,courseId:string):Promise<any >
      uploadAvatar(userId:string,avatarURL:string):Promise<boolean|any>

    }
    