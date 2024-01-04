

import crypto from "crypto"

const validateRequestPayload = async (requestObj:any, res:any, schema:any) => {
  return new Promise((resolve:any, reject:any) => {
    const { error } = schema.validate(requestObj);
    
    if (error) {
      let message = sendBadRequestError(error, res);
      reject(new Error(message));
    } else {
      resolve();
    }
  });
};
const Md5_encryption=(string:any)=>{

   let temp= crypto.createHash('md5').update(string).digest("hex")
   return temp;

} 

/*-------------------------------------------------------------------------------
 * Joi error handle
 * -----------------------------------------------------------------------------*/
const sendBadRequestError = (error:any, res:any) => {
  let message = error.details[0].message;
  message = message.replace(/"/g, "");
  message = message.replace("[", "");
  message = message.replace("]", "");

  return message;
};


export  {validateRequestPayload,Md5_encryption};
