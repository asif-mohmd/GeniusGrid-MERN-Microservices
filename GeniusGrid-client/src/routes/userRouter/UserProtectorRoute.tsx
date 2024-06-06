import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
import { Navigate } from "react-router-dom";
import { ProtectedRouteProps } from "../../interfaces/ICommonInterface";
import { checkUserAuthentication } from "../../redux/userSlices/authSlice";


const UserProtectorRoute: React.FC<ProtectedRouteProps> = ({ component: Component }) => {

  const dispatch = useDispatch();
  dispatch(checkUserAuthentication())
  const user = useSelector((store: RootState) => store.userAuth);

    if(user.isLogin==false) {
      return <Navigate to="/" />;
    }
  
    return <Component/>;
  };

export default UserProtectorRoute;