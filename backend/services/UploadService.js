// services/uploadService.js
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({ 
    cloud_name: 'dofb2bgfv', 
    api_key: '285997876221342', 
    api_secret: 'uGuUurrPEgr6zUaoAnrKsTrRrls' 
  });

  export const uploadFileToCloudinary = async (file) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({
        folder: 'offerletters', // Specify the folder name here
        resource_type: 'auto'
      }, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }).end(file.buffer);
    });
  };

export default uploadFileToCloudinary


