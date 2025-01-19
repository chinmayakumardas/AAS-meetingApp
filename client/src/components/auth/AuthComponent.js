import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { loginUser, verifyOtpForLogin, resendOtp, resetPassword } from '../../redux/AuthSlice';

export default function LoginPopup({ isOpen, onClose }) {

  const dispatch = useDispatch();
  const router = useRouter();
  
  
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

  

  
  
  if (!isOpen) return null;

  return (
    <>
    hii</>
  );
}
