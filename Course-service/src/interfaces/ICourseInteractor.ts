import { Course, CourseDetails, IEditCourse, LessonsContents, PurchasedCourseDetails } from "../entities/Course";

export interface ICourseInteractor {
    // createCourse(courseData: Course): Promise<any | null>;
    listCourse({ instructorId }: { instructorId: string }): Promise<any | boolean>;
    getCourseDetails(courseId:string): Promise<CourseDetails | boolean>;
    createEditCourse(instructorId:string,courseData: Course,lessonsContents:LessonsContents):Promise<boolean>
    deleteCourseDetails(courseId:string): Promise<CourseDetails | boolean>;
    getAllUserCourses(): Promise<CourseDetails | boolean>;
    getAllUserPurchasedCourses(userCourses:string[]):Promise<PurchasedCourseDetails | boolean>;
    addQuestion(data: any): any;
    addAnswer(data: any): Promise<Object | null>;
}
