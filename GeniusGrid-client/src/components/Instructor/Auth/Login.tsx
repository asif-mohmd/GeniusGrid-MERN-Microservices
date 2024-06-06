import React, { ChangeEvent, FormEvent, useState } from "react";
import { FormDataLogin } from "../../../interfaces/AuthInterfaces/IAuthInterface";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { instructoraxios } from "../../../constraints/axiosInterceptors/instructorAxiosInterceptors";
import instructorEndpoints from "../../../constraints/endpoints/instructorEndpoints";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setInstructorData } from "../../../redux/instructorSlices/instructorDataSlice";
import { instructorLogin } from "../../../redux/instructorSlices/authSlice";

const Login: React.FC = () => {
  const [instructorLoginData, setInstructorLoginData] = useState<FormDataLogin>(
    {
      email: "",
      password: "",
    }
  );



  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setInstructorLoginData({ ...instructorLoginData, [id]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const instructorData = await instructoraxios.post(
      instructorEndpoints.login,
      { instructorLoginData }
    );

    if (instructorData.data.status == 201) {
      
      dispatch(setInstructorData(instructorData.data));
      dispatch(instructorLogin());
      navigate(instructorEndpoints.dashboard);
    } else if(instructorData.data.status == 401) {
      toast.error("Instructor not found");
    } else if(instructorData.data.status == 402) {
      toast.error("Invalid password");
    } else if(instructorData.data.status == 403) {
      toast.error("Your account is blocked");
    } else if(instructorData.data.status == 404) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex flex-col min-h-screen justify-center items-center bg-gray-100">
          <ToastContainer />
      <div className="bg-white p-14 rounded-xl shadow-lg">
        <h6 className="text-xl font-medium text-center m-7">
          Instructor Login
        </h6>
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
              value={instructorLoginData.email}
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
              value={instructorLoginData.password}
              onChange={handleChange}
              type="password"
              placeholder=""
            />
          </div>

          <div className="flex flex-col items-center justify-center mb-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mb-2">
              Login now
            </button>
            <div className="m-3">
              <span className="text-gray-600 text-sm">
                Don't have an account?{" "}
                <Link
                  className="text-blue-600 font-semibold"
                  to={instructorEndpoints.register}
                >
                  Sign Up
                </Link>
              </span>
            </div>
            <div className="m-3">
              <span className="text-gray-600 text-sm">
                Forgot your password?{" "}
                <Link
                  className="text-blue-600 font-semibold"
                  to={instructorEndpoints.forgotPassword}
                >
                  Reset it here
                </Link>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
