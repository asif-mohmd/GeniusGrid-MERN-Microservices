import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { instructoraxios } from "../../../constraints/axiosInterceptors/instructorAxiosInterceptors";
import instructorEndpoints from "../../../constraints/endpoints/instructorEndpoints";

// Define an interface for the user object
interface User {
  userName: string;
  userEmail: string;
  courseName: string;
  coursePrice: string;
  courseCategory: string;
}

const DashboardUsers: React.FC = () => {
  const [purchasedUsers, setPurchasedUsers] = useState<User[]>([]);
  const [searchText, setSearchText] = useState("");
  const [filteredList, setFilteredList] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const usersPerPage = 8;

  useEffect(() => {
    async function fetchPurchasedUsers() {
      try {
        const response = await instructoraxios.get(
          instructorEndpoints.getPurchasedUsers
        );
        const mappedUsers: User[] = response.data.response.map(
          (orderData: any) => ({
            userName: orderData.userName,
            userEmail: orderData.userEmail,
            courseName: orderData.courseName,
            courseCategory: orderData.courseCategory,
            coursePrice: orderData.coursePrice,
          })
        );
        setPurchasedUsers(mappedUsers);
        setFilteredList(mappedUsers); // Initialize filteredList with all users
      } catch (error) {
        console.error("Error fetching purchased users:", error);
      }
    }

    fetchPurchasedUsers();
  }, []);

  const handleSearch = () => {
    const filtered = purchasedUsers.filter((user) =>
      user.userEmail.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredList(filtered);
    setCurrentPage(0); // Reset to the first page after search
  };

  const handleCancelSearch = () => {
    setSearchText("");
    setFilteredList(purchasedUsers); // Reset to the full list
    setCurrentPage(0); // Reset to the first page after cancel
  };

  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  const displayUsers = filteredList.slice(
    currentPage * usersPerPage,
    (currentPage + 1) * usersPerPage
  );

  return (
    <div className="overflow-x-auto">
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
            <thead className="bg-gray-200 text-left text-xs uppercase tracking-wider">
              <tr className="border-b">
                <th className="p-3 px-5">Name</th>
                <th className="p-3 px-5">Email</th>
                <th className="p-3 px-5">Course</th>
                <th className="p-3 px-5">Category</th>
                <th className="p-3 px-5">Price</th>
              </tr>
            </thead>
            <tbody>
              {displayUsers.map((user, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-orange-100 bg-white font-poppins font-medium text-sm"
                >
                  <td className="p-3 px-5">{user.userName}</td>
                  <td className="p-3 px-5">{user.userEmail}</td>
                  <td className="p-3 px-5">{user.courseName}</td>
                  <td className="p-3 px-5">{user.courseCategory}</td>
                  <td className="p-3 px-5">{user.coursePrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      <div className="flex justify-center mt-4">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={Math.ceil(filteredList.length / usersPerPage)}
          onPageChange={handlePageClick}
          containerClassName={"pagination flex justify-center space-x-2"}
          activeClassName={"bg-gray-400 shadow-lg text-white"}
          pageClassName={"page-item bg-gray-200 px-3 py-1 rounded cursor-pointer"}
          pageLinkClassName={"page-link"}
          previousClassName={
            "page-item bg-[#007efb] px-3 py-1 rounded-lg cursor-pointer text-white"
          }
          previousLinkClassName={"page-link"}
          nextClassName={
            "page-item bg-[#007efb] px-3 py-1 rounded-lg cursor-pointer text-white"
          }
          nextLinkClassName={"page-link"}
          breakClassName={"page-item bg-gray-200 px-3 py-1 rounded cursor-pointer"}
          breakLinkClassName={"page-link"}
        />
      </div>
      </div>
    </div>
  );
};

export default DashboardUsers;
