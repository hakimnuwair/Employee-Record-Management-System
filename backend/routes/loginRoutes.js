// loginRoutes.js
import express from 'express';
import loginController from '../controllers/LoginController.js';

const router = express.Router();

// router.use((req,res,next)=>{
//     console.log("api req:",req.body);
//     next();
// })


router.post('/login', loginController);

export default router;
