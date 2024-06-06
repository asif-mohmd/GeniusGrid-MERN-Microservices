import DashboardHeader from "../../../components/Instructor/layout/DashBoardHeader";
import DashboardSidebar from "../../../components/Instructor/layout/DashboardSidebar";

import AddLessonManagement from "../../../components/Instructor/CourseSection/AddLessonComponent";

function LessonContentManage() {



  return (
    <div className="flex min-h-screen h-screen">
      <DashboardSidebar />
      <div className="flex-1 overflow-auto bg-gray-50">
        <DashboardHeader />
        <AddLessonManagement />
      </div>
    </div>
  );
}

export default LessonContentManage;
