import mongoose from "mongoose";
import {
  Course,
  CourseDetails,
  IEditCourse,
  LessonsContents,
  PurchasedCourseDetails,
} from "../entities/Course";
import { ICourseRepository } from "../interfaces/ICourseRepository";
import { CourseModel, LessonVideo } from "../model/schemas/course";

export class CourseRepository implements ICourseRepository {
  async getAllUserPurchasedCourses(
    userCourses: string[]
  ): Promise<any | PurchasedCourseDetails> {
    try {
      const courses = await CourseModel.find({
        _id: { $in: userCourses },
      });
      return courses;
    } catch (error) {
      console.error("Error fetching courses:", error);
      throw error;
    }
  }

  async deleteCourseDetails(courseId: string): Promise<boolean> {
    try {
      const response = await CourseModel.deleteOne({ _id: courseId });
      if (response.deletedCount && response.deletedCount > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error deleting course:", error);
      return false;
    }
  }

  async createEditCourseData(
    instructorId: string,
    courseData: Course,
    lessonsContents: LessonsContents
  ): Promise<boolean | any> {
    try {
      // Create the lesson document in the database
      let response;
      if (!courseData._id) {
        response = await CourseModel.create({ ...courseData, instructorId });
      } else {
        response = await CourseModel.updateOne(
          { _id: courseData._id },
          { ...courseData, instructorId }
        );
      }

      if (response) {
        return true;
      } else {
        return false;
      }
      // Return true if the document is saved successfully
    } catch (error) {
      console.error("Error saving lesson document:", error);
      return false; // Return false if there's an error
    }
  }

  async CourseDetails(courseId: string): Promise<CourseDetails | any> {
    try {
      const courseDetials = await CourseModel.findOne({ _id: courseId });
      if (courseDetials) {
        return courseDetials;
      } else {
        return false;
      }
    } catch (error) {}
  }

  async GetAllUserCourses(): Promise<CourseDetails | any> {
    try {
      const courseDetials = await CourseModel.find();
      if (courseDetials) {
        return courseDetials;
      } else {
        return false;
      }
    } catch (error) {}
  }

  async listAllCourse(instructorId: string): Promise<any> {
    const courseList = await CourseModel.find({ instructorId });
    if (courseList) {
      return courseList;
    } else {
      return false;
    }
  }

  async  addQuestion(data: any): Promise<Object | null> {
    try {
        const course = await CourseModel.findById(data.courseId);
        if (!course) {
            return null;
        }

        // Flatten the lessons array and find the content by ID
        let courseContent: LessonVideo | undefined;
        for (const lessonArray of course.lessons) {
            courseContent = (lessonArray as LessonVideo[]).find((item: LessonVideo) =>
                item._id.equals(data.videoId)
            );
            if (courseContent) break;
        }

        if (!courseContent) {
            return null;
        }

        // Add the question to the questions array with an ObjectId and timestamps
        const newQuestion = {
            ...data.newQuestion,
            _id: new mongoose.Types.ObjectId(),
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        courseContent.questions.push(newQuestion);
        await course.save();
        return { success: true };
    } catch (e: any) {
        // Handle the error appropriately
        console.error("Error adding question:", e);
        return { success: false, error: e.message };
    }
}

async  addAnswer(data: any): Promise<Object | null> {
    try {
        const course = await CourseModel.findById(data.courseId);
        if (!course) {
            return null;
        }

        // Flatten the lessons array and find the content by ID
        let courseContent: LessonVideo | undefined;
        for (const lessonArray of course.lessons) {
            courseContent = (lessonArray as LessonVideo[]).find((item: LessonVideo) =>
                item._id.equals(data.videoId)
            );
            if (courseContent) break;
        }

        if (!courseContent) {
            return null;
        }

        // Find the specific question by ID
        const question = courseContent.questions.find((q: any) =>
            q._id.equals(data.questionId)
        );

        if (!question) {
            return null;
        }

        // Push the answer to the questionReplies array
        question.questionReplies.push(data.answerList);

        await course.save();
        return { success: true };
    } catch (e: any) {
        console.error("Error adding answer:", e);
        return { success: false, error: e.message };
    }
}


}