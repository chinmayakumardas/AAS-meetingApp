
// // src/redux/AuthSlice.js

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import {
//   registerUserApi,
//   verifyOtpForRegistrationApi,
//   loginUserApi,
//   verifyOtpForLoginApi,
//   resendOtpApi,
//   resetPasswordApi,
//   verifyOtpAndResetPasswordApi,
// } from '../api/AuthApi';

// // Initial state for AuthSlice
// const initialState = {
//   user: null,
//   token: null,
//   isAuthenticated: false,
//   loading: false,
//   error: null,
// };

// // Thunks (Asynchronous actions)
// export const registerUser = createAsyncThunk(
//   'auth/registerUser',
//   async (userData, { rejectWithValue }) => {
//     try {
//       const data = await registerUserApi(userData);
//       return data;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

// export const verifyOtpForRegistration = createAsyncThunk(
//   'auth/verifyOtpForRegistration',
//   async (otpData, { rejectWithValue }) => {
//     try {
//       const data = await verifyOtpForRegistrationApi(otpData);
//       return data;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

// export const loginUser = createAsyncThunk(
//   'auth/loginUser',
//   async (loginData, { rejectWithValue }) => {
//     try {
//       const data = await loginUserApi(loginData);
//       return data;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

// export const verifyOtpForLogin = createAsyncThunk(
//   'auth/verifyOtpForLogin',
//   async (otpData, { rejectWithValue }) => {
//     try {
//       const data = await verifyOtpForLoginApi(otpData);
//       return data;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

// export const resendOtp = createAsyncThunk(
//   'auth/resendOtp',
//   async (userData, { rejectWithValue }) => {
//     try {
//       const data = await resendOtpApi(userData);
//       return data;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

// export const resetPassword = createAsyncThunk(
//   'auth/resetPassword',
//   async (emailOrUsername, { rejectWithValue }) => {
//     try {
//       const data = await resetPasswordApi(emailOrUsername);
//       return data;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

// export const verifyOtpAndResetPassword = createAsyncThunk(
//   'auth/verifyOtpAndResetPassword',
//   async (otpData, { rejectWithValue }) => {
//     try {
//       const data = await verifyOtpAndResetPasswordApi(otpData);
//       return data;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

// // AuthSlice
// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       state.isAuthenticated = false;
//       localStorage.removeItem('token');
//     },
//   },
//   extraReducers: (builder) => {
//     // Register User
//     builder.addCase(registerUser.pending, (state) => {
//       state.loading = true;
//     });
//     builder.addCase(registerUser.fulfilled, (state, action) => {
//       state.loading = false;
//       state.user = action.payload.user;
//       state.token = action.payload.token;
//       state.isAuthenticated = true;
//       localStorage.setItem('token', action.payload.token);
//     });
//     builder.addCase(registerUser.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     });

//     // Verify OTP for Registration
//     builder.addCase(verifyOtpForRegistration.pending, (state) => {
//       state.loading = true;
//     });
//     builder.addCase(verifyOtpForRegistration.fulfilled, (state, action) => {
//       state.loading = false;
//       state.user = action.payload.user;
//       state.token = action.payload.token;
//       state.isAuthenticated = true;
//       localStorage.setItem('token', action.payload.token);
//     });
//     builder.addCase(verifyOtpForRegistration.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     });

//     // Login User
//     builder.addCase(loginUser.pending, (state) => {
//       state.loading = true;
//     });
//     builder.addCase(loginUser.fulfilled, (state, action) => {
//       state.loading = false;
//       state.user = action.payload.user;
//       state.token = action.payload.token;
//       state.isAuthenticated = true;
//       localStorage.setItem('token', action.payload.token);
//     });
//     builder.addCase(loginUser.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     });

//     // Verify OTP for Login
//     builder.addCase(verifyOtpForLogin.pending, (state) => {
//       state.loading = true;
//     });
//     builder.addCase(verifyOtpForLogin.fulfilled, (state, action) => {
//       state.loading = false;
//       state.user = action.payload.user;
//       state.token = action.payload.token;
//       state.isAuthenticated = true;
//       localStorage.setItem('token', action.payload.token);
//     });
//     builder.addCase(verifyOtpForLogin.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     });

//     // Resend OTP
//     builder.addCase(resendOtp.pending, (state) => {
//       state.loading = true;
//     });
//     builder.addCase(resendOtp.fulfilled, (state, action) => {
//       state.loading = false;
//       state.user = action.payload.user;
//     });
//     builder.addCase(resendOtp.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     });

//     // Reset Password
//     builder.addCase(resetPassword.pending, (state) => {
//       state.loading = true;
//     });
//     builder.addCase(resetPassword.fulfilled, (state, action) => {
//       state.loading = false;
//     });
//     builder.addCase(resetPassword.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     });

//     // Verify OTP and Reset Password
//     builder.addCase(verifyOtpAndResetPassword.pending, (state) => {
//       state.loading = true;
//     });
//     builder.addCase(verifyOtpAndResetPassword.fulfilled, (state, action) => {
//       state.loading = false;
//     });
//     builder.addCase(verifyOtpAndResetPassword.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     });
//   },
// });

// // Export actions and reducer
// export const { logout } = authSlice.actions;
// export default authSlice.reducer;



// src/redux/AuthSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  registerUserApi,
  verifyOtpForRegistrationApi,
  loginUserApi,
  verifyOtpForLoginApi,
  resendOtpApi,
  resetPasswordApi,
  verifyOtpAndResetPasswordApi,
} from '../api/AuthApi';

// Initial state for AuthSlice
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Thunks (Asynchronous actions)
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const data = await registerUserApi(userData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const verifyOtpForRegistration = createAsyncThunk(
  'auth/verifyOtpForRegistration',
  async (otpData, { rejectWithValue }) => {
    try {
      const data = await verifyOtpForRegistrationApi(otpData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (loginData, { rejectWithValue }) => {
    try {
      const data = await loginUserApi(loginData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const verifyOtpForLogin = createAsyncThunk(
  'auth/verifyOtpForLogin',
  async (otpData, { rejectWithValue }) => {
    try {
      const data = await verifyOtpForLoginApi(otpData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const resendOtp = createAsyncThunk(
  'auth/resendOtp',
  async (userData, { rejectWithValue }) => {
    try {
      const data = await resendOtpApi(userData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (emailOrUsername, { rejectWithValue }) => {
    try {
      const data = await resetPasswordApi(emailOrUsername);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const verifyOtpAndResetPassword = createAsyncThunk(
  'auth/verifyOtpAndResetPassword',
  async (otpData, { rejectWithValue }) => {
    try {
      const data = await verifyOtpAndResetPasswordApi(otpData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// AuthSlice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    // Register User
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem('token', action.payload.token);
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Verify OTP for Registration
    builder.addCase(verifyOtpForRegistration.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(verifyOtpForRegistration.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem('token', action.payload.token);
    });
    builder.addCase(verifyOtpForRegistration.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Login User
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem('token', action.payload.token);
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Verify OTP for Login
    builder.addCase(verifyOtpForLogin.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(verifyOtpForLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem('token', action.payload.token);
    });
    builder.addCase(verifyOtpForLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Resend OTP
    builder.addCase(resendOtp.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(resendOtp.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
    });
    builder.addCase(resendOtp.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Reset Password
    builder.addCase(resetPassword.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(resetPassword.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Verify OTP and Reset Password
    builder.addCase(verifyOtpAndResetPassword.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(verifyOtpAndResetPassword.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(verifyOtpAndResetPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

// Export actions and reducer
export const { logout } = authSlice.actions;
export default authSlice.reducer;
