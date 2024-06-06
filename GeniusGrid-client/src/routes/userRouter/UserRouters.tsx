import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import userEndpoints from "../../constraints/endpoints/userEndpoints";
import courseEndspoints from "../../constraints/endpoints/courseEndspoints";
import Home from "../../pages/user/UserHomePage";
import UserProtectorRoute from "./UserProtectorRoute";
import PaymentSuccess from "../../components/User/Course/PurchaseContents/PaymentSuccess";
import ProfileLanding from "../../pages/user/UserProfile/ProfileLanding";
import UserAboutUS from "../../pages/user/UserAboutUS";
import ErrorPage from "../../utils/ErrorPage";
import Loader from "../../utils/shimmerUI/Loader";
 // Import the Loader component

const PurchasedCourse = lazy(() => import("../../pages/user/PurchasedCourse"));
const UserCourseListPage = lazy(() => import("../../pages/user/UserCourseListPage"));
const UserCourseDetails  = lazy(() => import("../../pages/user/UserCourseDetails"))

const UserRouters = () => {
    return (
        <Routes>
            <Route path={userEndpoints.home} Component={Home} />
            <Route path={userEndpoints.aboutUs} Component={UserAboutUS} />
            <Route path={userEndpoints.courseDetails} element={<Suspense fallback={<Loader />}><UserCourseDetails /></Suspense>} />
            <Route path={courseEndspoints.allUserCourses} element={<Suspense fallback={<Loader />}><UserCourseListPage /></Suspense>} />
            <Route path={userEndpoints.purchasedCoures} element={<Suspense fallback={<Loader />}><UserProtectorRoute component={PurchasedCourse} /></Suspense>} />
            <Route path={userEndpoints.checkoutSuccess} element={<UserProtectorRoute component={PaymentSuccess} />} />
            <Route path={userEndpoints.profilePage} element={<UserProtectorRoute component={ProfileLanding} />} />
            <Route path={userEndpoints.errorPage} Component={ErrorPage} />
        </Routes>
    );
}

export default UserRouters;
