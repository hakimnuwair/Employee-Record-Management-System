import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/MemberList.css'; // Import CSS file for styling


const MemberList = ({updatingFunction}) => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [deletigMembersLoading, setDeletingMembersLoading] = useState(false);
    const [deletingMembersError, setDeletingMembersError] = useState(false);
    const [deletingMembersSuccess, setDeletingMembersSuccess] = useState(false);

    const [completedMembersLoading, setCompletedMembersLoading] = useState(false);
    const [completedMembersError, setCompletedMembersError] = useState(false);
    const [completedMembersSuccess, setCompletedMembersSuccess] = useState(false);

    useEffect(() => {
        // Fetch members from the database
        const fetchMembers = async () => {
            try {
                const response = await axios.get("http://localhost:3001/member/list");
                console.log(response.data);
                setMembers(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching members:", error);
                setError("Error fetching members. Please try again later.");
                setLoading(false);
            }
        };
        fetchMembers();
    }, []);


    const handleDeleteMember = async (ref) => {
        try {
            // Send the delete request
            setDeletingMembersLoading(true);
            const response = await axios.delete(`http://localhost:3001/member/delete/${ref}`);
            console.log("response");
            console.log(response);
            if(response.status === 200){
                console.log("after response",response);
                updatingFunction(ref);
                // If the request is successful, update the state to remove the deleted member
                setDeletingMembersError(false);
                setDeletingMembersLoading(false);
                setDeletingMembersSuccess(true);
                setMembers(prevMembers => prevMembers.filter(member => member.ref !== ref));
            }
        } catch (error) {
            // Log any errors that occur during the delete request
            setDeletingMembersLoading(false);
            setDeletingMembersError(true);
            console.error("Error deleting member:", error);
        }
    };

    const handleCompleteMember = async (thisRef) => {
        console.log(thisRef);
        try{
            setCompletedMembersLoading(true);
            const thisMember = members.find(member => member.ref === thisRef);
        const response = await axios.patch("http://localhost:3001/member/completed",thisMember);
        if(response.status === 200){
            updatingFunction(thisRef);
            setCompletedMembersLoading(false);
            setCompletedMembersError(false);
            setCompletedMembersSuccess(true);
        }else{
            setCompletedMembersLoading(false);
            setCompletedMembersError(true);
        }
        } catch(error){
            setCompletedMembersLoading(false);
            setCompletedMembersError(true);
        }
        
    }
    

    return (
        <>
        <div className="member-list-container">
            <h2 className="mb-3">Member List / Active Members</h2>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className="table-container row p-5">
                <table className="member-table" style={{width: "100%"}}>
                    <thead>
                        <tr>
                            <th>REF</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Position</th>
                            <th>Start_Date</th>
                            <th>Duration</th>
                            <th className='text-center' colSpan="2" >Actions</th>
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
                                {deletigMembersLoading ? 
                                (
                                <td>
                                    <button className='btn btn-primary' onClick={() => handleDeleteMember(member.ref)}>Loading..</button>
                                </td>
                                ) :
                                deletingMembersError ?
                                (
                                    <td>
                                    <button className='btn btn-primary' onClick={() => handleDeleteMember(member.ref)}>Try Again</button>
                                </td>
                                ) :
                                (
                                    <td>
                                    <button className='btn btn-primary' onClick={() => handleDeleteMember(member.ref)}>Delete</button>
                                </td>
                                )
                                }
                                {completedMembersLoading ? (
                                    <td>
                                    <button className='btn btn-primary'  onClick={() => handleCompleteMember(member.ref)}>Loading..</button>
                                </td>) : completedMembersError ? (
                                    <td>
                                    <button className='btn btn-primary'  onClick={() => handleCompleteMember(member.ref)}>Try Again</button>
                                </td>
                                ) :
                                 (<td>
                                    <button className='btn btn-primary' onClick={() => handleCompleteMember(member.ref)}>Completed</button>
                                </td>
                                )}

                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            )}
        </div>
        </>
    );
};

export default MemberList;
