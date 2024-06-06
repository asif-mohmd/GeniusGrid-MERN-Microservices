import InstructorImg from "../../../assets/instructorImgSir.png";
import bgInstructor from "../../../assets/Group 231.png";
import { Link } from "react-router-dom";
import instructorEndpoints from "../../../constraints/endpoints/instructorEndpoints";

function InstructorBanner() {
  return (
    <div className="py-8 px-4 md:px-12 lg:px-24 flex items-center justify-center my-2 bg-white">
      <div className="flex flex-col md:flex-row items-center justify-center mx-auto max-w-5xl">
        <div className="md:mr-8">
          <div className="rounded-lg overflow-hidden bg-cover bg-center" style={{backgroundImage: `url(${bgInstructor})`}}>
            {/* Adjust the width of the InstructorImg */}
            <img src={InstructorImg} alt="" className="w-full md:w-78 lg:w-96 xl:w- mx-auto md:mx-0 mb-4 md:mb-0" />
          </div>
        </div>
        <div className="text-gray-800 text-center md:text-left md:mx-10">
          <p className="text-xl md:text-2xl lg:text-3xl font-extrabold mb-4 md:mb-8 font-mono">Become an Instructor</p>
          <p className="text-base md:text-lg lg:text-md mb-6 font-semibold">Instructors from around the world teach millions of learners from genius grid. We provide the tools and skills to teach what you love</p>
          <Link
            to={instructorEndpoints.login} className="bg-[#00df9a] hover:bg-[#00c68b] text-white px-6 py-3 rounded transition-all duration-300 ease-in-out transform hover:scale-105">Join Now</Link>
        </div>
      </div>
    </div>
  );
}

export default InstructorBanner;
