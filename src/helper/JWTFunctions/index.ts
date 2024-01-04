import  Boom from '@hapi/boom';
import {sign,verify}   from 'jsonwebtoken';

const createToken = async (payloadData:any, time:any) => {
  
    return new Promise((resolve, reject) => {
      sign(payloadData,"secretKey",{
        expiresIn: time,
      }, (err:any, jwt:any) => {
        if (err) {
          reject(err);
        } else {
          resolve(jwt);
        }
      });
    });
  };
  const verifyToken = async (token: any) => {
    try {
      if (token) {
        return new Promise((resolve, reject) => {
          verify(token,"secretKey", (err: any, decoded: any) => {
            if (err) {
              console.log(err, 'verifyToken inside error');
              reject(err);
            } else {
              resolve(decoded);
            }
          });
        });
      } else {
        throw Boom.badRequest('No token provided');
      }
    } catch (error) {
      throw error;
    }
  };
const createaccessToken = async (tokenData:any, expireTime:any='10m') => {
    try {
  
      const accessToken = await createToken(tokenData, expireTime);
      
      if (accessToken) {
        return accessToken;
      } else {
        throw Boom.badRequest("responseMessage.DEFAULT");
      }
    } catch (error) {
      throw error;
    }
  };
  
  export {createaccessToken,verifyToken}