import DashboardHeader from "../../../components/Instructor/layout/DashBoardHeader";
import DashboardSidebar from "../../../components/Instructor/layout/DashboardSidebar";
import  { DashboardGraph } from "../../../components/Instructor/Dashboard/DashboardGraph";


function InstructorDashboard() {



  return (
    <div className="flex min-h-screen h-screen">
      <DashboardSidebar />
      <div className="flex-1 overflow-auto bg-gray-50">
        <DashboardHeader />
        <DashboardGraph />
      </div>
    </div>
  );
}

export default InstructorDashboard;
