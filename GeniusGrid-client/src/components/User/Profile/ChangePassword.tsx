import { useState } from 'react';
import axios from 'axios'; // Assuming you are using axios for API calls
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import { ToastContainer, toast } from 'react-toastify';

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setErrorMessage("New password and confirm password don't match");
      return;
    }

    try {
      // Make API call to update password
      const response = await axios.post('/api/change-password', {
        currentPassword,
        newPassword,
      });
      setSuccessMessage(response.data.message);
      // Clear input fields
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
     toast.error("Something went wrong")
    }
  };

  return (
<div>
<ToastContainer/>
      <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
    
      <div className="mb-4">
        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
          Current Password
        </label>
        <div className="relative">
          <input
            id="currentPassword"
            type={showCurrentPassword ? 'text' : 'password'}
            className="mt-1 p-2 border border-gray-300 rounded-md w-3/4"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 px-3 py-2 focus:outline-none"
            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
          >
            {showCurrentPassword ? <RiEyeFill /> : <RiEyeOffFill />}
          </button>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
          New Password
        </label>
        <div className="relative">
          <input
            id="newPassword"
            type={showNewPassword ? 'text' : 'password'}
            className="mt-1 p-2 border border-gray-300 rounded-md w-3/4"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 px-3 py-2 focus:outline-none"
            onClick={() => setShowNewPassword(!showNewPassword)}
          >
             {showNewPassword ? <RiEyeFill /> : <RiEyeOffFill />}
          </button>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
          Confirm Password
        </label>
        <div className="relative">
          <input
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            className="mt-1 p-2 border border-gray-300 rounded-md w-3/4"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 px-3 py-2 focus:outline-none"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            
          </button>
        </div>
      </div>
      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
      {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        onClick={handleChangePassword}
      >
        Update Password
      </button>
    </div>
  );
}

export default ChangePassword;
