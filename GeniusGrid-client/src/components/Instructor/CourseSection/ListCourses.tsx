import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import ReactPaginate from "react-paginate";
import courseEndspoints from "../../../constraints/endpoints/courseEndspoints";
import { instructoraxios } from "../../../constraints/axiosInterceptors/instructorAxiosInterceptors";
import { setPrivateId } from "../../../redux/instructorSlices/couseSlice/editCourseData";
import instructorEndpoints from "../../../constraints/endpoints/instructorEndpoints";

interface Course {
  id: number;
  courseName: string;
  coursePrice: number;
  courseLevel: string;
  totalVideos: number;
}

const ListCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchText, setSearchText] = useState("");
  const [filteredList, setFilteredList] = useState<Course[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const coursesPerPage = 6;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function listCourses() {
      try {
        const listCoursesResponse = await instructoraxios.get(courseEndspoints.listCourse);
        const coursesData = listCoursesResponse.data.courseData.courses;
        setCourses(coursesData);
        setFilteredList(coursesData);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    }
    listCourses();
  }, []);

  const handleEdit = (id: number) => {
    dispatch(setPrivateId(id));
    navigate(instructorEndpoints.editCourse);
  };

  const handleDelete = async (courseId: number) => {
    try {
      confirmAlert({
        title: "Confirm Submission",
        message: "Are you sure you want to delete the course?",
        buttons: [
          {
            label: "Yes",
            onClick: async () => {
              const response = await instructoraxios.post(courseEndspoints.deleteCourse, { courseId });
              if (response && response.status === 200) {
                setCourses(courses.filter(course => course.id !== courseId));
                setFilteredList(courses.filter(course => course.id !== courseId));
                toast.success("Course deleted successfully");
                navigate(instructorEndpoints.myCourses);
              } else {
                toast.error("Something went wrong. Try again");
              }
            }
          },
          {
            label: "No",
            onClick: () => { }
          }
        ]
      });
    } catch (error) {
      console.error("Error deleting course:", error);
      toast.error("Something went wrong. Try again");
    }
  };

  const handleSearch = () => {
    const filtered = courses.filter(course =>
      course.courseName.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredList(filtered);
    setCurrentPage(0); // Reset to the first page after search
  };

  const handleCancelSearch = () => {
    setSearchText("");
    setFilteredList(courses); // Reset to the full list
    setCurrentPage(0); // Reset to the first page after cancel
  };

  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  const displayCourses = filteredList.slice(
    currentPage * coursesPerPage,
    (currentPage + 1) * coursesPerPage
  );

  return (
    <div className="">
      <ToastContainer />
      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div className="search m-2 p-4 flex justify-center">
          <input
            type="text"
            className="border border-gray-200 rounded-lg w-2/5"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className="px-3 py-1 bg-[#007efb] m-1 rounded-lg text-white"
            onClick={handleSearch}
          >
            Search
          </button>
          {searchText && (
            <button
              className="px-3 py-0.5 bg-gray-300 m-1 rounded-lg"
              onClick={handleCancelSearch}
            >
              Cancel
            </button>
          )}
        </div>
        <div className="shadow-lg overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 font-roboto">
            <thead className="bg-gray-200 px-3 py-2 sm:px-6 sm:py-3 text-left text-xs sm:text-sm uppercase tracking-wider ">
              <tr>
                <th
                  scope="col"
                  className="px-3 py-2 sm:px-6 sm:py-3"
                >
                  Course Name
                </th>
                <th
                  scope="col"
                  className=""
                >
                  Price
                </th>
                <th
                  scope="col"
                  className=""
                >
                  Level
                </th>
                <th
                  scope="col"
                  className=""
                >
                  Total Videos
                </th>
                <th
                  scope="col"
                  className=""
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className=" divide-y divide-gray-200 text-sm">
              {displayCourses.map(course => (
                <tr key={course.id}>
                  <td className="px-3 py-3 sm:px-6 sm:py-4 whitespace-nowrap font-semibold text-blue-500">
                    <Link to={`/instructor/course/details/${course?.id}`} >
                    {course.courseName}

                    </Link>
                  </td>
                  <td className="px-3 py-3 sm:px-6 sm:py-4 whitespace-nowrap">
                    {course.coursePrice}
                  </td>
                  <td className="px-3 py-3 sm:px-6 sm:py-4 whitespace-nowrap">
                    {course.courseLevel}
                  </td>
                  <td className="px-3 py-3 sm:px-6 sm:py-4 whitespace-nowrap">
                    {course.totalVideos}
                  </td>
                  <td className="px-3 py-3 sm:px-1 sm:py-4 whitespace-nowrap  text-sm font-medium">
                    <button
                      type="button"
                      onClick={() => handleEdit(course.id)}
                      className="mr-2 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(course.id)}
                      className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-4">
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={Math.ceil(filteredList.length / coursesPerPage)}
            onPageChange={handlePageClick}
            containerClassName={"pagination flex justify-center space-x-2"}
            activeClassName={"bg-blue-600 text-white"}
            pageClassName={"page-item bg-gray-200 px-3 py-1 rounded cursor-pointer"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item bg-[#007efb] px-3 py-1 rounded-lg cursor-pointer text-white"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item bg-[#007efb] px-3 py-1 rounded-lg cursor-pointer text-white"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item bg-gray-200 px-3 py-1 rounded cursor-pointer"}
            breakLinkClassName={"page-link"}
          />
        </div>
      </div>
    </div>
  );
};

export default ListCourses;
