import DashboardHeader from "../../../components/Instructor/layout/DashBoardHeader";
import DashboardSidebar from "../../../components/Instructor/layout/DashboardSidebar";

import ListCourses from "../../../components/Instructor/CourseSection/ListCourses";


function InstructorUserPage() {


  return (
    <div className="flex min-h-screen h-screen">
      <DashboardSidebar />
      <div className="flex-1 bg-gray-50 ">
        <DashboardHeader/>
        <ListCourses />
      </div>
    </div>
  );
}

export default InstructorUserPage;
