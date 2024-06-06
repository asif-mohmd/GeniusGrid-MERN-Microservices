import React from "react";
import BannerGirl from "../../../assets/logoBanner.jpg";

const HomePage: React.FC = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between px-6 md:px-12 lg:px-24 xl:px-32 mt-10">
        <img
          src={BannerGirl}
          alt="Banner"
          className="md:w-1/2 w-full h-auto md:order-last" // Move image to last on medium screens and up
        />
        <div className="md:w-1/2 p-6 md:p-12 md:order-first"> {/* Order first on medium screens and up */}
          <h1 className="my-3 text-2xl md:text-3xl lg:text-5xl font-bold font-poppins">Learning comes to you</h1>
          <p className="text-sm md:text-lg lg:text-md font-poppins md:mt-7 ">
          Unlock your potential with knowledge. Start learning today and pave your path to success with us.
          </p>
          {/* <p className="text-sm md:text-lg lg:text-sm font-poppins">Courses as low as $10</p> */}
        </div>
      </div>
    </>
  );
};

export default HomePage;





