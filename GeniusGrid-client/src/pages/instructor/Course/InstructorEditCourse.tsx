import DashboardSidebar from "../../../components/Instructor/layout/DashboardSidebar";

import EditCourse from "../../../components/Instructor/CourseSection/EditCourse";
import DashboardHeader from "../../../components/Admin/Dashboard/DashBoardHeader";

function InstructorEditCourse() {

 


  return (
    <div className="flex min-h-screen h-screen">
      <DashboardSidebar />
      <div className="flex-1 overflow-auto bg-gray-50">
        <DashboardHeader/>
        <EditCourse/>
      </div>
    </div>
  );
}

export default InstructorEditCourse;
