import express from 'express';
import { addMember  , verifyMember , listMembers , deleteMember, totalMembers, completedMembers, activeMembers , removedMembers, addCompletedMembers } from '../controllers/MemberController.js';

const router = express.Router();

// router.use((req,res,next)=>{
//     console.log("api req:",req.body);
//     next();
// })

router.post('/addmember', addMember);

router.get('/totalmembers', totalMembers);

router.get('/activemember', activeMembers);

router.get('/completedmembers', completedMembers);

router.get('/verify', verifyMember);

router.get('/list', listMembers);

router.delete('/delete/:id', deleteMember);

router.patch('/completed', addCompletedMembers);

router.get('/removedmembers', removedMembers);



export default router;

