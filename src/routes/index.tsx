import React from 'react';

import { Routes, Route, Navigate } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />

      <Route path="/signup" element={<SignUp />} />

      <Route path="*" element={<Navigate to={`/`} />} />
    </Routes>
  );
};

export default AppRoutes;
