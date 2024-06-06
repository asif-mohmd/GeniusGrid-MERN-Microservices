import DashboardHeader from "../../../components/Instructor/layout/DashBoardHeader";
import DashboardSidebar from "../../../components/Instructor/layout/DashboardSidebar";

import DashboardTranscodeVideo from "../../../components/Instructor/Dashboard/DashboardTranscodeVideo";

function InstructorTranscodeVideo() {



  return (
    <div className="flex min-h-screen h-screen">
      <DashboardSidebar />
      <div className="flex-1 overflow-auto bg-gray-50">
        <DashboardHeader />
        <DashboardTranscodeVideo />
      </div>
    </div>
  );
}

export default InstructorTranscodeVideo;
