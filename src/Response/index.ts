// messages.ts

export var Responses: Readonly<{
    SUCCESS: string;
    USER_NOT_FOUND: string;
    CUSTOMER_NOT_FOUND:string;
    TOKEN_NOT_PROVIDED: string;
    INVALID_TOKEN: string;
    USER_CREATED_SUCCESSFULLY: string;
    ORDER_CREATED_SUCCESSFULLY: string;
    LOGIN_SUCCESSFULLY: string;
    DB_ERROR: string;
    DUPLICATE: string;
    EMAIL_ALREADY_EXISTS: string;
    USER_ALREADY_EXISTS: string;
    APP_ERROR: string;
    INVALID_OBJECT_ID: string;
    DEFAULT: string;
    INVALID_CREDENTIALS: string;
    FAILED: string,
    USER_BLOCKED: string;
    USER_EMAIL_NOT_VERIFIED: string;
    ACCOUNT_ALREADY_VERIFIED: string;
    ALREADYEXIST: string;
    TOKEN_NOT_FOUND: string;
    DATA_NOT_FOUND: string;
    CODE_NOT_FOUND: string;
    SESSION_EXPIRED: string;
    UNAUTHORIZED: string;
  
}> = {
    SUCCESS: "Success",
    USER_NOT_FOUND: "User not found",
    CUSTOMER_NOT_FOUND: "Please fill account details first.",
    TOKEN_NOT_PROVIDED: "You are not authorized to access this path. Please provide authorization token.",
    INVALID_TOKEN: "Provided token is invalid",
    USER_CREATED_SUCCESSFULLY: "Account has been created successfully",
    ORDER_CREATED_SUCCESSFULLY: "Order has been created successfully",
  
    LOGIN_SUCCESSFULLY: "You are successfully login.",
    DB_ERROR: "Something went wrong.",
    DUPLICATE: "Duplicate entry.",
    EMAIL_ALREADY_EXISTS: "This user is already registered with us",
    USER_ALREADY_EXISTS: "This user is already registered with same bank account details",
    APP_ERROR: "Application error occurred.",
    INVALID_OBJECT_ID: "Invalid ID provided.",
    DEFAULT: "Something went wrong.",
    INVALID_CREDENTIALS: "Incorrect credentials.",
    FAILED: "Failed",
    USER_BLOCKED: "You are blocked from accessing Analytixlabs. Please contact your administrator",
    USER_EMAIL_NOT_VERIFIED: "Email address is not verified. Please verify your email before login.",
    ACCOUNT_ALREADY_VERIFIED: "Given Bank Account has already been verified.",
    ALREADYEXIST: "Already Exists",
    TOKEN_NOT_FOUND: "Token Not Found",
    DATA_NOT_FOUND: "Data Not Found",
    CODE_NOT_FOUND: "CODE Not Found",
    SESSION_EXPIRED: "SESSION EXPIRED",  
    UNAUTHORIZED: "unAuthorized user/Incorrect credentials"
};
