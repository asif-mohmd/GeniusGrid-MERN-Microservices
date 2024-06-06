import SignupModal from "./SignupModal";
import LoginModal from "./LoginModal";
import { useAuth } from "../../../utils/AuthContext";
import OTPModal from "./OTPModal";
import ForgotPasswordModal from "./ForgotPasswordModal";
import ForgotOTPModal from "./ForgotOTPModal";

const AuthModalManager = () => {
  const {
    showSignup,
    showLogin,
    handleShowSignup,
    handleClose,
    showOTP,
    showForgotPassword,
    showForgotOTP
  } = useAuth();

  return (
    <>

      {showForgotOTP && <ForgotOTPModal onClose={handleClose} />}

      {showOTP && <OTPModal onClose={handleClose} />}

      {showForgotPassword && <ForgotPasswordModal onClose={handleClose} />}

      {showSignup && <SignupModal onClose={handleClose} />}
      {showLogin && (
        <LoginModal onClose={handleClose} onShowSignup={handleShowSignup} />
      )}
    </>
  );
};

export default AuthModalManager;
