
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../../helper/JWTFunctions';

// Create a middleware function

const graphqlMiddleware = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    // You can perform any desired tasks here before the GraphQL request is processed.
    console.log('Middleware is running!');
  
    // For example, you can access the request headers and perform authentication checks.
    const authToken = request.headers.authorization;
    if (!authToken || authToken !== 'YOUR_AUTH_TOKEN') {
     
      return ;
    }
  
    // Call next() to continue with the GraphQL request
    next();
  };

const checkAuthenticated = async (token:any)=>{
    try {
      if( token){
        let data= await verifyToken(token);

          return data;
      }      
    } catch (error) {
      console.log(error);
      throw error;
    }
   
}
  
  export {graphqlMiddleware,checkAuthenticated}
//   // Initialize ApolloServer with middleware
//   const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//     context: ({ req }) => {
//       // You can access the request object in the context function if needed
//       return {
//         headers: req.headers,
//         // Add other context data if needed
//       };
//     },
//     // Add the middleware to the server as an Express middleware
//     plugins: [
//       {
//         requestDidStart: () => ({
//           willSendResponse: (requestContext: GraphQLRequestContext<any>) => {
//             // You can perform tasks after the GraphQL request has been processed
//             console.log('After GraphQL request');
  
//             // Access response data if needed
//             console.log(requestContext.response);
//           },
//         }),
//       },
//     ],
//   });
  