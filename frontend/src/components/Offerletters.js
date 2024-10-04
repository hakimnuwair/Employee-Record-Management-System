import React, { useState } from "react";
import axios from "axios";
import "./styles/Offerletters.css";
import OfferlettersTable from "./OfferlettersTable";

export default function Offerletters({updatingFunction, pdfValue}) {
  const [refId, setRefId] = useState("");
  const [name, setName] = useState("");
  const [pdfUpdated, setPdfUpdated] = useState('initial');

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [pdfContent, setPdfContent] = useState("");

  const handleRefChange = (e) => {
    setRefId(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("refId", refId);
    formData.append("name", name);

    try {
      const response = await axios.post(
        "http://localhost:3001/pdf/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 404) {
        alert(response.data.message);
      }
      if(response.status === 200){const pdfResponse = await axios.get(response.data.url, {
        responseType: "arraybuffer",
      });
      const pdfBlob = new Blob([pdfResponse.data], { type: "application/pdf" });
      const pdfUrl = URL.createObjectURL(pdfBlob);
      setPdfContent(pdfUrl);
      setPdfUpdated(pdfUrl);
      setUploading(false);
      }
      
    } catch (error) {
      setUploading(false);
      console.error("Error uploading file:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    // <div>
    // <h1>Upload PDF to Cloudinary</h1>
    // <input type="file" accept=".pdf" onChange={handleFileChange} />
    // <button onClick={handleUpload} disabled={uploading || !selectedFile}>
    //   {uploading ? 'Uploading...' : 'Upload'}
    // </button>

    <div className="offerletters-container">
      <h2 className="mb-3">Offerletters</h2>
      <div
        className="content-container container p-5 mb-5"
        style={{ height: "" }}
      >
        <form className="upload-pdf-form row gap-4">
          <div className="col-md-5">
            <label>Enter Reference ID Of Member: </label>
            <input
              name="refId"
              value={refId}
              className="upload-img"
              type="text"
              placeholder="Enter Ref"
              onChange={handleRefChange}
              required
            ></input>
          </div>
          <div className="col-md-5">
            <label>Enter Name; </label>
            <input
              name="name"
              value={name}
              className="upload-img"
              type="text"
              placeholder="Enter Name"
              onChange={handleNameChange}
              required
            ></input>
          </div>
          <div className="col-md-5">
            <label> Enter Offerletter PDF:</label>
            <input type="file" accept=".pdf" onChange={handleFileChange} />
          </div>
          <button
            className="img-upload-btn btn btn-primary col-md-2"
            onClick={handleUpload}
            disabled={uploading || !selectedFile}
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
          {pdfContent && (
          <div className="successful-upload">
            <p>PDF uploaded successfully!</p>
            <p>
              View PDF:{" "}
              <a href={pdfContent} target="_blank" rel="noopener noreferrer">
                Open
              </a>
            </p>
          </div>
        )}
        </form>
      </div>
      <div
        className="content-container container p-5"
        style={{ height: "" }}
      >
        <OfferlettersTable  pdfValue = {pdfUpdated}/>
      </div>
    </div>
  );
}

// const [refId, setRefId] = useState('');
// const [selectedImg , setSelectedImg] = useState(null);
// const data = {nuwair : "123"}

// const [uploadLoading, setUploadLoading] = useState(false);
// const [uploadPdf, setUploadPdf] = useState(null);
// const [uploadError, setUploadError] = useState(null);

// const handleChange = async (e) =>{
//    setRefId(e.target.value)
// }

// const handlePdfChange = async (e) => {
//   setSelectedImg(e.target.files[0]);
// }

// const handleSubmit = async () => {
//   try {
//     const formData = new FormData();
//     formData.append("refId", refId);
//     formData.append("selectedImg", selectedImg);

//     const config = {
//       headers: {
//         'Content-Type': 'multipart/form-data' // Set the content type to multipart/form-data
//       }
//     };

//     const response = await axios.post("http://localhost:3001/upload-profile-pic", formData, config);
//     console.log(response.data);
//   } catch (error) {
//     console.error("Error uploading image:", error);
//   }
// };

// return (
//   <>
//     <form method="POST" action="http://localhost:3001/upload-profile-pic" enctype="multipart/form-data">
//     <div>
//         <label>Select your profile picture:</label>
//         <input type="file" name="profile_pic" />
//     </div>
//     <div>
//         <input type="submit" name="btn_upload_profile_pic" value="Upload" />
//     </div>
// </form>

{
  /* <div className="offerletters-container">
            <h2 className="mb-3">Offerletters</h2>
            <h4>{refId}</h4>
            <div className="content-container container p-5" style={{height: "500px"}}>
                <form className="upload-pdf-form row">
                    <div className='col-md-5'>
                        <label >Enter Reference ID Of Member: </label>
                        <input name='refId' value={refId} className='upload-img' type='text' placeholder='Enter Ref' onChange={handleChange}></input>
                        </div>
               <div className='col-md-5'> 
                    <label> Enter Offerletter PDF:</label>
                    <input type='file' onChange={handlePdfChange}/>
                </div>
                <button className='img-upload-btn btn btn-primary col-md-2' onClick={handleSubmit}>Submit</button>
                {uploadLoading ?
                 <h4>...uploading</h4> :
                 uploadError ?
                 <h4>{uploadError}</h4> :
                 null  
                 }
                </form>
            </div>
            </div> */
}
//   </>
// )
