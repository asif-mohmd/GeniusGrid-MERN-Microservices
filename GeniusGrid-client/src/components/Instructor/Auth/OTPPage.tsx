import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import instructorEndpoints from '../../../constraints/endpoints/instructorEndpoints';
import { instructoraxios } from '../../../constraints/axiosInterceptors/instructorAxiosInterceptors';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/Store';
import { clearRegisterData } from '../../../redux/registerData/registerData';

const InstructorOTPPage: React.FC = () => {
  const [otp, setOTP] = useState('');
  const [timer, setTimer] = useState(60); // Initial timer value (in seconds)
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [resendClicked, setResendClicked] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
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
      const response = await instructoraxios.post(instructorEndpoints.register, {
        formData,
      });
      if (response.status === 200) {
        toast.success('OTP resent successfully');
        setTimer(60); // Reset timer
        setIsTimerRunning(true);
        setResendClicked(true);
      } else {
        toast.success("OTP resent failed");
        setTimer(60); // Reset timer
        setIsTimerRunning(true);
        setResendClicked(true);
      }
    } catch (error) {
      toast.error('Failed to resend OTP. Please try again.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle OTP submission logic here
    try {
      const instructorData = await instructoraxios.post(instructorEndpoints.otp, { otp });
      if (instructorData.status === 200) {
        dispatch(clearRegisterData());
        navigate(instructorEndpoints.login);
      } else {
        toast.error('Invalid OTP');
      }
    } catch (error) {
      console.error('Error submitting OTP:', error);
      toast.error('Incorrect OTP');
    }
  };

 
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <ToastContainer />
      <div className="bg-white p-8 rounded shadow-xl w-full max-w-sm m-2">
        <h5 className="text-2xl font-medium mb-7 text-center">Enter Instructor OTP</h5>
        <form onSubmit={handleSubmit}>
          
          <input
            type="text"
            className="bg-white appearance-none border-2 border-gray-100 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-300"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOTP(e.target.value)}
          />
          <button
            type="submit"
            className="w-full mt-5 bg-blue-500 text-white rounded-xl px-4 py-2 font-semibold hover:bg-blue-600 transition-colors duration-300"
          >
            Submit
          </button>
        </form>
        <div className="flex justify-between items-center mt-4 text-gray-600 text-sm">
          {!resendClicked && (
            <p>
              Didn't receive OTP?{" "}
              <span
                className="text-blue-600 font-semibold cursor-pointer hover:underline"
                onClick={handleResendOTP}
              >
                Resend OTP
              </span>
            </p>
          )}
          {resendClicked && <p>Resend OTP in {timer} seconds</p>}
        </div>
      </div>
    </div>
  );
};
export default InstructorOTPPage;
