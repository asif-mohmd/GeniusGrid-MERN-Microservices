import DashboardSidebar from "../../../components/Instructor/layout/DashboardSidebar";

import CreateCourse from "../../../components/Instructor/CourseSection/CreateCourse";
import DashboardHeader from "../../../components/Admin/Dashboard/DashBoardHeader";

function InstructorCreateCourse() {

 
  return (
    <div className="flex min-h-screen h-screen">
      <DashboardSidebar />
      <div className="flex-1 overflow-auto bg-gray-50">
        <DashboardHeader/>
        <CreateCourse/>
      </div>
    </div>
  );
}

export default InstructorCreateCourse;
