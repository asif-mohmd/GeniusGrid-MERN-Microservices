import React, { useState, ChangeEvent, FormEvent } from 'react';
import { adminAxios } from '../../../constraints/axiosInterceptors/adminAxiosInterceptors';
import adminEndpoints from '../../../constraints/endpoints/adminEndpoints';
import { ToastContainer, toast } from 'react-toastify';


interface Props { }

const DashboardAddCategory: React.FC<Props> = () => {
  const [categoryName, setCategoryName] = useState<string>('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCategoryName(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Here you can add your logic to submit the category name
    const response = await adminAxios.post(adminEndpoints.addCategory, { categoryName })

    if (response.status == 200) {
      toast.success("Category successfully created")
    } else {
      toast.error("Something went wrong")
    }
    // Clear the input field after submission
    setCategoryName('');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <ToastContainer />
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 mb-24">
        <div className="mb-6">
          <label htmlFor="category-name" className="block text-sm font-medium text-gray-700">
            Category Name
          </label>
          <input
            type="text"
            id="category-name"
            className="mt-1 block w-full appearance-none border border-gray-300 rounded-md py-2 px-3 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Enter category name"
            value={categoryName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Category
          </button>
        </div>
      </form>
    </div>
  );
};

export default DashboardAddCategory;
