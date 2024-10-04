import connection from '../database/db.js';

const addPdfUrl = async (refId, name, url) => {
    const query = `INSERT INTO offerletters_url (ref, username, pdf_url) value (?, ?, ?)`;
    const values = [refId, name, url];
    try{
        const result = await new Promise((resolve, reject) => {
            connection.query(query, values, (err, res) => {
                if(err){
                    reject(false);
                }
                if(res){
                    resolve(true);
                }
            })
        })
        if(result){
            return result;
        }
    }catch (error){
        return false;
    }

}

const membersDetails = async () => {
    const query = `SELECT ref, username FROM offerletters_url`;
    try{
        let result = await new Promise((resolve, reject) => {
            connection.query(query, (err, res) => {
                if(err){
                    reject(false);
                }
                if(res){
                    resolve(res);
                }
            })
        })
        if(result){
            
            return result;
        }
        return result;
} catch (error) {
    return false;
}
}

const pdfUrl = async (refId) => {
    const query = `SELECT pdf_url FROM offerletters_url WHERE ref = ?`;
    console.log(refId);
try{
    const result = await new Promise((resolve, reject) => {
        connection.query(query,[refId], (err, res) => {
            console.log("reached mod",res[0].pdf_url);
            if(err){
                reject(false);
            }
            if(res){
                resolve(res[0].pdf_url);
            }
        })
    });
    return result;
}catch (error){
    return false;
}
}

export default {addPdfUrl, membersDetails, pdfUrl};

