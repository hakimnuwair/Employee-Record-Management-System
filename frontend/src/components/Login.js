  import React, { useState , useEffect } from 'react';
  import './styles/Login.css'; // Import CSS file for styling
  import axios from 'axios';
  import { useNavigate } from 'react-router-dom'; 
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

  const Login = ({ setIsLoggedIn }) => {
      
      const navigate = useNavigate(); // Initialize navigate function
      const [username, setUsername] = useState('');
      const [password, setPassword] = useState('');

    
    // useEffect(() => {
    //   // Check if user is already logged in
    //   // const loggedInUser = localStorage.getItem('isLoggedIn');
    //   if (loggedInUser) {
    //     setIsLoggedIn(true); // Set isLoggedIn state
    //     // localStorage.setItem('isLoggedIn', true);
    //     navigate('/addmember'); // Redirect to dashboard if already logged in
    //   }
    // }, [navigate, setIsLoggedIn]);
     
    const handleLogin = async (event) => {
      
      // Here you can implement your login logic
      event.preventDefault();

      if (!username || !password) {
          alert('Please enter both username and password');
          return;
      }

      try {
        // Make the login request
        console.log("login fun");
        const response = await axios.post("http://localhost:3001/admin/login", { username, password });
        console.log("after response login fun",response);
    
        // Check the response status
        if (response.status === 200 && response.data.success) {
            // Redirect the user to the dashboard
            sessionStorage.setItem("login", true);
            // setIsLoggedIn(true);
            navigate('/addmember'); // Change the URL as needed
        } else {
                alert(response.data.message);
            }
    } catch (error) {
            console.error("Login error:", error);
            alert("An error occurred while logging in. Please try again later.");
        }
    }
      
    return (
      <div><ToastContainer position="top-center" />
      {/* <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div> */}

      <div className="container-login">
          <div className="login-content">
            <h2 className="login-title">Login</h2>
            <form className="login-form" onSubmit={handleLogin}>
              <div className="form-label">
              <label className="label"  htmlFor="username">Username:</label>
              <input
               type="text"
               id="username"
               value={username}
               onChange={(e) => setUsername(e.target.value)}
               required
             />
              </div>
              <div className="form-label">
              <label className="label" htmlFor="password">Password:</label><br/>
              <input
               type="password"
               id="password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               required
             />
              </div>
              <button className='btn btn-primary submit-btn' type="submit">Login</button>
            </form>
          </div>
      </div>
      </div>
    );
  };

  export default Login;
