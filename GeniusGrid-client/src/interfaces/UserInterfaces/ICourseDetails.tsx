export interface Course {
    id: number;
    thumbnail:string;
    courseName: string;
    coursePrice: number;
    courseLevel: string;
    totalVideos: number;
    // Add any other properties here
  }
  
  
  export interface AllCourse{
    _id: number;
    thumbnail:string;
    courseName: string;
    coursePrice: number;
    courseLevel: string;
    totalVideos: number;
    courseCategory:number;
  }

  interface questionReplyDetails{
    user:object;
    answer:string;
    createdAt: number
  }

interface questionDetails{
  user: object;
  question: string;
  questionReplies: questionReplyDetails[]

}

  export interface Lesson {
    _id:string;
    videoTitle: string;
    videoURL: string;
    subtitleURL: string;
    videoDescription: string;
    links: string[]; // Assuming links are strings
    questions: questionDetails[]
    // Add other properties here if needed
  }
  

  export interface CourseData {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _id: any;
    courseName: string;
    coursePrice: string;
    courseDescription: string;
    courseLevel: string;
    course: string;
    demoURL: string;
    estimatedPrice: string;
    instructorId: string;
    totalVideos: string;
    prerequisites: string[];
    benefits: string[];
    lessons: Lesson[][]; 
  }

export interface LessonsOnly{
  lessons: Lesson[][]
}