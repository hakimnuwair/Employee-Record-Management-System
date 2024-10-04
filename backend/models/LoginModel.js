import bcrypt from 'bcrypt';
import connection from '../database/db.js';

const LoginModel = async (username, password) => {
    try {
        const query = "SELECT * FROM admin WHERE username = ?";
        const result = await new Promise((resolve, reject) => {
            connection.query(query, [username],(err,res) => {
                if(err){
                    throw{success: false,validPassword: false,validUser: false};
                }

                if(res[0]){
                    const {password_hash} = res[0];

                    if(!password_hash){
                        throw{success: false , validPassword: false, validUser: false};
                    }

                    const verifyPassword = async () => {
                        const isPasswordValid = await bcrypt.compare(password, password_hash);
                        if(isPasswordValid){
                            resolve({success: true, validPassword: true, validUser: true});
                        }else{
                            resolve({success: false , validPassword: false, validUser: true});
                        }   
                    };
                    
                    verifyPassword();   
                }
                else{
                    resolve({success: false,validPassword: true, validUser: false});
                }
            });
            });
            return result;
    } catch (error) {
        throw {success: false};
    }
};

export default LoginModel;
