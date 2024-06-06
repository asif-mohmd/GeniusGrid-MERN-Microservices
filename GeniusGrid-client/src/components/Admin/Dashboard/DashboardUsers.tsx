import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { adminAxios } from "../../../constraints/axiosInterceptors/adminAxiosInterceptors";
import adminEndpoints from "../../../constraints/endpoints/adminEndpoints";

interface User {
  id: string;
  name: string;
  email: string;
  isVerified: boolean;
}

const DashboardUsers: React.FC = () => {
  const [usersList, setUsersList] = useState<User[]>([]);
  const [searchText, setSearchText] = useState("");
  const [filteredList, setFilteredList] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const usersPerPage = 8;

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await adminAxios.get<{ users: User[] }>(
          adminEndpoints.getAllUsers
        );
        setUsersList(response.data.users);
        setFilteredList(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }

    fetchUsers();
  }, []);

  const handleBlockUnblock = async (id: string, isVerified: boolean) => {
    try {
      const userBlockUnblock = {
        id: id,
        isVerified: isVerified,
      };

      const response = await adminAxios.post(
        adminEndpoints.userBlockUnblock,
        userBlockUnblock
      );
      console.log(response, "response block");

      const updatedResponse = await adminAxios.get<{ users: User[] }>(
        adminEndpoints.getAllUsers
      );
      setUsersList(updatedResponse.data.users);
      setFilteredList(updatedResponse.data.users);
    } catch (error) {
      console.error("Error blocking/unblocking user:", error);
    }
  };

  const handleSearch = () => {
    const filteredList = usersList.filter((user) =>
      user.email.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredList(filteredList);
    setCurrentPage(0);
  };

  const handleCancelSearch = () => {
    setSearchText("");
    setFilteredList(usersList);
    setCurrentPage(0);
  };

  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  const displayUsers = filteredList.slice(
    currentPage * usersPerPage,
    (currentPage + 1) * usersPerPage
  );

  return (
    <>
      <div className="overflow-x-auto">
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
                {displayUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b hover:bg-orange-100 bg-white font-poppins font-medium text-sm"
                  >
                   
                    <td className="px-3 py-3 sm:px-6 sm:py-4 whitespace-nowrap">
                    {user.name}
                  </td>
                  <td className="px-3 py-3 sm:px-6 sm:py-4 whitespace-nowrap">
                    {user.email}
                  </td>
                  <td className="px-3 py-3 sm:px-1 sm:py-4 whitespace-nowrap  text-sm font-medium">
                      {user.isVerified ? (
                         <button
                         type="button"
                         onClick={() => handleBlockUnblock(user.id, false)}                         
                         className="mr-2 text-sm  bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                       >
                          Block
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleBlockUnblock(user.id, true)}
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
              pageCount={Math.ceil(filteredList.length / usersPerPage)}
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

export default DashboardUsers;
