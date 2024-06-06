import { IInstructorRepository } from "../interfaces/IInstructorRepository";
import { Instructor } from "../entities/instructor.entities";
import { IInstructor } from "../model/schemas/instructor.schema";
import { IInstructorInteractor } from "../interfaces/IInstructorInteractor";
import { generateToken } from "../utils/generateToken";
import { sendMail } from "../utils/nodeMailer";
import { loginToken } from "../utils/loginToken";

export class InstructorInteractor implements IInstructorInteractor {
  private repository: IInstructorRepository;

  constructor(repository: IInstructorRepository) {
    this.repository = repository;
  }


  async getProfile(instructorId: string): Promise<any> {
    try {
      const response = await this.repository.Profile(instructorId)

      if (response) {
        return response
      } else {
        return false
      }
    } catch (error) {

    }

  }


  async blockUnblockInstructor(instructorId: string, isVerified: Boolean): Promise<Boolean | void> {
    try {
      const response = await this.repository.blockUnblock(instructorId, isVerified)

      if (response) {
        return true
      } else {
        return false
      }
    } catch (error) {

    }
  }

  async getAllInstructors() {
    try {
      const instructorsList = await this.repository.getInstructors()
      return instructorsList
    } catch (error) {

    }
  }
  async instructorRegister(instructorData: Instructor) {
    try {
      const isEmailExist = await this.repository.findOne(instructorData.email);

      if (isEmailExist) {
        const registerStatus = false;
        return registerStatus;
      }
      const activationToken = generateToken(instructorData);
      const registerStatus = true;
      const options = {
        email: instructorData.email,
        otp: activationToken.activationCode,
      };
      sendMail(options);
      return { registerStatus, activationToken };
    } catch (err) {
      console.log(err, "errrr user regisssssss");
    }
  }

  async activateInstructor(instructorData: { name: string; email: string; password: string }): Promise<any> {
    const instructorDataWithVerification = {
      ...instructorData,
      isVerified: true,
    };

    const response = await this.repository.register(instructorDataWithVerification);

    if (response) {
      return true;
    }
  }

  async instructorLogin(email: string, password: string) {
    try {
      const loginStatus: boolean = true;
      const instructor: IInstructor | null = await this.repository.findOne(email);
      if (!instructor) {
        const loginStatus: boolean = false;
        const response = { msg: "Instructor not found", status: 401, loginStatus };

        return response
      }
      const isPasswordValid = await instructor.comparePassword(password);

      if (!isPasswordValid) {
        const loginStatus: boolean = false;
        const response = { msg: "Password incorrect", status: 402, loginStatus };
        return response;
      }

      if(instructor.isVerified){
        const activationToken = loginToken(instructor.id);
      
        const response = { msg: "Login successful", status: 201, activationToken, loginStatus };
  
        return response;
      }else{
        const loginStatus: boolean = false;
        const response = { msg: "Your account is blocked", status: 403, loginStatus };

        return response
      }

     
    } catch (err: any) {
      const loginStatus: boolean = false;
      const response = { msg: "Something went wrong", status: 404, loginStatus };
      return response;
    }
  }


  findOne(email: string): Promise<IInstructor | null> {
    throw new Error("Method not implemented.");
  }
  findById(id: string): Promise<IInstructor | null> {
    throw new Error("Method not implemented.");
  }
  findByIdAndUpdate(id: string, name: string): Promise<IInstructor | null> {
    throw new Error("Method not implemented.");
  }
  avatarUpdate(id: string, avatar: string): Promise<IInstructor | null> {
    throw new Error("Method not implemented.");
  }
  updatePassword(id: string, password: string): Promise<IInstructor | null> {
    throw new Error("Method not implemented.");
  }

  userRegister(input: any): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  updateUser(input: any): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

}
