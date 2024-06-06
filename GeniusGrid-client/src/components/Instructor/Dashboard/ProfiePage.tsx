import { useEffect, useState } from 'react';
import instructorEndpoints from '../../../constraints/endpoints/instructorEndpoints';
import { instructoraxios } from '../../../constraints/axiosInterceptors/instructorAxiosInterceptors';

interface InstructorData {
    name: string;
    email: string;
    // Add other properties as needed
}

function ProfilePage() {

    const [instructorData, setInstructorData] = useState<InstructorData | null>(null);

    useEffect(() => {
        async function fetchInstructorData() {
            try {
                const response = await instructoraxios.get(instructorEndpoints.profile);
                setInstructorData(response.data);
            } catch (error) {
                console.error('Error fetching instructor data:', error);
            }
        }
        
        fetchInstructorData();
    }, []);

    const handleEditProfile = () =>{

    }

  return (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div className="max-w-md w-full bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-8">
        <div className="flex justify-center mb-6">
          <img
            className="w-32 h-32 rounded-full"
            src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?size=338&ext=jpg&ga=GA1.1.867424154.1713484800&semt=ais"
            alt="Profile Picture"
          />
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {instructorData?.name}
          </h2>
          <p className="text-xl text-gray-600 mb-4">
            {instructorData?.email}
          </p>
          <div className="flex justify-center">
            <button
              onClick={handleEditProfile}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

}

export default ProfilePage;
