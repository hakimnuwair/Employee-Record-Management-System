import React from "react";
import { Link } from "react-router-dom";
import Form from "./Form";
import logo from "./img/logo.png";
import "./styles/Main.css";
import "./styles/Header.css";
import bellIcon from "./img/icons8-notification-100.png";
import profileImg from "./img/icons8-person-64.png";
import Sidebar from "./Sidebar";

const Header = () => {
  return (
    <>
        <div className="grid-col-3 mb-5 pt-3">
          <div className="logo-class align-self-center">
            {/* <img src={logo} width= "100px"/> */}
            <h2>Code World</h2>
          </div>
          
            <div className="head-nav-title align-self-center">
              <h3>Admin Dashboard</h3>
            </div> 
            <div
              className="head-nav-content d-flex align-self-center"
              style={{ gap: "8px" }}
            >
              <input
                className="form-control form-control-sm input-bar align-self-center"
                placeholder="Search here"
              ></input>
              <img
                className="align-self-center"
                src={bellIcon}
                style={{ width: "24px", height: "24px ",backgroundColor: "white", padding: "3px", borderRadius: "100px" }}
              />
              <img
                src={profileImg}
                className="align-self-center"
                style={{ width: "24px", height: "24px ",backgroundColor: "white", padding: "3px", borderRadius: "100px" }}
              />
            </div>    
          </div>
       <Sidebar />
    </>
  );
};

export default Header;
