import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { adminAxios } from "../../../constraints/axiosInterceptors/adminAxiosInterceptors";
import adminEndpoints from "../../../constraints/endpoints/adminEndpoints";
import { ToastContainer, toast } from "react-toastify";

interface Instructor {
  id: string;
  name: string;
  email: string;
  isVerified: boolean;
}

const DashboardInstructors: React.FC = () => {
  const [instructorsList, setInstructorsList] = useState<Instructor[]>([]);
  const [searchText, setSearchText] = useState("");
  const [filteredList, setFilteredList] = useState<Instructor[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const instructorsPerPage = 10;

  useEffect(() => {
    async function fetchInstructors() {
      try {
        const response = await adminAxios.get<{ instructors: Instructor[] }>(
          adminEndpoints.getAllInstructors
        );
        setInstructorsList(response.data.instructors);
        setFilteredList(response.data.instructors);
      } catch (error) {
        console.error("Error fetching instructors:", error);
      }
    }

    fetchInstructors();
  }, []);

  const handleBlockUnblock = async (id: string, isVerified: boolean) => {
    try {
      const instructorBlockUnblock = {
        id: id,
        isVerified: isVerified,
      };

      const response = await adminAxios.post(
        adminEndpoints.instructorBlockUnblock,
        instructorBlockUnblock
      );

      if(response){
        toast.success("Sucsses")
      }

      const updatedResponse = await adminAxios.get<{
        instructors: Instructor[];
      }>(adminEndpoints.getAllInstructors);
      setInstructorsList(updatedResponse.data.instructors);
      setFilteredList(updatedResponse.data.instructors);
    } catch (error) {
      console.error("Error blocking/unblocking instructor:", error);
    }
  };

  const handleSearch = () => {
    const filteredList = instructorsList.filter((instructor) =>
      instructor.email.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredList(filteredList);
    setCurrentPage(0);
  };

  const handleCancelSearch = () => {
    setSearchText("");
    setFilteredList(instructorsList);
    setCurrentPage(0);
  };

  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  const displayInstructors = filteredList.slice(
    currentPage * instructorsPerPage,
    (currentPage + 1) * instructorsPerPage
  );

  return (
    <>
     <div className="overflow-x-auto">
      <ToastContainer/>
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="search m-2 p-4 flex justify-center">
        <input
          type="text"
          className="border border-gray-200 rounded-lg w-2/5"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            placeholder=" Search by email"
          />
          <button
            className="px-3 py-1 bg-blue-600 m-1 rounded-lg text-white hover:bg-blue-700"
            onClick={handleSearch}
          >
            Search
          </button>
          {searchText && (
            <button
              className="px-3 py-1 bg-gray-400 m-1 rounded-lg text-white hover:bg-gray-500"
              onClick={handleCancelSearch}
            >
              Cancel
            </button>
          )}
        </div>
        <div className="shadow-lg overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 font-roboto">
            <thead className="bg-gray-200 text-left text-xs uppercase tracking-wider">
              <tr className="border-b">
                <th className="text-left p-3 px-5">Name</th>
                <th className="text-left p-3 px-5">Email</th>
                <th className="text-left p-3 px-5">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayInstructors.map((instructor) => (
                
                <tr
                  key={instructor.id}
                  className="border-b hover:bg-orange-100 bg-white"
                >
                    <td className="px-3 py-3 sm:px-6 sm:py-4 whitespace-nowrap">
                    {instructor.name}
                  </td>
                  <td className="px-3 py-3 sm:px-6 sm:py-4 whitespace-nowrap">
                    {instructor.email}
                  </td>
                 
                  <td className="px-3 py-3 sm:px-1 sm:py-4 whitespace-nowrap  text-sm font-medium">
                      {instructor.isVerified ? (
                         <button
                         type="button"
                         onClick={() => handleBlockUnblock(instructor.id, false)}                         
                         className="mr-2 text-sm  bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                       >
                          Block
                        </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleBlockUnblock(instructor.id, true)}
                        className="mr-3 text-sm bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                      >
                        Unblock
                      </button>
                    )}
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
            pageCount={Math.ceil(filteredList.length / instructorsPerPage)}
            onPageChange={handlePageClick}
            containerClassName={"pagination flex justify-center space-x-2"}
            activeClassName={"bg-gray-400 shadow-lg text-white"}
            pageClassName={
              "page-item bg-gray-200 px-3 py-1 rounded cursor-pointer"
            }
            pageLinkClassName={"page-link"}
            previousClassName={
              "page-item bg-[#007efb] px-3 py-1 rounded-lg cursor-pointer text-white"
            }
            previousLinkClassName={"page-link"}
            nextClassName={
              "page-item bg-[#007efb] px-3 py-1 rounded-lg cursor-pointer text-white"
            }
            nextLinkClassName={"page-link"}
            breakClassName={
              "page-item bg-gray-200 px-3 py-1 rounded cursor-pointer"
            }
            breakLinkClassName={"page-link"}
          />
        </div>
        </div>
      </div>
    </>
  );
};

export default DashboardInstructors;
