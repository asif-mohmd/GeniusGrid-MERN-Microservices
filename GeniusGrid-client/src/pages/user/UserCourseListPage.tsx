import AuthModalManager from "../../components/User/Auth/AuthModalManager";
import CategoryListCarousel from "../../components/User/Course/CategoryListCarousel";
import CourseListPage from "../../components/User/Course/CourseListPage";
import Footer from "../../components/User/Layout/Footer";
import Header from "../../components/User/Layout/Header";
import { useEffect, useState } from "react";
import { AllCourse } from "../../interfaces/UserInterfaces/ICourseDetails";
import { userAxios } from "../../constraints/axiosInterceptors/userAxiosInterceptors";
import courseEndspoints from "../../constraints/endpoints/courseEndspoints";
import { adminAxios } from "../../constraints/axiosInterceptors/adminAxiosInterceptors";
import adminEndpoints from "../../constraints/endpoints/adminEndpoints";
import ShimmerCards from "../../utils/shimmerUI/ShimmerCards";

const UserCourseListPage = () => {
  const [courses, setCourses] = useState<AllCourse[]>([]);
  const [category, setCategory] = useState<string>("All");
  const [categories, setCategories] = useState<string[]>([]);
  
  console.log(categories, "0000000000000000000000");

  useEffect(() => {
    async function fetchAllCourses() {
      const response = await userAxios.get(courseEndspoints.allUserCourses);
      const allCourses = response.data.response;
      const categoriesResponse = await adminAxios.get(adminEndpoints.getCategories);
      setCategories(categoriesResponse.data.categoryName);
      setCourses(allCourses);
    }
    fetchAllCourses();
  }, []);

  if (courses.length === 0) {
    return <ShimmerCards />;
}




  return (
    <>
      <div>
        <Header />
        <CategoryListCarousel category={category} categories={categories} setCategory={setCategory} />
        {courses && <CourseListPage courses={courses.filter(course => category === "All" || course.courseCategory.toString() === category)} />}         <AuthModalManager />
        <Footer />
      </div>
    </>
  );
};

export default UserCourseListPage;
