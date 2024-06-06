import { CourseData } from "../../../interfaces/UserInterfaces/ICourseDetails"; // Assuming "ICourseDetails" is correct
import { LuMonitorPlay } from "react-icons/lu";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function PurchasedCoursePage({ courseData, onVideoTitleClick, onSelectedVideo, openLessonIndex, setOpenLessonIndex }: { courseData: CourseData, onVideoTitleClick: (title: string,description:string,links:string[],_id:string,questions:any) => void, onSelectedVideo: string | null, openLessonIndex: number | null, setOpenLessonIndex: (index: number | null) => void }) {
    const { lessons } = courseData;

    const toggleLesson = (lessonIndex: number, forceOpen: boolean = false) => {
        // Check if the clicked lesson is already open and forceOpen is false, if yes, close it.
        if (openLessonIndex === lessonIndex && !forceOpen) {
            setOpenLessonIndex(null);
        } else {
            // Lesson is not open or forceOpen is true, set openLessonIndex to the index of the clicked lesson to open it
            setOpenLessonIndex(lessonIndex);
        }
    };

    return (
        <div className="md:mt-2 mb-3">
            <p className="uppercase font-roboto font-semibold text-xl tracking-wide mt-3 mb-4 ml-2">{courseData.courseName}</p>
            <div className="p-3 bg-gray-100 rounded-lg md:w-5/6">
                {lessons.map((lesson, lessonIndex) => (
                    <div key={lessonIndex} className="mb-4 border-b pb-3 border-gray-200">
                        <button
                            className="flex items-center justify-between w-full focus:outline-none"
                            onClick={() => toggleLesson(lessonIndex)}
                        >
                            <span className="text-md font-Poppins font-[500] text-black ">Chapter {lessonIndex + 1}</span>
                            <svg
                                className={`w-6 h-6 transition-transform transform ${openLessonIndex === lessonIndex ? 'rotate-180' : ''}`}
                                viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        {openLessonIndex === lessonIndex && (
                            <div className="mt-2">
                                {lesson.map((video, videoIndex) => (
                                    <div key={videoIndex} className={`flex items-center mb-2 p-1 cursor-pointer ${video.videoURL.toLowerCase() === onSelectedVideo?.toLowerCase() ? "bg-gray-800 rounded-md text-white" : ""}`} onClick={() => onVideoTitleClick(video.videoURL,video.videoDescription,video.links,video._id,video.questions)}>
                                        <LuMonitorPlay size={18} className="text mr-4 text-[#1cdada]" />
                                        
                                        <span className="flex-1">{video.videoTitle}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PurchasedCoursePage;

