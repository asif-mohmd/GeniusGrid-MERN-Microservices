import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import userEndpoints from "../../../constraints/endpoints/userEndpoints";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkUserAuthentication } from "../../../redux/userSlices/authSlice";
import courseEndpoints from "../../../constraints/endpoints/courseEndspoints";
import logo from "../../../assets/logoGeniusGrid.jpg";
import { RootState } from "../../../redux/Store";
import { useAuth } from "../../../utils/AuthContext";
import { User } from "../../../interfaces/UserInterfaces/IUserDetails";
import { userAxios } from "../../../constraints/axiosInterceptors/userAxiosInterceptors";

const Header = () => {
  const [nav, setNav] = useState(true);
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const userDetails = await userAxios.get(userEndpoints.userDetails);
        setUserData(userDetails.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    fetchUserData();
    setNav(!nav)
  }, []);

  const dispatch = useDispatch();
  const { handleShowLogin } = useAuth();
  dispatch(checkUserAuthentication());
  const userLogin = useSelector((store: RootState) => store.userAuth);

  const handleNav = () => {
    setNav(!nav);
  };



  return (
    <>
      <div className="items-center w-full mx-auto p-3 px-5 shadow-sm">
        <div className="grid grid-cols-3">
          <div className="col-span-1">
            <img src={logo} className="w-20" alt="GeniusGrid Logo" />
          </div>

          <div className="col-span-1 flex justify-center items-center font-mono">
            {/* Desktop Navigation */}

            <ul className="hidden md:flex">
              <NavLink
                to={userEndpoints.home}
                className={({ isActive }) =>
                  `p-3 hover:font-medium font-poppins m-1 cursor-pointer hover:text-black ${isActive ? 'text-blue-500 font-bold' : ''}`
                }
              >
                Home
              </NavLink>
              <NavLink
                to={courseEndpoints.allUserCourses}
                className={({ isActive }) =>
                  `p-3 hover:font-medium font-roboto m-1 cursor-pointer hover:text-black ${isActive ? 'text-blue-500 font-bold' : ''}`
                }
              >
                Courses
              </NavLink>
              <NavLink
                to={userEndpoints.aboutUs}
                className={({ isActive }) =>
                  `p-3 hover:font-medium font-roboto m-1 cursor-pointer hover:text-black ${isActive ? 'text-blue-500 font-bold' : ''}`
                }
              >
                About
              </NavLink>
            </ul>
          </div>
          <div className="col-span-1 justify-end pr-6 hidden md:flex">
            {userLogin.isLogin ? (
              <NavLink to={userEndpoints.profilePage} className="w-10">
                <img
                  className="cursor-pointer m-2 h-12 w-10 rounded-full ring-2 ring-white border border-gray-300 hidden md:flex"
                  src={userData?.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                  alt="User Avatar"
                />
              </NavLink>
            ) : (
              <img
                className="cursor-pointer m-2 h-10 w-10 rounded-full ring-2 ring-white"
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                alt="Guest"
                onClick={handleShowLogin}
              />
            )}
          </div>

          {/* Mobile Navigation Icon */}

          <div onClick={handleNav} className="block md:hidden ml-auto mt-5">
            {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <ul
          className={`fixed z-10 md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-300 bg-white ease-in-out duration-500 ${
            nav ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center p-4 border-b">
            <img src={logo} className="w-20" alt="GeniusGrid Logo" />
          </div>

          <li className="p-4 border-b">
            <NavLink
              to={userEndpoints.home}
              className={({ isActive }) =>
                `block hover:font-medium font-poppins m-1 cursor-pointer hover:text-black ${isActive ? 'text-blue-500 font-bold' : ''}`
              }
              onClick={handleNav}
            >
              Home
            </NavLink>
          </li>
          <li className="p-4 border-b">
            <NavLink
              to={courseEndpoints.allUserCourses}
              className={({ isActive }) =>
                `block hover:font-medium font-poppins m-1 cursor-pointer hover:text-black ${isActive ? 'text-blue-500 font-bold' : ''}`
              }
              onClick={handleNav}
            >
              Courses
            </NavLink>
          </li>
          <li className="p-4 border-b">
            <NavLink
             to={userEndpoints.aboutUs}
              className={({ isActive }) =>
                `block hover:font-medium font-poppins m-1 cursor-pointer hover:text-black ${isActive ? 'text-blue-500 font-bold' : ''}`
              }
              onClick={handleNav}
            >
              About
            </NavLink>
          </li>
          <li className="p-3">
            {userLogin.isLogin ? (
              <NavLink to={userEndpoints.profilePage} className="w-10">
                <img
                  className="cursor-pointer m-2 h-12 w-10 rounded-full ring-2 ring-white border border-gray-300 "
                  src={userData?.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                  alt="User Avatar"
                />
              </NavLink>
            ) : (
              <img
                className="cursor-pointer m-2 h-10 w-10 rounded-full ring-2 ring-white"
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                alt="Guest"
                onClick={handleShowLogin}
              />
            )}
          </li>

        </ul>
      </div>
    </>
  );
};

export default Header;
