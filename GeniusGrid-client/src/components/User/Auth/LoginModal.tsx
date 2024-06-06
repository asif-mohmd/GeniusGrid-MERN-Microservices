import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { userAxios } from "../../../constraints/axiosInterceptors/userAxiosInterceptors";
import userEndpoints from "../../../constraints/endpoints/userEndpoints";
import { userLogin } from "../../../redux/userSlices/authSlice";
import { toast } from "react-toastify";
import { useAuth } from "../../../utils/AuthContext";
import { setUserId } from "../../../redux/userSlices/userDataSlice";

interface LoginModalProps {
  onClose: () => void;
  onShowSignup: () => void; // Add onShowSignup prop
}

function LoginModal({ onClose,  }: LoginModalProps) {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { handleShowSignup,handleShowForgotPassword } = useAuth();


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setLoginData({ ...loginData, [id]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const userData = await userAxios.post(userEndpoints.login, loginData);
      if (userData.data.status == 200) {
        dispatch(setUserId(userData.data.userId))
        dispatch(userLogin());
        onClose();
        toast.success("Login Successful");
      } else if(userData.data.status == 401){
        toast.error("User not found");
      }
      else if(userData.data.status == 402){
        toast.error("Invalid password");
      }
      else if(userData.data.status == 403){
        toast.error("User blocked");
      }else{
        toast.error("Something went wrong")
      }
    } catch (error) {
      console.error("Login Error:", error);
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
          <div className="bg-white rounded-lg shadow relative  w-full mx-4 sm:mx-6 md:mx-0 md:max-w-lg lg:max-w-xl">
            <div className="flex justify-end p-2">
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
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
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Sign in to our platform
              </h3>
              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={loginData.email}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="name@gmail.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
                >
                  Your password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={loginData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  required
                />
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">
                  Forgot your password?{" "}
                  <button
                  onClick={handleShowForgotPassword}
                    className="text-blue-600 font-semibold"
                  >
                    Reset it here
                  </button>
                </span>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Login to your account
              </button>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                Not registered?{" "}
                <button  className="text-blue-700 hover:underline dark:text-blue-500" onClick={handleShowSignup} >
                  Create account
                </button>
              </div>
            </form>
            {/* {showLogin && <LoginModal onClose={() => setShowLogin(false)} />} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
