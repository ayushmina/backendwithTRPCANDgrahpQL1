import { Response } from "express"; // Assuming you are using Express.js or a compatible framework

// Assuming Boom library is installed and properly imported
import  Boom from '@hapi/boom';

import { Responses } from "../Response";
enum HttpStatusCode {
    OK = 200,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    CONFLICT = 409,
    UNAUTHORIZED = 401,
    INTERNAL_SERVER_ERROR = 500,
  }

interface DataObject {
  name?: string;
  message?: string;
  isBoom?: boolean;
  code?: number;
  response?: { message: string };
}

const sendError = async (data:any, res: Response) => {
  try {
    let error:any;
    console.log("ERROR OCCURRED IN SEND ERROR FUNCTION", data);

    if (typeof data !== "object" || data === null) {
      data = { name: "UnknownError", message: String(data) };
    }

    if (!("isBoom" in data) || !data.isBoom) {
       
      if (data.name === "MSSQLError") {
        // Check MSSQL Error
        let message = Responses.DB_ERROR;
        if ((data as any).number === 2601 || (data as any).number === 2627) {
          // Unique constraint violation
          if ((data as any).message.includes("email")) {
            const conflictError = Boom.conflict(Responses.EMAIL_ALREADY_EXISTS);
           
            return res.json(conflictError.output.payload);
          } else {
            message = Responses.DUPLICATE;
          }
        }
        error = Boom.boomify(new Error(message), { statusCode: HttpStatusCode.BAD_REQUEST });
      } else if (data.name === "ApplicationError" || data.name === "ValidationError") {
        error = Boom.boomify(new Error(Responses.APP_ERROR), {
          statusCode: HttpStatusCode.BAD_REQUEST
          
        });
      } else if (data.name === "CastError") {
        error = Boom.boomify(new Error(Responses.INVALID_OBJECT_ID), {
          statusCode: HttpStatusCode.BAD_REQUEST,
        });
      }else if (data.name === "AuthenticationError") {
        error = Boom.boomify(new Error(Responses.UNAUTHORIZED), {
          statusCode: HttpStatusCode.UNAUTHORIZED,
        });
    }
       else if (data.response && data.response.message) {
        error = Boom.boomify(new Error(data.response.message), { statusCode: HttpStatusCode.BAD_REQUEST });
      } else if (data.message) {
        error = Boom.boomify(new Error(data.message), { statusCode: HttpStatusCode.BAD_REQUEST });
      } else {
        error = Boom.boomify(new Error(Responses.DEFAULT), { statusCode: HttpStatusCode.BAD_REQUEST });
      }
    } else {
      if (data.data && (data as any).data.code) {
        (data as any).output.payload.code = (data as any).data.code;
      }
      (data as any).output.payload.data = {};
      return res.status(HttpStatusCode.BAD_REQUEST).json((data as any).output.payload);
    }

    return res.status(HttpStatusCode.BAD_REQUEST).json(error.output.payload);
  } catch (err) {
    // Handle any error that occurred while sending the response
    console.error("Error sending error response:", err);
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
  }
};

export default sendError;
