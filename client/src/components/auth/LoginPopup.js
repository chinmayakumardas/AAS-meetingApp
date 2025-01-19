import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { loginUser, verifyOtpForLogin, resendOtp, resetPassword } from '../../redux/AuthSlice';

export default function LoginPopup({ isOpen, onClose }) {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState(Array(6).fill('')); // OTP fields
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false); // Toggle for Reset Password Form
  const [showPassword, setShowPassword] = useState(false); // For password view toggle
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    // Only redirect if authenticated
    if (isAuthenticated && isOtpVerified) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, isOtpVerified, router]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (isResetPassword) {
      try {
        await dispatch(resetPassword(emailOrUsername));
        toast.success('OTP sent for password reset!');
        setIsOtpSent(true);
      } catch (error) {
        toast.error('Failed to send OTP for reset password.');
        setLoading(false);
      }
    } else {
      // Basic validation for email/username and password
      if (!emailOrUsername || !password) {
        toast.error('Email/Username and Password are required.');
        setLoading(false);
        return;
      }
      try {
        // Dispatch the login action to send OTP
        await dispatch(loginUser({ emailOrUsername, password }));
        toast.success('OTP Sent!');
        setIsOtpSent(true); // Mark OTP as sent after successful login request
      } catch (error) {
        toast.error('Failed to send OTP');
        setLoading(false);
      }
    }
  };

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (/[0-9]/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to next field if filled
      if (index < otp.length - 1 && value) {
        document.getElementById(`otp-field-${index + 1}`).focus();
      }
    }
  };

  const handleOtpSubmit = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      toast.error('Please fill all OTP fields.');
      return;
    }

    try {
      // Attempt OTP verification
      const response = await dispatch(verifyOtpForLogin({ emailOrUsername, otp: otpString }));
      if (response.payload?.token) {
        setIsOtpVerified(true);
        toast.success('OTP Verified');
        // Redirect only after OTP is verified
        router.push('/dashboard'); 
      } else {
        toast.error('Invalid OTP');
      }
    } catch (error) {
      toast.error('Error verifying OTP');
    }
  };

  const handleResendOtp = () => {
    setLoading(true);
    dispatch(resendOtp({ emailOrUsername }));
    toast.success('OTP resent successfully.');
    setLoading(false);
  };

  const handleToggleResetPassword = () => {
    setIsResetPassword((prev) => !prev);
    setIsOtpSent(false);
    setOtp(Array(6).fill(''));
    setEmailOrUsername('');
    setPassword('');
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-white p-8 rounded-lg shadow-md w-full sm:w-96 relative">
        <h2 className="text-2xl font-bold text-center mb-6 text-black">{isResetPassword ? 'Reset Password' : 'Login'}</h2>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              className="w-full mt-2 p-3 border border-gray-300 rounded-md text-black"
              placeholder="Enter Email or Username"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              required
            />
          </div>

          {!isResetPassword && (
            <div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="w-full mt-2 p-3 border border-gray-300 rounded-md text-black"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={handlePasswordToggle}
                >
                  {showPassword ? '🙈' : '👁️'}
                </span>
              </div>
            </div>
          )}

          {isOtpSent && !isOtpVerified && (
            <div className="flex justify-center space-x-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  id={`otp-field-${index}`}
                  maxLength="1"
                  className="w-12 h-12 border text-center text-black focus:outline-none"
                  value={digit}
                  onChange={(e) => handleOtpChange(e, index)}
                  autoFocus={index === 0}
                />
              ))}
            </div>
          )}

          <div className="flex justify-between">
            {isOtpSent && !isOtpVerified ? (
              <button
                type="button"
                className="w-full bg-blue-500 text-white p-3 rounded-md"
                onClick={handleOtpSubmit}
                disabled={loading || otp.join('').length !== 6}
              >
                {loading ? 'Verifying OTP...' : 'Verify OTP'}
              </button>
            ) : (
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-3 rounded-md"
                disabled={loading}
              >
                {loading ? 'Sending OTP...' : isResetPassword ? 'Send OTP' : 'Sign In'}
              </button>
            )}
          </div>
        </form>

        {isOtpSent && !isOtpVerified && (
          <div className="mt-4 text-center">
            <button
              className="text-blue-600"
              onClick={handleResendOtp}
              disabled={loading}
            >
              Resend OTP
            </button>
          </div>
        )}

        <div className="mt-6 text-center text-sm">
          {isResetPassword ? (
            <>
              <span className="text-black">Back to login?</span>
              <button
                className="text-blue-600 ml-2"
                onClick={handleToggleResetPassword}
              >
                Login
              </button>
            </>
          ) : (
            <>
              <span className="text-black">Forgot password? </span>
              <button
                className="text-blue-600 ml-2"
                onClick={handleToggleResetPassword}
              >
                Reset Password
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
