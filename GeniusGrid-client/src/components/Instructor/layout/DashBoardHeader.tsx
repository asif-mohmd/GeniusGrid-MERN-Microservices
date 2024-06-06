import { Link, useNavigate } from 'react-router-dom';
import userEndpoints from '../../../constraints/endpoints/userEndpoints';
import { useState } from 'react';
import instructorEndpoints from '../../../constraints/endpoints/instructorEndpoints';
import { useDispatch } from 'react-redux';
import { instructorLogout } from '../../../redux/instructorSlices/authSlice';
import { clearInstructorData } from '../../../redux/instructorSlices/instructorDataSlice';

const DashboardHeader = () => {
  const [open,setOpen] = useState(false)


  const dispatch = useDispatch()
  const navigate = useNavigate()

  const showDropDown=()=>{
    setOpen(!open)
  }

  const handleClick=()=>{
   
    dispatch(clearInstructorData())
    dispatch(instructorLogout())
    navigate(instructorEndpoints.dashboard)
  }

  return (
    <div className='bg-white flex items-center h-16 w-full justify-end'>


      <ul className=' md:flex '>
      <div className='flex ' onClick={showDropDown}>
        <img className="cursor-pointer m-2 h-10 w-10 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
        {open && (
        <div className='absolute right-4 mt-2 w-44 top-11 bg-white border rounded-lg shadow-lg'>
        <div className="py-2">
          <Link to={instructorEndpoints.profile}  className='block px-4 py-2 text-gray-800 rounded-md hover:bg-[#00df9a] hover:text-black cursor-pointer'>Profile</Link>
          <Link to={userEndpoints.login}  className='block px-4 py-2 text-gray-800 rounded-md hover:bg-[#00df9a] hover:text-black cursor-pointer'>Settings</Link>
          <Link to={instructorEndpoints.login}  onClick={handleClick} className='block px-4 py-2 text-gray-800 rounded-md hover:bg-[#00df9a] hover:text-black cursor-pointer'>Signout</Link>
        </div>
      </div>
        )}
      </div>
   
      </ul>


    </div>



   
  );
};

export default DashboardHeader;
