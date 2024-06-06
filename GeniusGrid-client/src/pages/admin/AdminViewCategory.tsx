import DashboardViewCategory from '../../components/Admin/Dashboard/DashboardViewCategory'
import DashboardHeader from '../../components/Admin/Dashboard/DashBoardHeader'
import DashboardSidebar from '../../components/Admin/Dashboard/DashboardSidebar'

function AdminViewCategory() {
    return (

      <div className="flex min-h-screen h-screen">
        <DashboardSidebar />
        <div className="flex-1 overflow-auto bg-gray-50">
          <DashboardHeader />
        <DashboardViewCategory/>
        </div>
        </div>
      )
}

export default AdminViewCategory