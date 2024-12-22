export interface SignupRequest {
    first_name: string;
    email: string;
    password: string;
  }
  
  export interface SignupResponse {
    message: string;
    user: {
      id: string;
      first_name: string;
      email: string;
    };
  }
  
  export interface ApiError {
    detail: string;
  }
  export interface SigninRequest {
    email: string;
    password: string;
  }
  
  export interface SigninResponse {
    token: string;
  }
  
  export interface ApiError {
    detail: string;
  }
  