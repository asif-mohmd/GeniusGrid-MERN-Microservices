import React, { useState } from 'react';
import { FaUpload, FaTimes } from 'react-icons/fa';
import { userAxios } from '../../../constraints/axiosInterceptors/userAxiosInterceptors';
import userEndpoints from '../../../constraints/endpoints/userEndpoints';
import { RootState } from '../../../redux/Store';
import { useSelector } from 'react-redux';

interface ProfilePageUserProps {
  name?: string;
  email?: string;
  avatar?: string;
}

const ProfilePageUser: React.FC<ProfilePageUserProps> = ({ name, email, avatar }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');

  const userData = useSelector((store: RootState) => store.userDetails);
  const userId = userData.userId;

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setUploadStatus('');
  };

  const handleUploadImage = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append('avatar', selectedImage);
    if (userId !== null) {
      formData.append('userId', userId.toString());
    }

    try {
      const response = await userAxios.post(userEndpoints.uploadAvatar, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
        setUploadStatus('Upload successful');
        setSelectedImage(null);
      } else {
        setUploadStatus('Something went wrong');
      }
    } catch (error) {
      setUploadStatus('Upload failed');
      console.error(error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-5">
      <div className='bg-gray-50 rounded-md p-2 shadow-sm '>
        <h2 className="text-xl font-semibold text-center font-roboto">User Profile</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className='flex flex-col items-center'>
          {avatar && !selectedImage && (
            <div className="col-span-2 flex flex-col items-center">
              <img className="rounded w-3/5" src={avatar} alt="User Avatar" />
              <div className="flex items-center mt-4">
                <label htmlFor="imageUpload" className="flex items-center cursor-pointer">
                  <FaUpload className="text-gray-500 mr-2" />
                  <span className="text-gray-600">Upload New Image</span>
                </label>
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>
            </div>
          )}
          {!avatar && (
            <div className="col-span-2 flex items-center">
              <label htmlFor="imageUpload" className="flex items-center cursor-pointer">
                <FaUpload className="text-gray-500 mr-2" />
                <span className="text-gray-600">Upload Image</span>
              </label>
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
          )}
          {selectedImage && (
            <div className="col-span-2 flex flex-col items-center">
              <img src={URL.createObjectURL(selectedImage)} alt="Selected" className="rounded w-2/5" />
              <div className='flex mt-2'>
                <button
                  onClick={handleUploadImage}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1.5 text-center mt-2"
                >
                  Submit
                </button>
                <button className=" text-gray-600 hover:text-red-600 text-xl pl-6" onClick={handleRemoveImage}>
                  <FaTimes />
                </button>
              </div>
              {uploadStatus && (
                <p className={`mt-2 ${uploadStatus === 'Upload successful' ? 'text-green-600' : 'text-red-600'}`}>
                  {uploadStatus}
                </p>
              )}
            </div>
          )}
        </div>
        
        <div className='md:col-span-1'>
          <div className='font-semibold font-poppins text-xs md:text-base '>
            <div className='flex font-semibold font-poppins '>
              <p className=" mb-1">Name:</p>
              <p className=" pl-2">{name || 'N/A'}</p>
            </div>
            <div className='flex mt-2'>
              <p className="mb-1">Email:</p>
              <p className="pl-2">{email || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePageUser;
