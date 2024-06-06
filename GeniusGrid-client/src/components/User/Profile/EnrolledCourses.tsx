/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { TbSquareRoundedArrowLeft, TbSquareRoundedArrowRight } from "react-icons/tb";
interface EnrolledCourse {
  _id: string;
  thumbnail: string;
  courseName: string;
  courseLevel:string;
  coursePrice: string;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EnrolledCourses: React.FC<any> = ({ response: courses }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (containerRef.current) {
      if (window.innerWidth < 768) {
        containerRef.current.scrollLeft -= 280;
      } else {
        containerRef.current.scrollLeft -= 300;
      }
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      if (window.innerWidth < 768) {
        containerRef.current.scrollLeft += 250;
      } else {
        containerRef.current.scrollLeft += 300;
      }
    }
  };

  return (
    <div className="">
      <div className="flex justify-center">
      <button
        onClick={scrollLeft}
        className="bg-00 px-3 py-2 rounded-full hover:bg-gray-200 focus:outline-none"
      >
        <TbSquareRoundedArrowLeft size={25} />{/* Icon for right scroll */}
      </button>
      <button
        onClick={scrollRight}
        className="bg-00 px-2 py-2 mr-1 rounded-full hover:bg-gray-200 focus:outline-none"
      >
        <TbSquareRoundedArrowRight size={25} />
      </button>
      </div>
       
      <div className="grid grid-col-1 md:grid-col-2 lg:grid-col-2">
        <div
          className="overflow-x-auto flex-grow"
          ref={containerRef}
          style={{
            scrollBehavior: "smooth",
            overflowX: "hidden",
            overflowY: "hidden",
          }}
        >
          <div className="flex space-x-6 m-2">
            {/* Map through courses */}
            {courses.map((course: EnrolledCourse) => (
              <Link
                to={`/course-details/${course._id}`}
                key={course._id}
                className="block"
              >
                <div
                  className={`bg-white rounded-sm overflow-hidden md:h-60 h-52   ${
                    window.innerWidth < 768 ? "object-cover h-full w-60" : "md:w-64"
                  } md:transition md:duration-300 md:ease-in-out md:transform md:hover:scale-105`}
                >
                  <img
                    className="w-full max-w-xs md:max-w-xs lg:max-w-xs object-cover h-3/6"
                    src={course.thumbnail}
                    alt=""
                  />
                  <div className="p-4  ">
                    <p className="  text-md font-bold text-gray-800 font-roboto truncate">
                      {course.courseName}
                    </p>
                   <div className="flex justify-between pt-2">
                   <p className="  text-md font-semibold text-gray-800 truncate">
                    {course.courseLevel}
                    </p>
                    <p className="  text-md font-semibold text-gray-800 truncate">
                    ₹ {course.coursePrice}
                    </p>
                   </div>
                   
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default EnrolledCourses;
