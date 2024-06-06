import DashboardHeader from "../../../components/Instructor/layout/DashBoardHeader";
import DashboardSidebar from "../../../components/Instructor/layout/DashboardSidebar";

import EditLessonComponent from "../../../components/Instructor/CourseSection/EditLessonComponent";

function EditLessonManagement() {

  return (
    <div className="flex min-h-screen h-screen">
      <DashboardSidebar />
      <div className="flex-1 overflow-auto bg-gray-50">
        <DashboardHeader />
        <EditLessonComponent />
      </div>
    </div>
  );
}

export default EditLessonManagement;
