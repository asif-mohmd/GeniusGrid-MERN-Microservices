import DashboardSidebar from "../../../components/Instructor/layout/DashboardSidebar";
import DashboardHeader from "../../../components/Admin/Dashboard/DashBoardHeader";
import DashboardCourseDetails from "../../../components/Instructor/Dashboard/DashboardCourseDetails";

function InstructorCourseDetails() {
  return (
    <div className="flex min-h-screen h-screen">
      <DashboardSidebar />
      <div className="flex-1 overflow-auto bg-gray-100">
        <DashboardHeader/>
        <DashboardCourseDetails/>
        </div>
      </div>
   
  );
}

export default InstructorCourseDetails;
