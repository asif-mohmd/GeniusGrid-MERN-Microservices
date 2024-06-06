import { useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
import { Navigate } from "react-router-dom";
import instructorEndpoints from "../../constraints/endpoints/instructorEndpoints";
import { ProtectedRouteProps } from "../../interfaces/ICommonInterface";


const InstructorProtectorRoute: React.FC<ProtectedRouteProps> = ({ component: Component }) => {
  const instructor = useSelector((store: RootState) => store.instructorAuth);
    if (instructor.isLogin==false) {
      return <Navigate to={instructorEndpoints.login} />;
    }
  
    return <Component/>;
  };

export default InstructorProtectorRoute;