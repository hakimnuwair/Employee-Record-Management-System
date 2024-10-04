import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setIsLoggedIn }) => {
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    // Perform logout actions when component mounts
    console.log("useeffect started");
    handleLogout();
    console.log("useeffect end");
  }, []);

  const handleLogout = () => {
    // Update authentication state and redirect to login page
    sessionStorage.removeItem("login");
    // localStorage.removeItem('isLoggedIn'); // Remove authentication token from local storage
    navigate('/'); // Redirect to login page
  };

  // No need to return anything if the component doesn't render anything
  return null;
};

export default Logout;
