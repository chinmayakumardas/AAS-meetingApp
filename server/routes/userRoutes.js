// const express = require('express');
// const router = express.Router();
// const { registerUser, verifyOtpForRegistration, loginUser, verifyOtpForLogin, resendOtp } = require('../controllers/userController');

// // POST request to register user
// router.post('/register', registerUser);

// // POST request to verify OTP and complete registration
// router.post('/verify-otp-register', verifyOtpForRegistration);

// // POST request to login user
// router.post('/login', loginUser);

// // POST request to verify OTP for login
// router.post('/verify-otp-login', verifyOtpForLogin);

// // POST request to resend OTP
// router.post('/resend-otp', resendOtp);

// module.exports = router;



const express = require('express');
const router = express.Router();
const { registerUser, verifyOtpForRegistration, loginUser, verifyOtpForLogin, resendOtp, resetPassword, verifyOtpAndResetPassword } = require('../controllers/userController');

// POST request to register user
router.post('/register', registerUser);

// POST request to verify OTP and complete registration
router.post('/verify-otp-register', verifyOtpForRegistration);

// POST request to login user
router.post('/login', loginUser);

// POST request to verify OTP for login
router.post('/verify-otp-login', verifyOtpForLogin);

// POST request to resend OTP
router.post('/resend-otp', resendOtp);

// POST request to request password reset OTP
router.post('/reset-password', resetPassword);

// POST request to verify OTP and reset the password
router.post('/verify-otp-reset-password', verifyOtpAndResetPassword);

module.exports = router;
