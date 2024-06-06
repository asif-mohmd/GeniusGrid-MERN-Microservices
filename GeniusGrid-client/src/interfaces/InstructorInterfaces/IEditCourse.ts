export interface  IFullCourseCourseData {
    _id: string;
    thumbnail : File | string;
    instructorId:string;
    courseName: string;
    courseDescription: string;
    coursePrice: string;
    estimatedPrice: string;
    courseCategory: string;
    totalVideos: string;
    courseLevel: string;
    demoURL: string;
    benefits: Array<string>;
    prerequisites: Array<string>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    lessons: Array<Array<{ [key: string]: any }>>;
  
  }

  export interface IEditCourse {
    _id: string;
    thumbnail : File | string;
    courseName: string;
    courseDescription: string;
    coursePrice: string;
    estimatedPrice: string;
    courseCategory: string;
    totalVideos: string;
    courseLevel: string;
    demoURL: string;
    benefits: Array<string>;
    prerequisites: Array<string>;
  }
  