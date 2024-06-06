import { useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
import { Navigate } from "react-router-dom";
import instructorEndpoints from "../../constraints/endpoints/instructorEndpoints";
import { ProtectedRouteProps } from "../../interfaces/ICommonInterface";



const InstructorPublicRoute: React.FC<ProtectedRouteProps> = ({ component: Component }) => {
  const instructor = useSelector((store: RootState) => store.instructorAuth);
    if (instructor.isLogin==true) {
      return <Navigate to={instructorEndpoints.dashboard} />;
    }
  
    return <Component/>;
  };

export default InstructorPublicRoute;