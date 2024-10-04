// controllers/memberController.js
import MemberModel from '../models/MemberModel.js';
import QRCode from 'qrcode';
import db from '../database/db.js';

export const addMember = async (req, res) => {
  const { name, address, position, duration, startDate, acceptDate, issueDate } = req.body;

  if (!name || !address || !position || !duration || !startDate || !acceptDate || !issueDate) {
      return res.status(400).send('Missing required fields');
  }

  try {
      const referenceId = await MemberModel.addMember(name, address, position, duration, startDate, acceptDate, issueDate);

      const baseUrl = "http://localhost:3001/member/verify";
      const encodedReferenceId = encodeURIComponent(referenceId);
      const url = `${baseUrl}?reference=${encodedReferenceId}`;
      const qrCode = await QRCode.toDataURL(url);
      const qrCodeBase64 = qrCode.split(',')[1];

      res.send({ referenceId, qrCode: qrCodeBase64 });
  } catch (error) {
      console.error("Error executing query:", error);
      res.status(500).send("Internal Server Error");
  }
};

export const totalMembers = async (req,res) =>{
  try{
   
    const totalMembersCount = await MemberModel.totalMembers();
    if(totalMembersCount){
      res.status(200).json({totalMembers: totalMembersCount});
    }else{
      res.status(500).send();
    }
  }
  catch(error){
      res.status(500).send();
    }
}

export const activeMembers = async (req, res) => {
  try{
    const activeMembersCount = await MemberModel.activeMembers();
    if(activeMembersCount >= 0){
      res.status(200).json({activeMembers: activeMembersCount});
    }else{
      res.status(404).send();
    }
  }catch(error){
    res.status(500).send();
  }
}

export const completedMembers = async (req,res) =>{
  try{
    const completedMembers = await MemberModel.completedMembers();
    if(completedMembers){
      res.status(200).json({completedMembers: completedMembers});
    }else{
      res.status(404).send();
    }
  }catch(error){
    res.status(500);
  }
}

  export const verifyMember =  async (req, res) => {
    const refId = req.query.reference;
    try{
      const member = await MemberModel.verifyMember(refId);
      if (member) {
        // Render verified page with member details
        res.render('verification.ejs', { details: member });
      } else {
        // Render unverified page
        res.render('verification.ejs');
      }
    }catch(error){
      res.status(500);
    }
  }

  export const listMembers = async (req, res) => {
    const query = "SELECT * FROM active_members";

    try {
        db.query(query, (error, results) => {
            if (error) {
                console.error("Error fetching members:", error);
                res.status(500).json({ error: "Internal Server Error" });
            } else {
                res.json(results);
            }
        });
    } catch (error) {
        console.error("Error fetching members:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const deleteMember = async (req, res) => {
  try {
      const ref = req.params.id; // Assuming ref is used as the identifier for the member
      // Perform deletion in the database
   
      const result = await MemberModel.deleteMember(ref);
      if(result){
        res.status(200).send();
      }else{
        res.status(404).send();
      }
  } catch (error) {
      res.status(500).send();
  }
};

export const addCompletedMembers = async (req, res) =>{
  console.log("com contro", req.body);
  try{
    const thisMember =  req.body;
    const ref_id = thisMember.ref;
    const response = await MemberModel.addCompletedMembers(thisMember,ref_id);
    if(response){
      res.status(200).send();
    }else{
      res.status(404).send();
    }
  }catch (error){
    res.status(500).send();
  }

}





export const removedMembers = async (req, res) =>{
  try{
    const removedMembers = await MemberModel.removedMembers();
    if(removedMembers){
      res.status(200).json({removedMembers: removedMembers})
    }else{
      res.status(400).send();
    }
  }catch(error){
    res.status(500).send();
  }
}




