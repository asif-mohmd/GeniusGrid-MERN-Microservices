import { IUserRepository } from "../interfaces/IUserRepository";
import UserModel, { IUser } from "../model/schemas/user.schema";
import { User } from "../entities/user.entities";

export class UserRepository implements IUserRepository {
  async uploadAvatar(userId: string, avatarURL: string): Promise<any> {
    try {
      let user = await UserModel.findOne({ _id: userId });
      if (user) {
        user.avatar = avatarURL;
        await user.save();

        return { success: true };
      } else {
        return { success: false };
      }
    } catch (error) {
      throw new Error("Error updating password");
    }
  }
  async createUserCourse(userId: string, courseId: string): Promise<any> {
    try {
      // Find the user by userId
      const userDetails = await UserModel.findById(userId);

      if (!userDetails) {
        throw new Error("User not found");
      }

      const update = await UserModel.updateOne(
        { _id: userId },
        { $addToSet: { courses: courseId } }
      );

      // Save the updated user document

      return update;
    } catch (error) {
      console.error("Error adding course to user:", error);
      throw error;
    }
  }

  async userDetails(userId: string): Promise<any> {
    try {
      const userDetails = await UserModel.findOne({ _id: userId });
      return userDetails;
    } catch (error) {}
  }

  async blockUnblock(
    userId: string,
    isVerified: Boolean
  ): Promise<Boolean | any> {
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        { isVerified },
        { new: true }
      );

      if (!updatedUser) {
        return false; // Or handle the error accordingly
      }

      return true; // Or you can return the updated user object or any other relevant data
    } catch (error) {
      console.error("Error updating user:", error);
      throw error; // Or handle the error accordingly
    }
  }

  async updateOne(email: string, password: string): Promise<any> {
    try {
      let user = await UserModel.findOne({ email: email });
      if (user) {
        user.password = password;
        await user.save();

        return { success: true };
      } else {
        return { success: false };
      }
    } catch (error) {
      throw new Error("Error updating password");
    }
  }

  register(userData: User): Promise<IUser | null> {
    try {
      return UserModel.create(userData);
    } catch (e: any) {
      throw new Error("db error");
    }
  }

  async findOne(email: string): Promise<IUser | null> {
    try {
      const user = await UserModel.findOne({ email });
      return user;
    } catch (e: any) {
      throw new Error("db error");
    }
  }

  async getUsers() {
    try {
      const userList = await UserModel.find();
      return userList;
    } catch (error) {}
  }

  findById(id: string): Promise<IUser | null> {
    throw new Error("Method not implemented.");
  }
  findByIdAndUpdate(id: string, name: string): Promise<IUser | null> {
    throw new Error("Method not implemented.");
  }
  avatarUpdate(id: string, avatar: string): Promise<IUser | null> {
    throw new Error("Method not implemented.");
  }
  updatePassword(id: string, password: string): Promise<IUser | null> {
    throw new Error("Method not implemented.");
  }
}
