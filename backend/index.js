import express from 'express';
import cors from 'cors';
import memberRoutes from './routes/MemberRoutes.js';
import PdfRoutes from './routes/PdfRoutes.js';
import adminRoutes from './routes/loginRoutes.js';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());


// Routes for other endpoints
app.use('/member', memberRoutes);
app.use('/admin', adminRoutes);
app.use('/pdf', PdfRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server connected on port ${port}`);
});
