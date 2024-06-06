import React, { ChangeEvent, FormEvent, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from "yup";
import userEndpoints from "../../../constraints/endpoints/userEndpoints";
import { userAxios } from "../../../constraints/axiosInterceptors/userAxiosInterceptors";
import { useAuth } from "../../../utils/AuthContext";
import { toast } from "react-toastify";

interface ForgotPasswordProps {
  onClose: () => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordProps> = ({ onClose }) => {
  const [forgotData, setForgotData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { handleShowForgotOTP } = useAuth();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForgotData({ ...forgotData, [id]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const validationSchema = Yup.object({
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        )
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], "Passwords must match")
        .required("Confirm password is required"),
    });

    try {
      await validationSchema.validate(forgotData, { abortEarly: false });

      const response = await userAxios.post(userEndpoints.forgotPassword, { forgotData });
      if (response.data) {
        handleShowForgotOTP();
      } else {
        toast.error("Something went wrong");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      error.inner.forEach((err: any) => toast.error(err.message));
    }
  };

  return (
    <div>
      <link
        rel="stylesheet"
        href="https://unpkg.com/@themesberg/flowbite@1.2.0/dist/flowbite.min.css"
      />
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="relative w-full max-w-md px-4 h-full md:h-auto flex items-center justify-center">
          <div className="bg-white rounded-lg shadow relative w-full mx-4 sm:mx-6 md:mx-0 md:max-w-lg lg:max-w-xl">
          <div className="flex justify-end p-2">
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              onClick={onClose}
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
            <form
              className="space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8"
              onSubmit={handleSubmit}
            >
              <h3 className="text-xl font-medium text-gray-900">
                Reset your password here
              </h3>
              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-900 block mb-2"
                >
                  Enter your email
                </label>
                <input
                  type="text"
                  id="email"
                  value={forgotData.email}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-900 block mb-2"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={forgotData.password}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-gray-900 block mb-2"
                >
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={forgotData.confirmPassword}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
              </div>
              <div className="mb-3">
                <p className="text-xs font-light">Uppercase Letters (A-Z)</p>
                <p className="text-xs font-light">Lowercase Letters (a-z)</p>
                <p className="text-xs font-light">Number (0-9)</p>
                <p className="text-xs font-light">Special Character (@$!%*?&)</p>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Reset password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
