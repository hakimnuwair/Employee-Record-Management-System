import React, { useEffect, useState } from "react";
import "./styles/OfferlettersTable.css";
import axios from "axios";

export default function OfferlettersTable({pdfValue}) {
  const [members, setMembers] = useState([]);
  const [membersLoading, setMembersLoading] = useState(false);
  const [membersError, setMembersError] = useState(false);


  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfContent, setPdfContent] = useState("");
  const [pdfError, setPdfError] = useState(null);


  useEffect(() => {
    const fetchMembers = async () => {
      setMembersLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:3001/pdf/membersdetails"
        );
        console.log(response);
        if (response.status === 200) {
          setMembers(response.data.members);
          setMembersLoading(false);
          setMembersError(false);
        }
      } catch (error) {
        console.error(error);
        setMembersLoading(false);
        setMembersError("Error Loading Data");
      }
    };

    fetchMembers();
  }, [pdfValue]);

  const handleFetchPdf = async (refId) => {
    console.log("ref",refId)
    try {

      const response = await axios.get(`http://localhost:3001/pdf/pdfurl/${refId}`);
      if (response.status === 200) {
        const pdfResponse = await axios.get(response.data.url, {
          responseType: "arraybuffer",
        });
        const pdfBlob = new Blob([pdfResponse.data], {
          type: "application/pdf",
        });
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setPdfContent(pdfUrl);
        window.open(pdfUrl, "_blank");
      }
    } catch (error) {
      console.error(error);
      return;
    }
  };
  console.log("members", members);

  return (
    <div className="offerletters-table-section">
      {membersLoading ? (
        <h5>loading...</h5>
      ) : membersError ? (
        <h5>Error Loading Table Data, Try Again Later</h5>
      ) : null}
      <table className="offerletters-table" width="100%">
        <colgroup>
          <col span="1" width="30%"></col>
          <col span="1" width="50%"></col>
          <col span="1" width="20%"></col>
        </colgroup>
        <thead>
          <tr>
            <th>Reference_ID</th>
            <th>Name</th>
            <th>Offerletter</th>
          </tr>
        </thead>
        <tbody>
          {members
            ? members.map((member) => (
                <tr key={member.ref}>
                  <td>{member.ref}</td>
                  <td>{member.username}</td>
                  <td>
                    <button className="offerletter-table-btn btn btn-primary" onClick={()=>handleFetchPdf(member.ref)}>
                      View Offerletter
                    </button>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
}
