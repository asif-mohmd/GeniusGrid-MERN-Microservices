import { Route, Routes } from "react-router";

import InstructorDashboard from "../../pages/instructor/Dashboard/InstructorDashboard";

import InstructorLoginPage from "../../pages/instructor/Auth/InstructorLoginPage";
import InstructorSignupPage from "../../pages/instructor/Auth/InstructorSignupPage";
import InstructorOTPPage from "../../components/Instructor/Auth/OTPPage";
import InstructorUserPage from "../../pages/instructor/Dashboard/InstructorUserPage";
import InstructorCreateCourse from "../../pages/instructor/Course/InstructorCreateCourse";
import InstructorProtectorRoute from "./InstructorProtectorRoute";
import InstructorPublicRoute from "./InstructorPublicRoute";
import InstructorListCourse from "../../pages/instructor/Course/InstructorListCourses";
import InstructorProfilePage from "../../pages/instructor/Dashboard/InstructorProfilePage";

import AddLessonManagement from "../../pages/instructor/Course/AddLessonManagement"
import InstructorTranscodeVideo from "../../pages/instructor/Dashboard/InstructorTranscodeVideo";
import InstructorEditCourse from "../../pages/instructor/Course/InstructorEditCourse";
import EditLessonManagement from "../../pages/instructor/Course/EditLessonManagement";
import InstructorCourseDetails from "../../pages/instructor/Course/InstructorCourseDetails";

export const InstructorRouter = () => {
  return (

    <Routes>
      <Route path="/login" element={<InstructorPublicRoute component={InstructorLoginPage} />}> </Route>
      <Route path="/register" element={<InstructorPublicRoute component={InstructorSignupPage} />}></Route>
      <Route path="/" element={<InstructorProtectorRoute component={InstructorDashboard} />} ></Route>
      <Route path="/otp" element={<InstructorPublicRoute component={InstructorOTPPage} />}></Route>
      <Route path="/users" element={<InstructorProtectorRoute component={InstructorUserPage} />} ></Route>
      <Route path="/create/course" element={<InstructorProtectorRoute component={InstructorCreateCourse} />}></Route>
      <Route path="/my/courses" element={<InstructorProtectorRoute component={InstructorListCourse} />}></Route>
      <Route path="/edit/course" element={<InstructorProtectorRoute component={InstructorEditCourse} />}></Route>
      <Route path="/add/lesson/page" element={<InstructorProtectorRoute component={AddLessonManagement} />}></Route>
      <Route path="/edit/lesson/page" element={<InstructorProtectorRoute component={EditLessonManagement} />}></Route>
      <Route path="/profile/page" element={<InstructorProtectorRoute component={InstructorProfilePage} />}></Route>
      <Route path="/transcode/video" element={<InstructorProtectorRoute component={InstructorTranscodeVideo}/>}></Route>
      <Route path="/course/details/:_id" element={<InstructorProtectorRoute component={InstructorCourseDetails} />}></Route>

    </Routes>
  );
};
