import PdfModel from "../models/PdfModel.js"

export const membersDetails = async (req, res) => {
    try{
        const response = await PdfModel.membersDetails();
    if(response){
        res.status(200).json({members: response});
    }else{
        res.status(404).json({message: "Error Fetching Data"});
    }

    } catch (error){
        res.status(500).send;
    }
    
}


export const pdfUrl = async (req, res) => {
    try{
        console.log(req.params);
        const {refId} = req.params;
        const response = await PdfModel.pdfUrl(refId);
        if(response){
            res.status(200).json({url: response});
        }
    } catch(error){
        res.status(500);
    }
}