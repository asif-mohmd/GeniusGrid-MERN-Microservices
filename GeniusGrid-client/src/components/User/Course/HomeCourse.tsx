import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import courseEndspoints from '../../../constraints/endpoints/courseEndspoints';
import { userAxios } from '../../../constraints/axiosInterceptors/userAxiosInterceptors';
import { AllCourse } from '../../../interfaces/UserInterfaces/ICourseDetails';
import sectionImg from "../../../assets/Section.jpg"



function HomeCourse() {
  const [courses, setCourses] = useState<AllCourse[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function listCourses() {
      try {
        console.log("ooooooooHome courseoooooooooo")
        const listCoursesResponse = await userAxios.get(courseEndspoints.allUserCourses);
        console.log(listCoursesResponse,"0000000999999999999999999999999999999999999999999999999999")
        const coursesData = listCoursesResponse.data.response;
        setCourses(coursesData);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    }
    listCourses();
  }, []);

  const scrollLeft = () => {
    if (containerRef.current) {
      if (window.innerWidth < 768) {
        containerRef.current.scrollLeft -= 230;
      } else {
        containerRef.current.scrollLeft -= 300;
      }
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      if (window.innerWidth < 768) {
        containerRef.current.scrollLeft += 230;
      } else {
        containerRef.current.scrollLeft += 300;
      }
    }
  };

  return (
    <div className="container mx-auto px-2 py-9 md:px-60 relative" style={{ backgroundImage: `url(${sectionImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="flex items-center justify-between">
        <button onClick={scrollLeft} className="bg-gray-200 px-3 py-3 m-2 rounded-full hover:bg-gray-200 focus:outline-none">
          <FiChevronLeft />
        </button>
        <div className="overflow-x-auto flex-grow " ref={containerRef} style={{ scrollBehavior: 'smooth', overflowX: 'hidden', overflowY: "hidden" }}>
          <div className="flex space-x-3 md:space-x-6 md:p-3 ">
            {courses.map(course => (
              <Link to={`/course-details/${course._id}`} key={course._id} className="block">
                <div
                  className={`bg-white rounded-md overflow-hidden md:h-64 h-72   ${window.innerWidth < 768 ? "object-cover  w-60" : "md:w-64"
                    } md:transition md:duration-300 md:ease-in-out md:transform md:hover:scale-105`}
                >                  <img
                    className="w-full max-w-xs md:max-w-xs lg:max-w-xs object-cover h-3/6"
                    src={course.thumbnail}
                    alt=""
                  />
                  <div className="p-4">
                    <h5 className="mb-2 text-md font-semibold text-gray-800 font-roboto truncate">
                      {course.courseName}
                    </h5>
                    <div className='flex justify-between font-roboto text-sm'>
                      <p className="mb-2 text-gray-700 ">
                        {course.courseLevel}
                      </p>
                      <p className="mb-2 text-gray-700">
                        ₹ {course.coursePrice}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 text-yellow-500 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 11l7-7 7 7M5 19l7-7 7 7"
                        ></path>
                      </svg>
                      <span className="text-gray-700">4.5</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <button onClick={scrollRight} className="bg-gray-200 px-3 py-3 m-2 rounded-full hover:bg-gray-200 focus:outline-none">
          <FiChevronRight />
        </button>
      </div>
    </div>
  );
}

export default HomeCourse;
