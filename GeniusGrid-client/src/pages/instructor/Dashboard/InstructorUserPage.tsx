import DashboardSidebar from "../../../components/Instructor/layout/DashboardSidebar";
import DashboardUsers from "../../../components/Instructor/Dashboard/DashboardUsers";
import DashboardHeader from "../../../components/Admin/Dashboard/DashBoardHeader";

function InstructorUserPage() {
  return (
    <div className="flex min-h-screen h-screen">
      <DashboardSidebar />
      <div className="flex-1 overflow-auto bg-gray-50">
        <DashboardHeader/>
          <DashboardUsers />
        </div>
      </div>
   
  );
}

export default InstructorUserPage;
