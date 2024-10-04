import express from 'express';
import uploadFile from '../controllers/UploadController.js';
import multer from 'multer';
import { membersDetails, pdfUrl } from '../controllers/PdfController.js';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.post('/upload', upload.single('file'), uploadFile);
router.get('/membersdetails', membersDetails);
router.get('/pdfurl/:refId', pdfUrl);


export default router;