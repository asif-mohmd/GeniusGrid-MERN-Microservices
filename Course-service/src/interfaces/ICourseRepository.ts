import { Course, CourseDetails, IEditCourse, LessonsContents, PurchasedCourseDetails } from "../entities/Course";

export interface ICourseRepository {
    // createCourseData(courseData: Course):Promise<any | null>;
    listAllCourse(instructorId:string): Promise<any | null>;
    CourseDetails(courseId:string): Promise<CourseDetails>;
    createEditCourseData(instructorId:string,courseData:Course,lessonsContents:LessonsContents):Promise<boolean>
    deleteCourseDetails(courseId:string): Promise<CourseDetails | boolean>;
    GetAllUserCourses(): Promise<CourseDetails | any>;
    getAllUserPurchasedCourses(userCourses:string[]):Promise<PurchasedCourseDetails | any>;
    addQuestion(data: any): Promise<Object | null>;
    addAnswer(data: any): Promise<Object | null>;



}