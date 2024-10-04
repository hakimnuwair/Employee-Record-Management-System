import axios from 'axios';
import React, { useState , useEffect } from 'react'
import "./styles/CompletedMembers.css";


export const CompletedMembers = () => {
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState([]);
  const [error, setError] = useState(false);


useEffect( () => {
  const fetchCompletedMembers = async () => {
    try{
      setLoading(true);
    const response = await axios.get("http://localhost:3001/member/completedmembers");
    console.log(response.data.completedMembers);
    if(response.status === 200){
      setMembers(response.data.completedMembers);
      setLoading(false);
    }else{
      setLoading(false);
      setError(true);
    }
  } catch (err) {
    setLoading(false);
    setError(true);
    throw err;
  }
  }
  fetchCompletedMembers();
},[])
  
  return(
    <>
        <div className="completed-members-list-container">
            <h2 className="mb-3">Completed Members</h2>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className="completed-members-table-container row p-5">
                <table className="completed-members-table" style={{width: "100%"}}>
                    <thead>
                        <tr>
                            <th>REF</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Position</th>
                            <th>Start_Date</th>
                            <th>Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        {members.map(member => (
                            <tr key={member.ref}>
                                <td>{member.ref}</td>
                                <td>{member.name}</td>
                                <td>{member.address}</td>
                                <td>{member.position}</td>
                                <td>{member.start_date}</td>
                                <td>{member.duration}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            )}
        </div>
    </>
  );
} 

export default CompletedMembers;