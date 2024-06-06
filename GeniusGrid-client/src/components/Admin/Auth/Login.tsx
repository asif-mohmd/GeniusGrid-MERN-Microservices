import React, { ChangeEvent, FormEvent, useState } from "react";
import { FormDataLogin } from "../../../interfaces/AuthInterfaces/IAuthInterface";
import adminEndpoints from "../../../constraints/endpoints/adminEndpoints";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { adminAxios } from "../../../constraints/axiosInterceptors/adminAxiosInterceptors";


const AdminLogin: React.FC = () => {

  const [adminLoginData, setAdminLoginData] = useState<FormDataLogin>({
    email: "",
    password: ""
  })


  const navigate = useNavigate()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setAdminLoginData({ ...adminLoginData, [id]: value });
  };


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const adminData = await adminAxios.post(adminEndpoints.login, { adminLoginData })
    if (adminData.data.loginStatus) {
      navigate(adminEndpoints.dashboard)

    } else {
      toast.error('Invalid email or password');
    }
  }


  return (
    <div className="flex flex-col min-h-screen justify-center items-center bg-gray-100">
      <ToastContainer />
      <div className="bg-white p-14 rounded-xl shadow-lg">
        <h6 className="text-xl font-medium text-center m-7">Admin Login</h6>
        <form className="w-full max-w-md" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              className="block text-gray-600 font-semibold mb-2"
              htmlFor="full-name"
            >
              Email
            </label>
            <input
              className="bg-white appearance-none border-2 border-gray-100 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-300"
              id="email"
              value={adminLoginData.email}
              onChange={handleChange}
              type="text"
              defaultValue=""
              placeholder=""

            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-600 font-semibold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="bg-white appearance-none border-2 border-gray-100 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-300"
              id="password"
              value={adminLoginData.password}
              onChange={handleChange}
              type="password"
              placeholder=""
            />
          </div>
          <div className="flex flex-col items-center justify-center mb-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mb-2 ">
              Login now
            </button>
            <div className="m-3">

            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
