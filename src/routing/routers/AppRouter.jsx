import React from 'react'
import { Routes, Route } from 'react-router-dom'
import DashBoard from '../../Components/Screens/DashBoard'
import VerifyMail from '../../Components/Screens/Authentication/VerifyMail'
import RegisterPage from '../../Components/Screens/Authentication/RegisterPage'
import StaffProfile from '../../Components/Screens/Authentication/StaffProfile'
import ForgotPassword from '../../Components/Screens/Authentication/ForgotPassword'
import OtpPage from '../../Components/Screens/Authentication/OtpPage'
import ResetPassword from '../../Components/Screens/Authentication/ResetPassword'
import UpdateProfile from '../../Components/Screens/Authentication/UpdateProfile'
import LoginPage from '../../Components/Screens/Authentication/LoginPage'

function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashBoard />} />
      <Route path="/login-page" element={<LoginPage />} />
      <Route path="/verify-mail" element={<VerifyMail />} />
      <Route path="/" element={<VerifyMail />} />
      <Route path="/register-page" element={<RegisterPage />} />
      <Route path="/staff-profile" element={<StaffProfile />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/otp-page" element={<OtpPage />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/update-profile" element={<UpdateProfile />} />
    </Routes>
  )
}

export default AppRouter
