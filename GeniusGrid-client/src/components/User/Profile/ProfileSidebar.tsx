
function ProfileSidebar() {
  return (
    <div className="w-1/4 bg-gray-200">
      <div className="p-4">
        <ul>
          <li><a href="#" className="block py-2 px-4 text-gray-800 hover:bg-gray-300">My Account</a></li>
          <li><a href="#" className="block py-2 px-4 text-gray-800 hover:bg-gray-300">Change Password</a></li>
          <li><a href="#" className="block py-2 px-4 text-gray-800 hover:bg-gray-300">Enrolled Courses</a></li>
          <li><a href="#" className="block py-2 px-4 text-gray-800 hover:bg-gray-300">Logout</a></li>
        </ul>
      </div>
    </div>
  );
}

export default ProfileSidebar;
