import mongoose, { Document, Schema, Model } from 'mongoose';

// Define the subdocument interface for Comment
interface Comment extends Document {
    user: object;
    question: string;
    questionReplies: object[];
    createdAt: Date;
    updatedAt: Date;
}

// Define the schema for Comment with timestamps
const commentSchema = new Schema<Comment>({
    user: { type: Object, required: true },
    question: { type: String, required: true },
    questionReplies: [{ type: Object, required: true }]
}, { timestamps: true });

// Define the subdocument interface for LessonVideo
interface LessonVideo extends Document {
    _id: mongoose.Types.ObjectId;  // Ensure _id is typed properly
    videoTitle: string;
    videoURL: string;
    subtitleURL: string;
    videoDescription: string;
    links: string[];
    questions: Comment[];
}

// Define the subdocument schema for LessonVideo
const lessonVideoSchema = new Schema<LessonVideo>({
    videoTitle: { type: String, required: true },
    videoURL: { type: String, required: true },
    subtitleURL: { type: String, required: true },
    videoDescription: { type: String, required: true },
    links: [{ type: String, required: true }],
    questions: [commentSchema]
});

// Define the main document interface for Course
interface Course extends Document {
    courseId: string;
    instructorId: string;
    thumbnail: string;
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
    lessons: LessonVideo[][];  // Ensure lessons is typed properly
}

// Define the main document schema for Course
const CourseSchema = new Schema<Course>({
    instructorId: { type: String, required: true },
    thumbnail: { type: String, required: true },
    courseName: { type: String, required: true },
    courseDescription: { type: String, required: true },
    coursePrice: { type: String, required: true },
    estimatedPrice: { type: String, required: true },
    courseCategory: { type: String, required: true },
    totalVideos: { type: String, required: true },
    courseLevel: { type: String, required: true },
    demoURL: { type: String, required: true },
    benefits: { type: [String], required: true },
    prerequisites: { type: [String], required: true },
    lessons: [[lessonVideoSchema]]
});

// Define the lesson model
const CourseModel: Model<Course> = mongoose.model('Course', CourseSchema);

export { CourseModel, Course, LessonVideo, Comment };