import React, { useState, useEffect } from 'react';
import { userAxios } from '../../../constraints/axiosInterceptors/userAxiosInterceptors';
import userEndpoints from '../../../constraints/endpoints/userEndpoints';
import { toast } from 'react-toastify';

interface ForgotOTPModalProps {
  onClose: () => void;
}

const ForgotOTPModal: React.FC<ForgotOTPModalProps> = ({ onClose }) => {
  const [otp, setOTP] = useState('');
  const [timer, setTimer] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [resendClicked, setResendClicked] = useState(false);

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
      const response = await userAxios.post(userEndpoints.forgotOTP, {
        otp,
      });
      if (response.status === 200) {
        toast.success("OTP resent successfully");
        setTimer(60);
        setIsTimerRunning(true);
        setResendClicked(true);
      } else {
        toast.error("OTP resend failed");
      }
    } catch (error) {
      toast.error("Failed to resend OTP. Please try again.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userData = await userAxios.post(userEndpoints.forgotOTP, { otp });
      if (userData.status) {
        toast.success("Password changed successfully");
        onClose();
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Invalid OTP");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative w-full max-w-md px-4">
        <div className="bg-white rounded-lg shadow-lg relative w-full mx-4 sm:mx-6 md:mx-0 md:max-w-lg lg:max-w-xl">
          <div className="flex justify-end p-2">
            <button
              onClick={onClose}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
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
            <h2 className="text-2xl font-bold mb-4">Enter OTP</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOTP(e.target.value)}
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white rounded px-4 py-2 font-semibold hover:bg-blue-600 transition-colors duration-300"
              >
                Submit
              </button>
            </form>
            <div className="flex justify-between items-center mt-4 text-gray-600 text-sm">
              {!resendClicked ? (
                <p>
                  Didn't receive OTP?{' '}
                  <span
                    className="text-blue-600 font-semibold cursor-pointer hover:underline"
                    onClick={handleResendOTP}
                  >
                    Resend OTP
                  </span>
                </p>
              ) : (
                <p>{timer === 0 ? 'Resend OTP' : `Resend OTP in ${timer} seconds`}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotOTPModal;
