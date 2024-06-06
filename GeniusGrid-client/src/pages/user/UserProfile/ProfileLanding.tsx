import Header from "../../../components/User/Layout/Header";
import ProfilePageUser from "../../../components/User/Profile/ProfilePageUser";
import ChangePassword from "../../../components/User/Profile/ChangePassword";
import EnrolledCourses from "../../../components/User/Profile/EnrolledCourses";
import { useEffect, useState } from "react";
import { FiUser, FiLock, FiBookOpen, FiLogOut } from "react-icons/fi";
import { useDispatch } from "react-redux";
import {  userLogout } from "../../../redux/userSlices/authSlice";
import userEndpoints from "../../../constraints/endpoints/userEndpoints";
import { useNavigate } from "react-router-dom";
import Footer from "../../../components/User/Layout/Footer";
import { userAxios } from "../../../constraints/axiosInterceptors/userAxiosInterceptors";
import { User } from "../../../interfaces/UserInterfaces/IUserDetails";
import courseEndspoints from "../../../constraints/endpoints/courseEndspoints";
import { IFullCourseCourseData } from "../../../interfaces/InstructorInterfaces/IEditCourse";
import { clearUserData } from "../../../redux/userSlices/userDataSlice";

function ProfileLanding() {
  const [activeComponent, setActiveComponent] =
    useState<string>("ProfilePageUser");
  const [userData, setUserData] = useState<User | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [purchasedCourses,setPurchasedCourses] = useState<IFullCourseCourseData | any>(null)

  useEffect(() => {
    async function fetchCourseData() {
      try {
      
        const userDetails = await userAxios.get(userEndpoints.userDetails);
        const courses = userDetails.data.courses
        const purchasedCourses = await userAxios.post(courseEndspoints.userPurchasedCourses,courses)

        setPurchasedCourses(purchasedCourses.data)
        setUserData(userDetails.data);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    }
    fetchCourseData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleComponentClick = (componentName: string) => {
    setActiveComponent((prevComponent) =>
      prevComponent === componentName ? "" : componentName
    );
  };
  const handleClick = () => {

    dispatch(clearUserData());
    dispatch(userLogout());
    navigate(userEndpoints.home);
  };
  return (
    <>
      <Header />
      <div className="grid grid-cols-12 md:w-3/4 mx-auto bg-slate-50 ">
        <div className=" mt-5 col-span-3 border-r">
          <div className="container mx-auto px-4 sm:px-8 py-8">
            <div className="grid gap-6 ">
              <div
                onClick={() => handleComponentClick("ProfilePageUser")}
                className={`cursor-pointer flex items-center justify-center bg-white rounded-lg p-4 shadow-md transition duration-300 ease-in-out ${
                  activeComponent === "ProfilePageUser"
                    ? "text-blue-600 font-semibold"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                <FiUser className="mr-2" />
                {/* Show text only for larger screens */}
                <span className="hidden md:inline">My Account</span>
              </div>
              <div
                onClick={() => handleComponentClick("ChangePassword")}
                className={`cursor-pointer flex items-center justify-center bg-white rounded-lg p-4 shadow-md transition duration-300 ease-in-out ${
                  activeComponent === "ChangePassword"
                    ? "text-blue-600 font-semibold"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                <FiLock className="mr-2" />
                {/* Show text only for larger screens */}
                <span className="hidden md:inline">Change Password</span>
              </div>
              <div
                onClick={() => handleComponentClick("EnrolledCourses")}
                className={`cursor-pointer flex items-center justify-center bg-white rounded-lg p-4 shadow-md transition duration-300 ease-in-out ${
                  activeComponent === "EnrolledCourses"
                    ? "text-blue-600 font-semibold"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                <FiBookOpen className="mr-2" />
                {/* Show text only for larger screens */}
                <span className="hidden md:inline">Enrolled Courses</span>
              </div>
              <div
                onClick={() => handleClick()}
                className="cursor-pointer flex items-center justify-center bg-white rounded-lg p-4 shadow-md transition duration-300 ease-in-out text-gray-600 hover:text-red-600 font-semibold"
              >
                <FiLogOut className="mr-2" />
                {/* Show text only for larger screens */}
                <span className="hidden md:inline">Logout</span>
              </div>
            </div>
          </div>
        </div>
  
        <div className="col-span-9 p-3">
          <div className="mt-8">
            {activeComponent === "ProfilePageUser" && (
              <ProfilePageUser {...userData} />
            )}
            {activeComponent === "ChangePassword" && <ChangePassword />}
            {activeComponent === "EnrolledCourses" && (
              <EnrolledCourses {...purchasedCourses} />
            )}
            {/* Add your Logout component here */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
  
}

export default ProfileLanding;
