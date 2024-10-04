import React from 'react'
import { useState } from 'react';
import "./styles/Header.css"
import Form from "./Form.js"
import SideSummary from "./SideSummary.js";
import "./styles/SideBar.css"
import MemberList from './MemberList.js';
import navAddIcon from "../components/img/icons8-add-100 (1).png"
import navListIcon from "../components/img/icons8-list-60.png"
import TotalMembers from './TotalMembers.js';
import CompletedMembers from './CompletedMembers.js';
import RemovedMembers from './RemovedMembers.js';
import Offerletters from './Offerletters.js'
import navPDFIcon from './img/icons8-pdf-64.png'

export default function Sidebar() {
  const [addMember,setAddMember] = useState(true);
  const [memberList,setMemberList] = useState('');
  const [memberAdded, setMemberAdded] = useState("initial value");
  const [memberUpdated, setMemberUpdated] = useState("initial value");
  const [isActive, setIsActive] = useState('addMember');
 

  

  const handleNavClick = async (itemName) => {
    setIsActive(itemName);
    setAddMember(false);
    setMemberList(itemName);
  }

  const handleAddMember =() =>{
    setIsActive("addMember");
    if(!addMember){
      setAddMember(true);
      setMemberList('');
    }
  }
  
  const handleMemberList = () =>{
      setIsActive("membersList");
      setMemberList('activeMembers');
      setAddMember(false);
  }
  
  const isMemberAdded = (addedMember) => {
        setMemberAdded(addedMember);
};

const isMemberUpdated = (updatedMember) => {
  setMemberUpdated(updatedMember);
};



const showTotalMembersList = (name) =>{
  console.log("outside",name)
  setMemberList(name);
  setAddMember(false);
}



  return (
    <>
    <div className="grid-col-3">
            <div className="sidebar">
                {/* <ul className="d-flex flex-column justify-content-center align-items-start" style={{gap: "15px"}}>
                    <li >
                    <a className='nav-item' href='#' onClick={handleAddMember}>
                      <img src={navAddIcon} style={{height: "16px"}} />
                      <span className='fs-4'>Add Member</span>
                      </a>
                      </li>
                    <li>
                    <a className='nav-item' href='#' onClick={handleMemberList}>
                    <img src={navListIcon} style={{height: "16px"}} />
                     <span className='fs-4'>Members List</span>
                     </a>
                      </li>
                </ul> */}

                <div className='sidebar-items'>
                  <div className='sidebar-item'>
                  <a className={isActive === "addMember" ? "nav-item active-item" : "nav-item"} href='#' onClick={handleAddMember}>
                      <img src={navAddIcon} style={{height: "16px"}} />
                      <span className='fs-4'>Add Member</span>
                      </a>
                  </div>
                  <div className='sidebar-item'>
                  <a className={isActive === "membersList" ? "nav-item active-item" : "nav-item"} href='#' onClick={handleMemberList}>
                    <img src={navListIcon} style={{color: isActive === "membersList"  ? "#fff" : "#532443", height: "16px"}} />
                     <span className='fs-4'>Members List</span>
                     </a>
                  </div>
                  <div className='sidebar-item'>
                  <a className={isActive === "offerletters" ? "nav-item active-item" : "nav-item"} href='#' onClick={()=>handleNavClick('offerletters')}>
                    <img src={navPDFIcon} style={{color: isActive === "offerletters"  ? "#fff" : "#532443", height: "16px"}} />
                     <span className='fs-4'>Offerletters</span>
                     </a>
                  </div>
                </div>
            </div>
            <div className="main-content">
                {addMember ? <Form addUpdatingFunction = {isMemberAdded} /> : null}
                {memberList === 'activeMembers' ? <MemberList updatingFunction = {isMemberUpdated}/> 
                : memberList === 'totalMembers' ? <TotalMembers />
                : memberList === 'completedMembers' ? <CompletedMembers />
                : memberList === 'removedMembers' ? <RemovedMembers />
                : memberList === 'offerletters' ? <Offerletters />
                : null
              }
            </div>
            <div className="side-summary">
            <SideSummary showTotalMembersList = {showTotalMembersList} isMemberAdded = {memberAdded} isMemberDeleted = {isMemberUpdated}/>
            </div>
    </div>
    </>
  )
}
