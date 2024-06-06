import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faClock,
  faMoneyBillWave,
} from "@fortawesome/free-solid-svg-icons";
import { CourseData } from "../../../interfaces/UserInterfaces/ICourseDetails";
import { MdCheck } from "react-icons/md";
import { useState } from "react";
import { LuMonitorPlay } from "react-icons/lu";


function CourseDetailsPage(courseData: CourseData) {


  const { lessons } = courseData;
  const [openLessonIndex, setOpenLessonIndex] = useState<number | null>(null);

  const toggleLesson = (lessonIndex: number) => {
    if (openLessonIndex === lessonIndex) {
      setOpenLessonIndex(null);
    } else {
      setOpenLessonIndex(lessonIndex);
    }
  };


  return (
    <div className="container mx-auto py-1 bg-gray-50 ">
      <div className="max-w-2xl mx-auto bg-gray-50 rounded-lg overflow-hidden p-3">
        <div className="px-6 py-4">
          <div className="mb-4">
            <div className="text-[24px] font-Poppins font-[600] text-black ">
              {courseData?.courseName}
            </div>

          </div>

          <div className="mb-4">

            <div className="flex items-center text-lg text-yellow-400">
              <FontAwesomeIcon icon={faStar} className="mr-2" />
              <FontAwesomeIcon icon={faStar} className="mr-2" />
              <FontAwesomeIcon icon={faStar} className="mr-2" />
              <FontAwesomeIcon icon={faStar} className="mr-2" />
              <FontAwesomeIcon icon={faStar} className="mr-2" />
              <span>5.0</span>
            </div>
          </div>

          <div className="mb-4">
            <div className="text-xl font-Poppins font-[500] text-black mb-1">
              What are the prerequisites for this course?
            </div>

            <div className="text-md text-balck">
              {courseData?.prerequisites.map((prerequisite, index) => (
                <div key={index} className="flex items-center mb-2">
                  <MdCheck className="mr-2" /> {prerequisite}
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <div className="text-xl font-Poppins font-[500] text-black  mb-1">
              What you will learn from this course:
            </div>
            <div className="list-disc list-inside text-md text-black">
              {courseData?.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center mb-2">
                  <MdCheck className="mr-2" /> {benefit}
                </div>

              ))}
            </div>
          </div>



          <div className="mt-5 mb-3">
            <p className="text-lg font-Poppins font-[500] text-black  mb-1">Course Lectures</p>
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
                        <div key={videoIndex} className="flex items-center mb-2 p-1  ">
                          <LuMonitorPlay size={18} className="text mr-4 text-[#1cdada] " />
                          <span className="flex-1">{video.videoTitle}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>



          <div className="mb-4 ">
            <div className="text-xl font-Poppins font-[500] text-black mb-1">
              Description:
            </div>
            <p className=" text-md 800px:w-[80%] whitespace-pre-line text-black">
              {courseData?.courseDescription}
            </p>
          </div>
          <div className="mb-4">
            <div className="text-xl font-Poppins font-[500] text-black mb-1">
              Duration:
            </div>
            <div className="flex items-center text-lg text-gray-700">
              <FontAwesomeIcon icon={faClock} className="mr-2" />
              <span>10 weeks</span>
            </div>
          </div>
          <div className="mb-4">
            <div className="text-xl font-Poppins font-[500] text-black mb-1">
              Instructor:
            </div>
            <p className="text-md ">John Smith</p>
          </div>
          <div className="mb-4">
            <div className="text-xl font-Poppins font-[500] text-black mb-1">
              Price:
            </div>
            <div className="flex items-center text-lg text-gray-700">
              <FontAwesomeIcon icon={faMoneyBillWave} className="mr-2" />
              <span>{courseData?.coursePrice}</span>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}

export default CourseDetailsPage;
