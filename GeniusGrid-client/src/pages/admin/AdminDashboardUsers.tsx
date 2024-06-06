import DashboardHeader from "../../components/Admin/Dashboard/DashBoardHeader";
import DashboardSidebar from "../../components/Admin/Dashboard/DashboardSidebar";
import DashboardUsers from "../../components/Admin/Dashboard/DashboardUsers";

function AdminDashboardUsers() {
  return (
    <div className="flex min-h-screen h-screen">
      <DashboardSidebar />
      <div className="flex-1 overflow-auto bg-gray-50">
        <DashboardHeader />
        <DashboardUsers />
      </div>
    </div>
  );
}

export default AdminDashboardUsers;
