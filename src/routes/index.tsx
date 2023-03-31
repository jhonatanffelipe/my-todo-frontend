import React from "react";

import { Routes, Route, Navigate } from "react-router-dom";

import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";
import { Dashboard } from "../pages/Dashboard";
import { useAuth } from "../hooks/auth";
import { ForgotPassword } from "../pages/ForgotPassword";
import { ResetPassword } from "../pages/ResetPassword";
import { Profile } from "../pages/Profile";
import { Task } from "../pages/Task";

const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={!user ? <SignIn /> : <Navigate to="/dashboard" />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot_password" element={<ForgotPassword />} />
      <Route path="/reset_password" element={<ResetPassword />} />

      <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
      <Route path="/task" element={user ? <Task /> : <Navigate to="/" />} />
      <Route path="/task/:id" element={user ? <Task /> : <Navigate to="/" />} />
      <Route path="/profile" element={user ? <Profile /> : <Navigate to="/" />} />

      <Route path="*" element={<Navigate to={`${user ? "/dashboard" : "/"}`} />} />
    </Routes>
  );
};

export default AppRoutes;
