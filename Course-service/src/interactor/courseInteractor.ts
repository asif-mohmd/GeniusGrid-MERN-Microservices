import { ICourseRepository } from "../interfaces/ICourseRepository";
import { Course, CourseDetails, IEditCourse, LessonsContents, PurchasedCourseDetails } from "../entities/Course";
import { ICourseInteractor } from "../interfaces/ICourseInteractor";

export class CourseInteractor implements ICourseInteractor {
  private repository: ICourseRepository;

  constructor(repository: ICourseRepository) {
    this.repository = repository;
  }
  async getAllUserPurchasedCourses(userCourses:string[]): Promise<boolean | PurchasedCourseDetails> {
    return await this.repository.getAllUserPurchasedCourses(userCourses)
  }


  async deleteCourseDetails(courseId: string): Promise<boolean | CourseDetails> {
     return await this.repository.deleteCourseDetails(courseId)
  }
  async createEditCourse(instructorId: string, courseData: Course, lessonsContents: LessonsContents): Promise<boolean | any> {
    try {
      return await this.repository.createEditCourseData(instructorId, courseData, lessonsContents);
    } catch { }

  }



  async getCourseDetails(courseId: string): Promise<CourseDetails | any> {
    try {
      const response = await this.repository.CourseDetails(courseId);
      if (response) {
        return response
      } else {
        return false
      }
    } catch (error) {

    }
  }

  async getAllUserCourses(): Promise<CourseDetails | any> {
    try {
      const response = await this.repository.GetAllUserCourses();
      if (response) {
        return response
      } else {
        return false
      }
    } catch (error) {

    }
  }





  async listCourse({ instructorId }: { instructorId: string }): Promise<any> {
    try {
      console.log("I am inside listCourse method of CourseInteractor");
      const response = await this.repository.listAllCourse(instructorId);
      if (response) {
        return response
      } else {
        return false
      }
    } catch (error) {
      console.error("Error in listCourse method:", error);
      throw error; // Rethrow the error for the caller to handle it
    }
  }

  addQuestion(data: any): Promise<Object | null> {
    return this.repository.addQuestion(data);
  }

  addAnswer(data: any): Promise<Object | null> {
    return this.repository.addAnswer(data);
  }


}