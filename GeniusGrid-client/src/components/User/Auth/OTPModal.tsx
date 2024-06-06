import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { userAxios } from "../../../constraints/axiosInterceptors/userAxiosInterceptors";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/Store";
import userEndpoints from "../../../constraints/endpoints/userEndpoints";

interface OTPModalProps {
  onClose: () => void;
}

const OTPModal: React.FC<OTPModalProps> = ({ onClose }) => {
  const [timer, setTimer] = useState(60); // Initial timer value (in seconds)
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [showErrors, setShowErrors] = useState(false);
  const { formData } = useSelector((store: RootState) => store.registerData);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setIsTimerRunning(false);
    } 

    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);

  const handleResendOTP = async () => {
    try {
      const response = await userAxios.post(userEndpoints.register,  formData,);
      if (response.status === 200) {
        toast.success("OTP resent successfully");
        setTimer(60); // Reset timer
        setIsTimerRunning(true);
      } else {
        toast.error("OTP resend failed");
      }
    } catch (error) {
      toast.error("Failed to resend OTP. Please try again.");
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (values: { otp: string }, { setSubmitting, setErrors }: any) => {
    if (values.otp.length !== 4) {
      setErrors({ otp: "All OTP fields are required" });
      setShowErrors(true);
      setSubmitting(false);
      return;
    }

    try {
      const userData = await userAxios.post(userEndpoints.otp, { otp: values.otp });
      if (userData.status === 200) {
        toast.success("OTP verified successfully");
        onClose(); // Close the modal after successful OTP verification
      } else {
        toast.error("Invalid OTP");
      }
    } catch (error) {
      toast.error("Incorrect OTP");
    } finally {
      setSubmitting(false);
    }
  };

  const validateOTP = (values: { otp: string[] }) => {
    const errors: { otp?: string } = {};

    if (values.otp.some((digit) => !digit)) {
      errors.otp = "All OTP fields are required";
    }

    return errors;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
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

          <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-8 rounded-xl shadow">
            <header className="mb-4">
              <h1 className="text-2xl font-bold mb-1">Email Verification</h1>
              <p className="text-[15px] text-slate-500">
                Enter the 4-digit verification code that was sent to your Email.
              </p>
            </header>
            <Formik
              initialValues={{ otp: ["", "", "", ""] }}
              validate={validateOTP}
              onSubmit={(values, actions) => {
                setShowErrors(true);
                handleSubmit({ otp: values.otp.join("") }, actions);
              }}
            >
              {({ isSubmitting, values, handleChange, errors, handleSubmit }) => (
                <Form id="otp-form" onSubmit={handleSubmit}>
                  <div className="flex items-center justify-center gap-3">
                    {values.otp.map((_, index) => (
                      <Field
                        key={index}
                        name={`otp[${index}]`}
                        type="text"
                        className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                        maxLength="1"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const { value } = e.target;
                          if (/^\d*$/.test(value)) {
                            handleChange(e);
                            if (value.length === 1 && index < 3) {
                              const nextInput = document.querySelector<HTMLInputElement>(
                                `input[name="otp[${index + 1}]"]`
                              );
                              if (nextInput) {
                                nextInput.focus();
                              }
                            }
                          }
                        }}
                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                          if (e.key === "Backspace" && !values.otp[index] && index > 0) {
                            const prevInput = document.querySelector<HTMLInputElement>(
                              `input[name="otp[${index - 1}]"]`
                            );
                            if (prevInput) {
                              prevInput.focus();
                            }
                          }
                        }}
                      />
                    ))}
                  </div>
                  {showErrors && errors.otp && (
                    <div className="text-red-500 text-sm mt-2">{errors.otp}</div>
                  )}
                  <div className="max-w-[260px] mx-auto mt-4">
                    <button
                      type="submit"
                      className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Verifying..." : "Verify Account"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
            <div className="text-sm text-slate-500 mt-4">
  Didn't receive code?{" "}
  {timer === 0 ? (
    <span
      className="font-medium text-indigo-500 hover:text-indigo-600 cursor-pointer"
      onClick={handleResendOTP}
    >
      Resend
    </span>
  ) : (
    <span>Resend OTP in {timer} seconds</span>
  )}
</div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPModal;
