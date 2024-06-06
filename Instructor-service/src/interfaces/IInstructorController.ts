import { Instructor } from "../entities/instructor.entities";

export interface IInstructorController {
  instructorRegister(userData: {
      name: string;
      email: string;
      password?: string;
      avatar?: string;
    }): any;
    activateInstructor(instructorData: { name: string, email: string, password: string ,}): any;
    getUser(id: string): Promise<Instructor | any>;
    instructorLogin(email: string, password: string): any;
    updateUserInfo(id: string, name: string): any;
    updateAvatar(
      data: Buffer,
      fieldName: string,
      mimeType: string,
      id: string
    ): any;
    updatePassword(oldPassword: string, newPassword: string, userId: string): any;
  }