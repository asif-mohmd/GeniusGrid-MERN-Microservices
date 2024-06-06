import { IInstructorRepository } from "../interfaces/IInstructorRepository";
import { Instructor } from "../entities/instructor.entities";
import InstructorModel, {
  IInstructor,
} from "../model/schemas/instructor.schema";
const mongoose = require("mongoose");

export class InstructorRepository implements IInstructorRepository {
  async Profile(instructorId: string): Promise<any> {
    try {
      // Convert string instructorId to ObjectId
      const instructor = await InstructorModel.findOne({ _id: instructorId });
      if (instructor) {
        return instructor;
      } else {
        return false;
      }
    } catch (error) {}
  }

  async blockUnblock(
    instructorId: string,
    isVerified: Boolean
  ): Promise<Boolean | any> {
    try {
      const updatedInstructor = await InstructorModel.findByIdAndUpdate(
        instructorId,
        { isVerified },
        { new: true }
      );

      if (!updatedInstructor) {
        return false; // Or handle the error accordingly
      }

      return true; // Or you can return the updated user object or any other relevant data
    } catch (error) {
      console.error("Error updating user:", error);
      throw error; // Or handle the error accordingly
    }
  }

  async getInstructors() {
    try {
      const instructorsList = await InstructorModel.find();
      return instructorsList;
    } catch (error) {}
  }
  register(instructorData: Instructor): Promise<IInstructor | null> {
    try {
      return InstructorModel.create(instructorData);
    } catch (e: any) {
      throw new Error("db error");
    }
  }

  async findOne(email: string): Promise<any> {
    try {
      const instructor = await InstructorModel.findOne({ email });
      if (instructor) {
        return instructor;
      }
      return false;
    } catch (err) {}
  }
  findById(id: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  findByIdAndUpdate(id: string, name: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  avatarUpdate(id: string, avatar: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  updatePassword(id: string, password: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
