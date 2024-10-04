import React, { useEffect, useState } from "react";
import "./styles/SideSummary.css";
import axios from "axios";

export default function SideSummary({isMemberAdded , isMemberDeleted, showTotalMembersList}) {
  const [totalMembersLoading, setTotalMembersLoading] = useState(true);
  const [totalMembers, setTotalMembers] = useState(null);
  const [totalMembersError, setTotalMembersError] = useState(false);

  const [completedMembersLoading,setCompletedMembersLoading]= useState(true);
  const [completedMembers,setCompletedMembers] = useState(null);
  const [completedMembersError,setCompletedMembersError]= useState(false);

  const [activeMembersLoading,setActiveMembersLoading] =useState(true);
  const [activeMembers,setActiveMembers] = useState(null);
  const [activeMembersError,setActiveMembersError] = useState(false);

  const [removedMembers, setRemovedMembers] = useState(null);
  const [removedMembersLoading, setRemovedMembersLoading] = useState(true);
  const [removedMembersError, setRemovedMembersError] = useState(false);

  useEffect(() => {
    console.log("sideSummary useeffect memberAddedProp:",isMemberAdded);
    console.log("sideSummary useeffect for deletedMember prop:",isMemberDeleted);
    const fetchActiveMembers = async () =>{
      try{
        const response = await axios.get("http://localhost:3001/member/activemember");
        if(response.status === 200){
          setActiveMembers(response.data.activeMembers);
          setActiveMembersLoading(false);
        }else{
          setActiveMembersError(true);
          setActiveMembersLoading(false);
        }
      }catch(error){
        setActiveMembersError(true);
        setActiveMembersLoading(false);
      }
    }



    const fetchCompletedMembers = async ()=>{
      try{
        setCompletedMembersLoading(true);
        console.log("fetching completed members");
        const response =await axios.get("http://localhost:3001/member/completedmembers");
        console.log("after response",response);
        if(response.status === 200){
          setCompletedMembers(response.data.completedMembers.length);
          setCompletedMembersLoading(false);
        }else{
          setCompletedMembersError(true);
          setCompletedMembersLoading(false);
        }
      }
      catch(error){
        setCompletedMembersError(true);
        setCompletedMembersLoading(false);
      }

    } 

    const getTotalMembers = async () => {
      try {
        setTotalMembersLoading(true);
        const response = await axios.get("http://localhost:3001/member/totalmembers");
        if (response.status === 200) {
          setTotalMembers(response.data.totalMembers.length);
          setTotalMembersLoading(false);
        } else {
            setTotalMembersError(true);
            setTotalMembersLoading(false);
        }
      } catch (error) {
        setTotalMembersError(true);
      }
    };

    const fetchRemovedMembers = async () => {
      try{
        setRemovedMembersLoading(true);
        const response = await axios.get("http://localhost:3001/member/removedmembers");
        if(response.status === 200){
          setRemovedMembers(response.data.removedMembers.length);
          setRemovedMembersLoading(false);
        }else{
          setRemovedMembersLoading(false);
          setRemovedMembersError(true);
        }
      }catch(error){
        setRemovedMembersError(true);
      }
    }
    getTotalMembers();
    fetchActiveMembers();
    fetchCompletedMembers();
    fetchRemovedMembers();
  }, [isMemberAdded,isMemberDeleted]);


  function handleViewTotalMembers (listName){
    console.log("inside");
    showTotalMembersList(listName);
  }


  return (
    <>
      <div className="side-summary-section py-5">
        <div
          className="row d-flex flex-column justify-content-center align-items-center"
          style={{ gap: "20px", width: "100%" }}
        >
          {totalMembersLoading ? (
            <div
            className="side-summary-box col-10"
          >
            <h3>Total Membership</h3>
            <p>Loading data..</p>
        </div>
          ) : totalMembersError ? (
            <div
              className="side-summary-box col-10 "
            >
            <h3>Total Membership</h3>
            <p>Error Loading Data</p>
            </div>
          ) : (
            <>
            <div
              className="side-summary-box col-10 "
            >
              <h3>Total Membership</h3>
              <p style={{fontWeight: "600", color: "",fontSize: "2rem"}}>{totalMembers}</p>
              <p>Total Members Registered</p>
              <button className="side-summary-btn" onClick={() => handleViewTotalMembers("totalMembers")}>View List</button>
            </div>
            </>
          )}
          <div
          className="row d-flex flex-column justify-content-center align-items-center"
          style={{ gap: "20px", width: "100%" }}
        >
          {activeMembersLoading ? (
            <div
            className="side-summary-box col-10"
          >
            <h3>Active Membership</h3>
            <p>Loading data..</p>
        </div>
          ) : activeMembersError ? (
            <div
              className="side-summary-box col-10 "
            >
            <h3>Active Membership</h3>
            <p>Error Loading Data</p>
            </div>
          ) : (
            <div
              className="side-summary-box col-10 "
            >
              <h3>Active Membership</h3>
              <p style={{fontWeight: "600", color: "",fontSize: "2rem"}}>{activeMembers}</p>
              <p>Members Currently Active</p>
              <button className="side-summary-btn" onClick={() => handleViewTotalMembers("activeMembers")}>View List</button>
            </div>
          )}
          </div>
          {completedMembersLoading ? (
             <div
             className="side-summary-box col-10"
           >
             <h3>Completed Membership</h3>
             <p>Loading data..</p>
         </div>
          ) : completedMembersError ? (
            <div
             className="side-summary-box col-10"
           >
             <h3>Completed Membership</h3>
             <p>Error Loading Data</p>
         </div>
          ): (
            <div
            className="side-summary-box col-10 "
          >
            <h3>Completed Membership</h3>
            <p style={{fontWeight: "600", color: "",fontSize: "2rem"}}>{completedMembers}</p>
            <p>Successful Completion</p>
            <button className="side-summary-btn" onClick={() => handleViewTotalMembers("completedMembers")}>View List</button>
          </div>
          )}
          {removedMembersLoading ? (
             <div
             className="side-summary-box col-10"
           >
             <h3>Removed Membership</h3>
             <p>Loading data..</p>
         </div>
          ) : removedMembersError ? (
            <div
             className="side-summary-box col-10"
           >
             <h3>Removed Membership</h3>
             <p>Error Loading Data</p>
         </div>
          ): (
            <div
            className="side-summary-box col-10 "
          >
            <h3>Removed Members</h3>
            <p style={{fontWeight: "600", color: "",fontSize: "2rem"}}>{removedMembers}</p>
            <p>Removed Members</p>
            <button className="side-summary-btn" onClick={() => handleViewTotalMembers("removedMembers")}>View List</button>
          </div>
          )}
        </div>
      </div>
    </>
  );
}
