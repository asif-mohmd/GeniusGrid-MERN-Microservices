interface LoginRequest {
    email: string;
    password: string;
  }
  
  interface LoginResponse {
    msg: string;
    status: string;
    otp: string;
    loginStatus: boolean;
  }