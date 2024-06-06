import DashboardHeader from "../../components/Admin/Dashboard/DashBoardHeader";
import DashboardSidebar from "../../components/Admin/Dashboard/DashboardSidebar";
import  { DashboardGraph } from "../../components/Admin/Dashboard/DashboardGraph";

function AdminDashboard() {

  




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

export default AdminDashboard;
