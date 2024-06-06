import { ReactNode, useState, createContext, useContext } from "react";

interface IAuthContext {
    showSignup: boolean;
    showLogin: boolean;
    isLogin: boolean;
    showOTP: boolean;
    showForgotPassword:boolean,
    showForgotOTP:boolean,
    handleShowSignup: () => void;
    handleShowLogin: () => void;
    handleShowOTP: ()=> void;
    handleShowForgotPassword: ()=> void;
    handleShowForgotOTP: ()=> void;
    handleClose: () => void;
    setIsLogin: (value: boolean) => void;
}

// Create the context
const AuthContext = createContext<IAuthContext>({
    showSignup: false,
    showLogin: false,
    isLogin: false,
    showOTP: false,
    showForgotPassword:false,
    showForgotOTP:false,
    handleShowSignup: () => {},
    handleShowLogin: () => {},
    handleShowOTP: () => {},
    handleShowForgotPassword: () => {},
    handleShowForgotOTP: ()=> {},
    handleClose: () => {},
    setIsLogin: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {

    
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [showForgotPassword,setShowForgotPassword]  = useState(false)
  const [showForgotOTP,setShowForgotOTP] = useState(false)


  const handleShowSignup = () => {
    setShowLogin(false);
    setShowSignup(true);
  };

  const handleShowLogin = () => {
    setShowSignup(false);
    setShowLogin(true);
  };



  const handleShowOTP = () =>{
    setShowSignup(false)
    setShowOTP(true)
  }
  const handleShowForgotPassword = () => {
    setShowLogin(false);
    setShowForgotPassword(true);
  };

  const handleShowForgotOTP = () => {
    setShowForgotPassword(false);
    setShowForgotOTP(true);
  };
 

  const handleClose = () => {
    setShowSignup(false);
    setShowLogin(false);
    setShowOTP(false);
    setShowForgotPassword(false)
    setShowForgotOTP(false)
  };
  return (
    <AuthContext.Provider
      value={{
        showSignup,
        showLogin,
        showOTP,
        showForgotPassword,
        showForgotOTP,
        handleShowSignup,
        handleShowLogin,
        handleShowOTP,
        handleShowForgotPassword,
        handleShowForgotOTP,
        handleClose,
        isLogin,
        setIsLogin,
        
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);