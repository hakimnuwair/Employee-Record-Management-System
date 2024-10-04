// controllers/uploadController.js
import { uploadFileToCloudinary } from '../services/UploadService.js';
import PdfModel from "../models/PdfModel.js"

export const uploadFile = async (req, res) => {
  try {
    console.log("inside cont", req.file);
    const result = await uploadFileToCloudinary(req.file);
    const response = await PdfModel.addPdfUrl( req.body.refId, req.body.name, result.secure_url);
    if(response){
    res.status(200).json({ url: result.secure_url });
    }else{
      res.status(404).json({message: "error storing PDF_URL"});
    }
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Failed to upload file to Cloudinary' });
  }
};

export default uploadFile;
