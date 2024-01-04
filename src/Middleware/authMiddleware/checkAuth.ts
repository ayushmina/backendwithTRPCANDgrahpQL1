import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import * as Boom from "@hapi/boom";
import sendError from "../../helper/errorHanding";
// import models from "../../db/models";
import { verifyToken } from "../../helper/JWTFunctions/index";

// import { getConnection } from "../../db/tenantHelper/multiTenantConnection";
const checkAuthorizationBYToken = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  let token =
    req.headers.authorization ||
    req.headers.Authorization ||
    req.headers["token"];

  // let token=""

  if (token) {
    try {
    // verify(token,"secretKey", async function (err, decoded) {

      // console.log(token);

    token = token.replace(/['"`]/g, "");
    // console.log(token);
    let data: any;
    data = await verifyToken(token);
    console.log(data);
  
      // let model = models.Users;

      let id = data.id; // userID
      //   let user = await model.findOne({where:{
      //     UserID:id
      //   },
      //   attributes: ['UserID', 'UserName', 'UserActive', 'LoginDate', 'Useremailid', 'UserType']
      // });
      let domainURL = req.headers.domainurl
        ? req.headers.domainurl
        : "localhost";
      // : "honohr.testing.com";

      // const tenants = await getConnection(domainURL); //
      // const { HrdMast } = tenants;
      // let userInfo = await HrdMast.findOne({
      //   where: {
      //     Emp_Code: data.Emp_Code,
      //   },
      //   attributes: [
      //     "Emp_Code",
      //     "Emp_Title",
      //     "Emp_FName",
      //     "Emp_MName",
      //     "Emp_LName",
      //     "MPhoneNo",
      //     "Status_Code",
      //     "MobileNo",
      //     "OEMailID",
      //     "OEMailPWD",
      //     "FULLNAME",
      //   ],
      // });
      // console.log(userInfo, "here is user info ");
      let userInfo = data;
      if (!userInfo) {
        throw Boom.unauthorized("USER_NOT_FOUND");
      }
      userInfo = userInfo.toJSON();
      // console.log("decoded" , user);

      //   sequelize.query("select ")
      req.user = userInfo;

      next();
    } catch (error: any) {
      // console.log(error.message,"here is error ");
      return sendError(Boom.unauthorized(error.message), res);
    }
    // }
  } else {
    return sendError(Boom.unauthorized("TOKEN_NOT_PROVIDED"), res);
  }
};


export { checkAuthorizationBYToken };
