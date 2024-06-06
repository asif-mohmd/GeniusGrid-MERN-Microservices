export interface Course {
    _id:string;
    thumbnail: string
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
    instructorId:string;
    lessons: LessonVideo[][];
}

interface LessonVideo  {
    videoTitle: string;
    videoURL: string;
    subtitleURL: string;
    videoDescription: string;
    links: string[];
}
export interface CourseDetails {
    id: string;
    thumbnail: string
    instructorId: string;
    courseName: string;
    courseDescription: string;
    coursePrice: string;
    estimatedPrice: string;
    courseCategory: string;
    totalVideos: string;
    courseLevel: string;
    demoURL: string;
    benefits: string[];
    prerequisites: string[];
}

export interface IEditCourse {
    courseId: string;
    thumbnail: string
    courseName: string;
    courseDescription: string;
    coursePrice: string;
    estimatedPrice: string;
    courseCategory: string;
    totalVideos: string;
    courseLevel: string;
    demoURL: string;
    benefits: string[];
    prerequisites: string[];

}


export interface IContent {
    videoTitle: string;
    videoURL: string;
    subtitleURL: string;
    videoDescription: string;
    links: any[]; // Adjust the type according to the actual structure of links
}

export interface LessonsContents {
    videos: IContent[];
}


export interface PurchasedCourseDetails {
    id: string;
    name: string; 
    description: string;
    thumbnail: string;
}