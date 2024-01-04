import { Request, Response, NextFunction } from 'express';
// import { fetchDataByTenant } from '../../db';
import sendError from '../../helper/errorHanding';
// import {AuthenticatedRequest} from "../interface"
const multiTenantMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tenant = req.headers["x-access-token"] || req.query["x-access-token"] || req.headers["token"]||req.headers["tenant"];
   
    // const sequelize=await fetchDataByTenant(tenant as string);
    // req["sequelize"]=sequelize;
    // await sequelize.authenticate();
    console.log("hello debug")
    // sequelize.sync();
    // let data = sequelize.models.aaa
    // let data = await sequelize.query("SELECT * FROM hrdmast WHERE Emp_Code = 'VVDN/3994'");
    // console.log(data,'here is ');
    // console.log(await data.findOne({where:{
    //   name:"ayush"
    // }}),"here is data");
    // console.log(req["sequelize"],'HERE IS Sequelize');
    // req["data"]=data;
    return next();
    
  } catch (error) {
    console.log(error,"here is errr");
    return sendError(error,res);
    return res.status(400).json("something is wrong");
  }
 
  

  // If the user is not authenticated, send an error response
  // return res.status(401).json({ success: false, message: 'Unauthorized: User not authenticated.' });
};

export { multiTenantMiddleware };
