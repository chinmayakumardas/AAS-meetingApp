

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, verifyOtpForLogin, resetPassword, verifyOtpAndResetPassword } from '../../redux/AuthSlice';

export default function LoginPopup({ isOpen, onClose }) {
  if (!isOpen) return null;

  const dispatch = useDispatch();
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);
  const [emailOrUsername, setEmailOrUsername] = useState("");  // Changed to emailOrUsername
  const [password, setPassword] = useState("Chin@2025");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Redux states
  const { loading, error, user, isAuthenticated } = useSelector((state) => state.auth);

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const [toastProgress, setToastProgress] = useState(0);

  // Handle Toast Display
  useEffect(() => {
    if (toastMessage) {
      const progressInterval = setInterval(() => {
        setToastProgress((prev) => prev + 10);
      }, 300);

      const timeout = setTimeout(() => {
        setToastMessage("");
        setToastProgress(0);
      }, 3000);

      return () => {
        clearInterval(progressInterval);
        clearTimeout(timeout);
      };
    }
  }, [toastMessage]);

  const showToast = (message, type) => {
    setToastMessage(message);
    setToastType(type);
  };

  const handleSubmit = () => {
    if (!emailOrUsername || !password) return;

    // Check if emailOrUsername looks like an email
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailOrUsername);

    dispatch(loginUser({ emailOrUsername, password })).then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
        setOtpSent(true);
        showToast("OTP Sent!", "success");
      } else {
        showToast("Invalid credentials.", "error");
      }
    });
  };

  const handleOtpVerification = () => {
    if (otp.includes("") || otp.length !== 6) return;

    const otpCode = otp.join("");
    dispatch(verifyOtpForLogin({ emailOrUsername, otp: otpCode })).then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
        setOtpVerified(true);
        showToast("OTP Verified!", "success");
        router.push("/notes"); // Navigate to notes after OTP is verified
      } else {
        showToast("Invalid OTP.", "error");
      }
    });
  };

  const handlePasswordReset = () => {
    if (!newPassword || !confirmPassword) return;

    if (newPassword === confirmPassword) {
      dispatch(resetPassword({ emailOrUsername, newPassword })).then((result) => {
        if (result.meta.requestStatus === 'fulfilled') {
          showToast("Password Reset Successfully!", "success");
          setIsLogin(true);
          setPassword(newPassword);
          setOtpSent(false);
          setOtpVerified(false);
        } else {
          showToast("Error resetting password.", "error");
        }
      });
    } else {
      showToast("Passwords do not match.", "error");
    }
  };

  // Ensure the modal behavior works only on the client-side
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const closeModal = () => {
    onClose();
    setIsLogin(true);
    setEmailOrUsername("");  // Reset emailOrUsername
    setPassword("Chin@2025");
    setOtp(["", "", "", "", "", ""]);
    setNewPassword("");
    setConfirmPassword("");
    setOtpSent(false);
    setOtpVerified(false);
  };

  return (
    <>
      {toastMessage && (
        <div
          className={`fixed top-0 left-0 right-0 p-4 bg-${toastType === "success" ? "green" : "red"}-500 text-white rounded-lg flex items-center w-full`}
        >
          {toastType === "success" ? (
            <AiOutlineCheck className="mr-2 text-xl" />
          ) : (
            <AiOutlineClose className="mr-2 text-xl" />
          )}
          <span className="flex-1">{toastMessage}</span>
          <div className="w-full h-1 bg-gray-200 rounded-full mt-2">
            <div
              className="h-1 bg-white rounded-full"
              style={{ width: `${toastProgress}%` }}
            />
          </div>
        </div>
      )}

      <div
        onClick={closeModal}
        className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white p-6 rounded-lg shadow-lg w-80 md:w-96 lg:w-1/3 z-50"
        >
          <h2 className="text-lg font-semibold text-gray-900 text-center mb-4">
            {isLogin ? "Login" : "Reset Password"}
          </h2>

          {error && (
            <div className="text-red-500 text-center mb-4">
              <p>{error.message || "An error occurred"}</p>
            </div>
          )}

          <input
            type="text"
            placeholder="Email or Username"
            className="mt-4 p-2 border w-full rounded text-black"
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
            disabled={loading}
          />

          {isLogin && !otpSent && (
            <input
              type="password"
              placeholder="Password"
              className="mt-4 p-2 border w-full rounded text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          )}

          {otpSent && !otpVerified && (
            <div className="mt-4 flex space-x-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  value={digit}
                  maxLength="1"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.match(/^\d$/)) {
                      const newOtp = [...otp];
                      newOtp[index] = value;
                      setOtp(newOtp);
                      if (index < 5) document.getElementById(`otp-${index + 1}`).focus();
                    }
                  }}
                  className="p-2 border w-full h-12 text-center text-black"
                  id={`otp-${index}`}
                  disabled={loading}
                />
              ))}
            </div>
          )}

          {isLogin === false && otpVerified && (
            <>
              <input
                type="password"
                placeholder="New Password"
                className="mt-4 p-2 border w-full rounded text-black"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={loading}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="mt-4 p-2 border w-full rounded text-black"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
              />
            </>
          )}

          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={isLogin ? handleSubmit : handlePasswordReset}
              className="bg-blue-600 text-white px-4 py-2 rounded flex items-center"
              disabled={loading || !emailOrUsername || (isLogin && !password) || (isLogin === false && !otpVerified && (!newPassword || !confirmPassword))}
            >
              {loading ? (
                <>
                  <span className="mr-2">{isLogin ? "Logging In" : "Resetting..."}</span>
                  <div className="animate-pulse flex space-x-2">
                    <span className="h-2 w-2 rounded-full bg-white"></span>
                    <span className="h-2 w-2 rounded-full bg-white"></span>
                    <span className="h-2 w-2 rounded-full bg-white"></span>
                  </div>
                </>
              ) : isLogin ? (
                otpSent ? (
                  "Verify OTP"
                ) : (
                  "Send OTP"
                )
              ) : otpVerified ? (
                "Reset Password"
              ) : (
                "Send OTP"
              )}
            </button>

            <div className="mt-4 flex items-center">
              {!isLogin && !otpVerified && (
                <p
                  onClick={() => setIsLogin(true)}
                  className="text-blue-500 cursor-pointer mr-4"
                >
                  Back to Login
                </p>
              )}

              {isLogin && !otpSent && !otpVerified && (
                <p
                  onClick={() => setIsLogin(false)}
                  className="text-blue-500 cursor-pointer"
                >
                  Reset Password?
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
