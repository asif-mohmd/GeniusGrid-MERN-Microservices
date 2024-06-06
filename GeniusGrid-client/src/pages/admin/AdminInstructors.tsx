import DashboardHeader from "../../components/Admin/Dashboard/DashBoardHeader";
import DashboardInstructors from "../../components/Admin/Dashboard/DashboardInstructors";
import DashboardSidebar from "../../components/Admin/Dashboard/DashboardSidebar";

function AdminDashboardInstructors() {
  return (
    <div className="flex min-h-screen h-screen">
      <DashboardSidebar />
      <div className="flex-1 overflow-auto bg-gray-50">
        <DashboardHeader />
        <DashboardInstructors />
      </div>
    </div>
  );
}

export default AdminDashboardInstructors;
