import { useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
import { Navigate } from "react-router-dom";
import { ProtectedRouteProps } from "../../interfaces/ICommonInterface";



const UserPublicRoute: React.FC<ProtectedRouteProps> = ({ component: Component }) => {
  const user = useSelector((store: RootState) => store.userAuth);
    if (user.isLogin==true) {
      return <Navigate to="/" />;
    }
  
    return <Component/>;
  };

export default UserPublicRoute;