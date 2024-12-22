import api from "./api";
import { SignupRequest, SignupResponse, ApiError,SigninRequest, SigninResponse } from "@/types/auth";
// Signup API call
export const signup = async (data: SignupRequest): Promise<SignupResponse> => {
  try {
    const response = await api.post<SignupResponse>("/v1/signup", data);
    return response.data;
  } catch (error: any) {
    const apiError: ApiError = error.response?.data || {
      detail: "Something went wrong!",
    };
    throw apiError;
  }
};
export const signin = async (data: SigninRequest): Promise<SigninResponse> => {
  try {
    const response = await api.post<SigninResponse>("/v1/auth", data);
    return response.data;
  } catch (error: any) {
    const apiError: ApiError = error.response?.data || {
      detail: "Something went wrong!",
    };
    throw apiError;
  }
};
