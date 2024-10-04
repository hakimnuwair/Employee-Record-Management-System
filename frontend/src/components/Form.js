import React, { useState } from 'react';
import "./styles/Form.css"; // Import CSS file for styling
import { jsPDF } from 'jspdf';
import axios from 'axios';
import logoImg from './img/logo.png'; // Adjust the path based on the location of your Form.js file
import emailIconImage from './img/email (3).png'
import phoneIconImage from './img/mobile.png'
import addressIconImage from './img/pointer.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';

const Form = ({addUpdatingFunction}) => {
    const [formData, setFormData] = useState({
        name: '',
        area: '',
        address: '',
        type: '',
        position: '',
        duration: '',
        startDate: '',
        acceptDate: '',
        issueDate: '',
        offerParagraph: '',
        benefits: ['', '', '', '', '', ''], // Array for internship benefits
        responsibilities: ['', '', '', '', '', ''] // Array for internship responsibilities
    });
    

    // // useEffect(() => {
    // //     // Calculate ID based on name when name changes
    // //     const generateIdFromName = () => {
    // //         const generatedId = formData.name.toLowerCase().replace(/\s/g, '_');
    // //         setFormData((prevFormData) => ({
    // //             ...prevFormData,
    // //             id: generatedId
    // //         }));
    // //     };

    //     // generateIdFromName();
    // }, [formData.name]);

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData({
    //         ...formData,
    //         [name]: value
    //     });
    // };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleBenefitChange = (index, value) => {
        const newBenefits = [...formData.benefits];
        newBenefits[index] = value;
        setFormData(prevFormData => ({
            ...prevFormData,
            benefits: newBenefits
        }));
    };
    
    const handleResponsibilityChange = (index, value) => {
        const newResponsibilities = [...formData.responsibilities];
        newResponsibilities[index] = value;
        setFormData(prevFormData => ({
            ...prevFormData,
            responsibilities: newResponsibilities
        }));
    };

    // const handleBenefitChange = (index, value) => {
    //     const newBenefits = [...formData.benefits];
    //     newBenefits[index] = value;
    //     setFormData({ ...formData, benefits: newBenefits });
    // };

    // const handleResponsibilityChange = (index, value) => {
    //     const newResponsibilities = [...formData.responsibilities];
    //     newResponsibilities[index] = value;
    //     setFormData({ ...formData, responsibilities: newResponsibilities });
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/member/addmember', formData);

            const { referenceId, qrCode } = response.data;
            console.log("change function calling with", referenceId);
            
            addUpdatingFunction(referenceId);

            // Generate and download PDF with the QR code data
            generatePDF(referenceId, qrCode);
    
            
            toast.success('Member added successfully');
            setTimeout(() => {
                setFormData({
                    name: '',
                    area: '',
                    address: '',
                    type: '',
                    position: '',
                    duration: '',
                    startDate: '',
                    acceptDate: '',
                    issueDate: '',
                    offerParagraph: '',
                    benefits: ['', '', '', '', '', ''], // Array for internship benefits
                    responsibilities: ['', '', '', '', '', ''] // Array for internship responsibilities
                });
            }, 5000);
        } catch (error) {
            console.error('Error sending form data:', error.message);
        }
    };

    const generatePDF = async (referenceId,qrCode) => {
        // Create a new jsPDF instance
        const doc = new jsPDF('p', 'pt', 'letter');

        // Header Section
        // Logo
        const logoX = 40;
        const logoY = 10; // Move the logo up
        const logoWidth = 180;
        const logoHeight = 60;
        doc.addImage(logoImg, 'PNG', logoX, logoY, logoWidth, logoHeight); // Logo

        // Current date (issueDate)
        const issueDate = new Date(formData.issueDate);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const dateString = issueDate.toLocaleDateString('en-US', options);
        const dateTextWidth = doc.getStringUnitWidth(dateString) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        const dateX = doc.internal.pageSize.width - 40 - dateTextWidth; // Date at right bottom corner
        const dateY = logoY + logoHeight;

        // Save the graphics state to apply bold font
        doc.saveGraphicsState();
        doc.setFont("helvetica", "bold");

        // Draw "DATE:" text and the actual date
        doc.setFontSize(10); // Set smaller font size for "DATE:"
        doc.text('DATE: ' + dateString, dateX, dateY);

        // Restore the graphics state to revert to normal font
        doc.restoreGraphicsState();

        // Blue line to separate header and main section
        doc.setDrawColor(0, 0, 255); // Blue color for line
        doc.line(40, logoY + logoHeight + 10, doc.internal.pageSize.width - 40, logoY + logoHeight + 10);

        // Title
        var title;
        if (formData.type === 'Internship')
            title = 'Internship Offer Letter';
        else
            title = 'Job Offer Letter';

        const titleY = logoY + logoHeight + 40;
        doc.setFontSize(21);
        doc.setTextColor(0, 0, 0);
        doc.saveGraphicsState();
        doc.setFont("helvetica", "bold");
        doc.text(title, doc.internal.pageSize.width / 2, titleY, { align: 'center' });
        doc.restoreGraphicsState();


        // Main Section
        // const mainSectionY = titleY + 35;
        // doc.setFontSize(10);
        // doc.setLineHeightFactor(1.2); // Set line spacing factor

        // doc.text(`CIN: U72200PN2021PTC202682`, 40, mainSectionY);
        // doc.text(`Ref: ${referenceId}`, 40, mainSectionY + 18);
        // doc.text(`To:`, 40, mainSectionY + 48);
        // doc.text(`${formData.name},`, 40, mainSectionY + 68);
        // doc.text(`${formData.area}`,40,mainSectionY + 82)
        // doc.text(`${formData.address}`, 40, mainSectionY + 96);
        // doc.text(`Dear ${formData.name},`, 40, mainSectionY + 118);

        // Main Section
        const mainSectionY = titleY + 25;
        doc.setFont("helvetica", "normal"); // Set font to Lucida Sans Unicode
        doc.setFontSize(11);
        doc.setLineHeightFactor(1.2); // Set line spacing factor

        doc.text(`CIN: U72200PN2021PTC202682`, 40, mainSectionY);
        doc.text(`Ref: ${referenceId}`, 40, mainSectionY + 16);
        doc.text(`To:`, 40, mainSectionY + 41);
        doc.text(`${formData.name},`, 40, mainSectionY + 56);
        doc.text(`${formData.area},`, 40, mainSectionY + 69)
        doc.text(`${formData.address}.`, 40, mainSectionY + 81);
        doc.text(`Dear ${formData.name},`, 40, mainSectionY + 106);
        var positionTitle;
        var durationTitle;
        var benefitTitle;
        var respTitle;
        var paraType;
        if (formData.type === 'Internship') {
            paraType = 'an Internship position'
            positionTitle = 'Internship Position'
            durationTitle = 'Internship Duration'
            benefitTitle = 'Internship Benefits';
            respTitle = 'Internship Responsibilities';
        } else {
            paraType = 'a Job'
            positionTitle = 'Job Position'
            durationTitle = 'Job Duration'
            benefitTitle = 'Job Benefits';
            respTitle = 'Job Responsibilities';
        }

        // // We are delighted paragraph
        //  const paragraph = `We are delighted to offer you ${paraType} at Code World Infotech Private Limited as a ${formData.position}.  We believe that your skills and enthusiasm will greatly contribute to our projects, and we are excited to welcome you to our team.`;
        // // const paragraph = formData.offerParagraph;
        // const lines = doc.splitTextToSize(paragraph, doc.internal.pageSize.width - 80);
        // doc.text(40, mainSectionY + 143, lines);

        // // Adjusted gap for the rest of the paragraphs
        // let yPos = mainSectionY + 143 + (lines.length * 15) + 10;

        // // Reduce line space between Internship Position and Start Date


        // doc.text(`${positionTitle} ${formData.position}`, 40, yPos);
        // doc.text(`${durationTitle} ${formData.duration}`, 40, yPos + 14);
        // doc.text(`Start Date: ${formData.startDate}`, 40, yPos + 28); // Adjusted line space
        var paragraph;
        if (formData.offerParagraph) {
            paragraph = formData.offerParagraph;
        }
        else {
            // We are delighted paragraph
            paragraph = `We are delighted to offer you ${paraType} at Code World Infotech Private Limited as a ${formData.position}.  We believe that your skills and enthusiasm will greatly contribute to our projects, and we are excited to welcome you to our team.`;
        }

        // const paragraph = formData.offerParagraph;
        const lines = doc.splitTextToSize(paragraph, doc.internal.pageSize.width - 80);
        doc.text(40, mainSectionY + 126, lines);

        // Adjusted gap for the rest of the paragraphs
        let yPos = mainSectionY + 126 + (lines.length * 13) + 10;

        // Reduce line space between Internship Position and Start Date


        doc.text(`${positionTitle} ${formData.position}`, 40, yPos);
        doc.text(`${durationTitle} ${formData.duration}`, 40, yPos + 13);
        doc.text(`Start Date: ${formData.startDate}`, 40, yPos + 26); // Adjusted line space



        const benefits = formData.benefits;
        const responsibilities = formData.responsibilities;

        doc.text(benefitTitle, 40, yPos + 46);
        var yPosValue = yPos + 46;
        // doc.text(formData.benefit1, 40, yPos + 67);
        // doc.text(formData.benefit2, 40, yPos + 81);
        
        const startX = 40; // Starting X position for benefit lines
    const indexWidth = doc.getTextWidth('9.'); // Width of the index
const textWidth = doc.internal.pageSize.width - 80 ; // Available width for text after accounting for index
benefits.filter(benefit => benefit.trim() !== '').forEach((benefit, index) => {
    const benefitLines = doc.splitTextToSize(benefit, textWidth);
    const linesCount = benefitLines.length || 1; // Ensure at least one line is counted
    doc.text(`${index + 1}.`, startX, yPosValue + 13); // Print index
    doc.text(benefitLines, startX + indexWidth + 3, yPosValue + 13); // Print benefit lines starting at an appropriate X position
    yPosValue += linesCount * 13; // Increment yPos based on the number of lines in the benefit
});
        // doc.text('3. Exposure to real-world projects and challenges.', 40, yPos + 95);
        // doc.text('4. Certificate of Completion at the end of the internship.', 40, yPos + 109);

        // doc.text(respTitle, 40, yPos + 134);
        // doc.text('1. Collaborate with the development team to design and implement front-end and back-end solutions.', 40, yPos + 148);
        // doc.text('2. Participate in code reviews and contribute to the continuous improvement of coding practices.', 40, yPos + 162);
        // doc.text('3. Work closely with senior developers to troubleshoot, debug, and optimize applications.', 40, yPos + 176);

        doc.text(respTitle, 40, yPosValue + 20);
        yPosValue = yPosValue + 20;
        // Loop through responsibilities and add each line to the document
        // yPosValue = yPosValue + 20;
        // responsibilities.filter(responsibility => responsibility.trim() !== '').forEach((responsibility, index) => {
        //     const resplines = doc.splitTextToSize(responsibility, doc.internal.pageSize.width - 80);
        //     doc.text(`${index + 1}. ${responsibility}`, 40, (yPosValue + 13),resplines); // Adjust yPos based on the increment
        //     yPosValue = yPosValue + 13;
        // });

        responsibilities.filter(responsibility => responsibility.trim() !== '').forEach((responsibility, index) => {
            const resplines = doc.splitTextToSize(responsibility, textWidth);
            const linesCount = resplines.length || 1; 
            doc.text(`${index + 1}.`, startX, yPosValue + 13);
            doc.text(resplines, startX + indexWidth + 5, yPosValue + 13); 
            yPosValue += linesCount * 13; 
        });

        // doc.text('To accept this internship offer, please sign and return the attached internship agreement by ' + formData.issueDate, 40, yPos + 201);
        doc.text(`To accept this ${formData.type} offer, please sign and return the attached internship agreement by ` + formData.issueDate, 40, yPosValue + 20);
        yPosValue = yPosValue + 20;
        doc.text('If you have any questions or concerns, feel free to contact us at internship@codeworld.co.in', 40, yPosValue + 13);
        yPosValue = yPosValue + 13;

        // Split "We look forward..." paragraph into smaller chunks
        const forwardLines = doc.splitTextToSize('We look forward to your contribution to Code World Institute and Infotech Private Limited and wish you a productive and enriching internship experience.', doc.internal.pageSize.width - 80);
        // doc.text(forwardLines, 40, ypo + 245);
        doc.text(forwardLines, 40, yPosValue + 25);
        yPosValue = yPosValue + 25;


        // Signature
        yPosValue = yPosValue + (forwardLines.length * 13) + 25;
        const qrCodeY = yPosValue - 25;
        doc.text('Sincerely,', 40, yPosValue);
        doc.text('Sagar Dudhankar', 40, yPosValue + 15);
        yPosValue = yPosValue + 15;
        doc.text('Managing Director', 40, yPosValue + 18);
        yPosValue = yPosValue + 18;
        doc.text('Code World Infotech Private Limited', 40, yPosValue + 13);


        // QR Code
        const qrCodeWidth = 70;
        const qrCodeHeight = 70;
        const qrCodeSize = 80; 
        const qrCodeX = doc.internal.pageSize.width - qrCodeWidth - 70; 

        doc.addImage(qrCode, 'PNG', qrCodeX, qrCodeY, qrCodeWidth, qrCodeHeight); 


        // Footer Section
        const footerX = 40;
        const footerY = doc.internal.pageSize.height - 60;
        const footerWidth = (doc.internal.pageSize.width - 80) / 2;
        const footerHeight = 40;

        
        doc.setDrawColor(0, 0, 255); 
        doc.setLineWidth(1); 
        doc.line(40, footerY, doc.internal.pageSize.width - 40, footerY); 

        doc.addImage(emailIconImage, 'PNG', footerX, footerY + 10, 15, 15); 

    
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        doc.text('internship@codeworld.co.in', footerX + 20, footerY + 20);

       
        doc.addImage(phoneIconImage, 'PNG', footerX + 180, footerY + 10, 15, 15); // Assuming you have a phone icon image

    
        doc.text('+91-9623699799', footerX + 200, footerY + 20);

        
        doc.addImage(addressIconImage, 'PNG', footerX + 320, footerY + 10, 15, 15); // Assuming you have an address icon image

     
        doc.text('11,Chaitanya Nagar,Vijapur Road,Solapur', footerX + 340, footerY + 20);
      
        doc.save('offerletter.pdf');

    };

    return (
        <>
        <div className="form-container">
            <h2 className="mb-3">Offerletter Form</h2>
            <form className="form-class row row-gap-5 p-5" onSubmit={handleSubmit}>
                <div className="col-md-12">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="id">Address(Area):</label>
                    <input
                        type="text"
                        id="area"
                        name="area"
                        value={formData.area}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="id">Address(City and PIN):</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="col-md-4">
                    <label htmlFor="duration">Offerletter Type:</label>
                    <select
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Type</option>
                        <option value="Internship">Internship</option>
                        <option value="Job">Job</option>
                    </select>
                </div>
                <div className="col-md-4">
                    <label htmlFor="position">position:</label>
                    <input
                        type="text"
                        id="position"
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="col-md-4">
                    <label htmlFor="duration">Duration:</label>
                    <input
                        type="text"
                        id="duration"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="col-md-4">
                    <label htmlFor="startDate">Starting Date:</label>
                    <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="col-md-4">
                    <label htmlFor="acceptDate">Accept Date:</label>
                    <input
                        type="date"
                        id="acceptDate"
                        name="acceptDate"
                        value={formData.acceptDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="col-md-4">
                    <label htmlFor="issueDate">Issue Date:</label>
                    <input
                        type="date"
                        id="issueDate"
                        name="issueDate"
                        value={formData.issueDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="col-md-12">
                    <label htmlFor="offerParagraph">Offer Paragraph:</label>
                    <textarea
                        id="offerParagraph"
                        name="offerParagraph"
                        value={formData.offerParagraph}
                        placeholder="Optional"
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-12">
                <label className="">Benefits:</label>
                <div className="row row-gap-3">
                    {formData.benefits.map((benefit, index) => (
                            <div className="col-md-12" key={index}>
                        <input className=""
                            type="text"
                            placeholder="Enter Benefit"
                            value={benefit}
                            onChange={(e) => handleBenefitChange(index, e.target.value)}
                        />
                        </div>
                    ))}
                    </div>
                </div>
                <div className="col-md-12">
                    <label>Responsibilities:</label>
                    <div className="row row-gap-3">
                    {formData.responsibilities.map((responsibility, index) => (
                        <div className="col-md-12" key={index}>
                        <input
                            className="col-md-12"
                            
                            type="text"
                            placeholder="Enter Responsiblity"
                            value={responsibility}
                            onChange={(e) => handleResponsibilityChange(index, e.target.value)}
                        />
                        </div>
                    ))}
                    </div>
                </div>
                <button className='form-submit-btn' type="submit">Generate PDF</button>
            </form>
            <ToastContainer style={{fontSize: "50px"}} position='top-left'/>
        </div>
        </>
    );
};

export default Form;
