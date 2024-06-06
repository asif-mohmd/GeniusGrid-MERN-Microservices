import { Route, Routes } from 'react-router'

import AdminLoginPage from '../../pages/admin/AdminLoginPage'
import AdminDashboardUsers from '../../pages/admin/AdminDashboardUsers'
import AdminDashboard from '../../pages/admin/AdminDashboard'
import AdminDashboardInstructors from '../../pages/admin/AdminInstructors'
import AdminAddCategory from '../../pages/admin/AdminAddCategory'
import AdminViewCategory from '../../pages/admin/AdminViewCategory'

const AdminRouters = () => {
  return (
   <Routes>
      <Route Component={AdminLoginPage} path="/login" />
      <Route Component={AdminDashboard} path="/"></Route>
      <Route Component={AdminDashboardUsers} path="users"></Route>
      <Route Component={AdminDashboardInstructors} path="/instructors"></Route>
      <Route Component={AdminAddCategory} path='/add/category'></Route>
      <Route Component={AdminViewCategory} path='/view/category'></Route>



   </Routes>
  )
}

export default AdminRouters