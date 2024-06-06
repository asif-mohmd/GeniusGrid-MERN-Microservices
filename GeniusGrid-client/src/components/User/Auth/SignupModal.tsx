import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { userAxios } from "../../../constraints/axiosInterceptors/userAxiosInterceptors";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setRegisterData } from "../../../redux/registerData/registerData";
import userEndpoints from "../../../constraints/endpoints/userEndpoints";
import { useAuth } from "../../../utils/AuthContext";
// import OTPModal from "./OTPModal";
 // Adjust the path as necessary

interface SignupModalProps {
  onClose: () => void;
}

const SignupModal = ({ onClose }: SignupModalProps) => {
  const dispatch = useDispatch();
  const { handleShowLogin , handleShowOTP} = useAuth();


  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="relative w-full max-w-md px-4 h-full md:h-auto flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg relative w-full mx-4 sm:mx-6 md:mx-0 md:max-w-lg lg:max-w-xl">
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

          <div className="p-8">
            <h6 className="text-xl font-medium mb-4 text-center">Create an account</h6>

            <Formik
              initialValues={{
                name: "",
                email: "",
                password: "",
                
              }}
              validationSchema={Yup.object({
                name: Yup.string().required("Name is required"),
                email: Yup.string().email("Invalid email address").required("Email is required"),
                password: Yup.string()
                  .min(8, "Password must be at least 8 characters")
                  .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
                  )
                  .required("Password is required"),
              })}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  const userData = await userAxios.post(userEndpoints.register, values);

                  if (userData.data.status) {
                    dispatch(setRegisterData(values));

                    handleShowOTP()
                    // onClose(); // Close the signup modal
                  } else {
                    toast.error("Email already exists");
                  }
                } catch (error) {
                  console.error("Error:", error);
                  toast.error("An error occurred");
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="mb-2">
                    <label
                      className="block  font-semibold mb-2"
                      htmlFor="name"
                    >
                      NAME
                    </label>
                    <Field
                      className="input-field bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      type="text"
                      name="name"
                      placeholder="John Doe"
                    />
                    <ErrorMessage
                      className="text-red-500 text-sm"
                      name="name"
                      component="div"
                    />
                  </div>
                  <div className="mb-2">
                    <label
                      className="block font-semibold mb-2"
                      htmlFor="email"
                    >
                      EMAIL
                    </label>
                    <Field
                      className="input-field bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      type="email"
                      name="email"
                      placeholder="name@gmail.com"
                    />
                    <ErrorMessage
                      className="text-red-500 text-sm"
                      name="email"
                      component="div"
                    />
                  </div>
                  <div className="mb-2">
                    <label
                      className="block  font-semibold mb-2"
                      htmlFor="password"
                    >
                      PASSWORD
                    </label>
                    <Field
                      className="input-field bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      type="password"
                      name="password"
                      placeholder="••••••••"
                    />
                    <ErrorMessage
                      className="text-red-500 text-sm"
                      name="password"
                      component="div"
                    />
                  </div>
                  <div className="mb-3">
                    <p className="text-xs font-light">Uppercase Letters (A-Z)</p>
                    <p  className="text-xs font-light">Lowercase Letters (a-z)</p>
                    <p  className="text-xs font-light">Number (0-9)</p>
                  </div>
                  <div className="flex flex-col items-center justify-center mb-4">
                    <button
                      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Creating account..." : "Create account"}
                    </button>
                    <div className="m-3">
                      <span className="text-gray-600 text-sm">
                        Already have an account?{" "}
                        <button
                          type="button"
                          onClick={handleShowLogin}
                          className="text-blue-700 hover:underline"
                        >
                          Login
                        </button>
                      </span>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>

      {/* Render the OTPModal */}
      {/* <OTPModal showOTP={isOTPModalVisible} onClose={handleCloseOTPModal} /> */}
    </div>
  );
};

export default SignupModal;
