// Summary.js

import React, { useState, useEffect } from 'react';
import Header from './Header';
import "./styles/Summary.css";

const Summary = () => {
    const [summaryData, setSummaryData] = useState(null);

    useEffect(() => {
        // Simulating fetching data from the server/database
        // Replace this with your actual fetch logic once you connect to the database
        setTimeout(() => {
            const fakeData = {
                totalMembers: 0,
                currentMembers: 0,
                pastMembers: 0,
                removedMembers: 0
            };
            setSummaryData(fakeData);
        }, 1000);
    }, []);

    return (
        <>
            <Header />
            <div className="admin-summary-page">
                <h2>Admin Summary</h2>
                {summaryData ? (
                    <div className="summary-container">
                        <div className="summary-card">
                            <h3>Total Members</h3>
                            <p>{summaryData.totalMembers}</p>
                        </div>
                        <div className="summary-card">
                            <h3>Current Members</h3>
                            <p>{summaryData.currentMembers}</p>
                        </div>
                        <div className="summary-card">
                            <h3>Past Members</h3>
                            <p>{summaryData.pastMembers}</p>
                        </div>
                        <div className="summary-card">
                            <h3>Removed Members</h3>
                            <p>{summaryData.removedMembers}</p>
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </>
    );
};

export default Summary;
