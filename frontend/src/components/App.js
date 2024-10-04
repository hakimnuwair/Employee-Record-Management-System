import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './Header';
import Form from './Form';
import Remove from './Remove';
import MemberList from './MemberList';
import SearchMember from './SearchMember';
import Logout from './Logout';
import Login from './Login';
import AuthGuard from './AuthGuard'; // Import AuthGuard
import Summary from './Summary';
import "./styles/Main.css"

function App() {
  return (
    <div className="wrapper">
      <div className="wrapper-container">
      <Router>
        <Routes>
           <Route
           path="/"
           element={<Login />}
         />
          <Route
            path="/addmember"
            element={<AuthGuard Component={Header}  />}
          />
          <Route
            path="/removemember"
            element={<AuthGuard Component={Remove} />}
          />
          <Route
            path="/memberslist"
            element={<AuthGuard Component={MemberList}  />}
          />
          <Route
            path="/searchmember"
            element={<AuthGuard Component={SearchMember}  />}
          />
          <Route
            path="/summary"
            element={<AuthGuard Component={Summary}  />}
          />
          <Route
            path="/logout"
            element={<Logout />}
          />
        </Routes>
      </Router>
    </div>
    </div>
  );
}

export default App;
