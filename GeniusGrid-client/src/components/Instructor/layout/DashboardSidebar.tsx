import controlPNG from "../../../assets/DashboardIcons/control.png";
import logoPNG from "../../../assets/DashboardIcons/logo.png";
import { Link } from "react-router-dom";
import { CiCirclePlus } from "react-icons/ci";
import { AiOutlineDashboard } from "react-icons/ai";
import { LuUsers } from "react-icons/lu";
import instructorEndpoints from "../../../constraints/endpoints/instructorEndpoints";
import { MdChecklist } from "react-icons/md";
import { IoVideocamOutline } from "react-icons/io5";
import useWindowResize from "../../../utils/CustomHook/SidebarWindowResize"

const DashboardSidebar = () => {
  const [open, setOpen] = useWindowResize(true); // Use the custom hook

  return (
    <div className={`${open ? "w-72" : "w-20"} bg-[#171f3c] h-full p-1 pt-8 relative duration-300 flex flex-col`}>
      <img
        src={controlPNG}
        className={`absolute cursor-pointer -right-3 top-11 w-7 border-dark-purple border-2 rounded-full ${!open && "rotate-180"}`}
        onClick={() => setOpen(!open)}
      />
      <div className="flex p-2 items-center">
        <img
          src={logoPNG}
          className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`}
        />
        {open && (
          <h1 className="text-white origin-left font-medium text-xl pl-2 duration-200">
            Instructor Control
          </h1>
        )}
      </div>
      <ul className="pt-10 flex-grow">
        <li>
          <Link
            to="/instructor"
            className="flex items-center px-4 py-4 text-white rounded-md hover:bg-gray-700 cursor-pointer"
          >
            <AiOutlineDashboard className="text-2xl" />
            {open && <span className="ml-4">Dashboard</span>}
          </Link>
        </li>
        <li>
          <Link
            to={instructorEndpoints.users}
            className="flex items-center px-4 py-4 text-white rounded-md hover:bg-gray-700 cursor-pointer"
          >
            <LuUsers className="text-2xl" />
            {open && <span className="ml-4">Users</span>}
          </Link>
        </li>
        <li>
          <Link
            to={instructorEndpoints.createCourse}
            className="flex items-center px-4 py-4 text-white rounded-md hover:bg-gray-700 cursor-pointer"
          >
            <CiCirclePlus className="text-2xl" />
            {open && <span className="ml-4">Create course</span>}
          </Link>
        </li>
        <li>
          <Link
            to={instructorEndpoints.myCourses}
            className="flex items-center px-4 py-4 text-white rounded-md hover:bg-gray-700 cursor-pointer"
          >
            <MdChecklist className="text-2xl" />
            {open && <span className="ml-4">My Courses</span>}
          </Link>
        </li>
        <li>
          <Link
            to={instructorEndpoints.transcodeVideo}
            className="flex items-center px-4 py-4 text-white rounded-md hover:bg-gray-700 cursor-pointer"
          >
            <IoVideocamOutline className="text-2xl" />
            {open && <span className="ml-4">Transcode Video</span>}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default DashboardSidebar;
