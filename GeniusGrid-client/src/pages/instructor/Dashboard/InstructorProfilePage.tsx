import DashboardHeader from "../../../components/Instructor/layout/DashBoardHeader";
import DashboardSidebar from "../../../components/Instructor/layout/DashboardSidebar";

import ProfiePage from "../../../components/Instructor/Dashboard/ProfiePage";

function InstructorProfilePage() {



  return (
    <div className="flex min-h-screen h-screen">
      <DashboardSidebar />
      <div className="flex-1 overflow-auto bg-gray-50">
        <DashboardHeader />
        <ProfiePage />
      </div>
    </div>
  );
}

export default InstructorProfilePage;
