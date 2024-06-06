import { IUser } from "../model/schemas/user.schema";
import { User } from "../entities/user.entities";

export interface IUserRepository {
  register(userData: User): Promise<IUser | null>;
  findOne(email: string): Promise<IUser | null>;
  findById(id: string): Promise<IUser | null>;
  findByIdAndUpdate(id: string, name: string): Promise<IUser | null>;

  updatePassword(id: string, password: string): Promise<IUser | null>;
  updateOne: (email: string, password: string) => any

  getUsers():any;

  blockUnblock(userId:string,isVerified:Boolean):Promise<Boolean | any>
  userDetails(userId:string):Promise<User | any>
  createUserCourse(userId:string,courseId:string):Promise<any >
  uploadAvatar(userId:string,avatarURL:string):Promise<boolean|any>


}