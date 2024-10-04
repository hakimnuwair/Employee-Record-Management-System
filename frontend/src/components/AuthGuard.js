
// AuthGuard.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthGuard = ({ Component }) => {
  const isLoggedIn = sessionStorage.getItem("login") === "true"; // Compare to "true" as string

  return isLoggedIn ? <Component /> : <Navigate to="/" />;
};

export default AuthGuard;
