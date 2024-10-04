// import loginModel from '../models/LoginModel.js';

// const login = async (req, res) => {
//     const { username, password } = req.body;

//     try {
//         const result = await loginModel(username, password);
//         if (result.success) {
          
//             res.status(200).json({ success: true, message: result.message });
//         } else {
//             res.status(401).json({ success: false, message: result.message });
//         }
//     } catch (error) {
//         console.error('Login controller error:', error);
//         res.status(500).json({ success: false, message: 'Internal server error' });
//     }
// };

// export default login;

import LoginModel from '../models/LoginModel.js';

const loginController = async (req, res) => {
    try {
        const { username, password } = req.body;
        const result = await LoginModel(username, password); // Corrected: Call LoginModel function
        if(result.success){
            res.status(200).json({success: true});
        }else if(result.validUser){
            res.status(200).json({success: false ,message: "Invalid Password"});
        }else if(result.validPassword){
            res.status(200).json({success: false, message: "Invalid Username or Password"});
        }
    } catch (error) {
        console.error('Error in loginController:', error);
        res.status(500).json({message: 'Internal Server Error' });
    }
};

export default loginController;


