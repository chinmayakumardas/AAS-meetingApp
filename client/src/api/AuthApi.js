// src/api/AuthApi.js
import AxiosInstance from './AxiosInstance';


// API call to register user
export const registerUserApi = async (userData) => {
  try {
    const response = await AxiosInstance.post('/users/register', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// API call to verify OTP for registration
export const verifyOtpForRegistrationApi = async (otpData) => {
  try {
    const response = await AxiosInstance.post('/users/verify-otp-register', otpData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// API call to login user
export const loginUserApi = async (loginData) => {
  try {
    const response = await AxiosInstance.post('/users/login', loginData);
    return response.data;
  } catch (error) {
    console.error("Login API error:", error); // log the error to inspect it
    throw error.response?.data || error.message;
  }
};

// API call to verify OTP for login
export const verifyOtpForLoginApi = async (otpData) => {
  try {
    const response = await AxiosInstance.post('/users/verify-otp-login', otpData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// API call to resend OTP
export const resendOtpApi = async (userData) => {
  try {
    const response = await AxiosInstance.post('/users/resend-otp', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// API call to reset password
export const resetPasswordApi = async (emailOrUsername) => {
  try {
    const response = await AxiosInstance.post('/users/reset-password', { emailOrUsername });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// API call to verify OTP and reset password
export const verifyOtpAndResetPasswordApi = async (otpData) => {
  try {
    const response = await AxiosInstance.post('/users/verify-otp-reset-password', otpData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
