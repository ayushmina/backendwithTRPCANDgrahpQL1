import { ApolloServer } from "apollo-server-express";
// import { typeDefs } from './schema/typeDefs'; // Import your GraphQL schema definitions
// import { resolvers } from './schema/resolvers'; // Import your GraphQL resolvers

import { Request, Response, NextFunction } from "express";
import { ExpressContext } from "apollo-server-express/dist/ApolloServer";

import { verifyToken } from "../helper/JWTFunctions";
// import { getConnection } from "../db/tenantHelper/multiTenantConnection";
import { makeExecutableSchema } from "@graphql-tools/schema";
import {CountrySchema} from "./Schmas/Country/schema";
import {CountryResolvers} from "./Schmas/Country/resolver";

import { GraphQLError } from "graphql";


export const TypeDefs: any = [
    CountrySchema
];

export const Resolvers: any = [
    CountryResolvers
];




export const createGraphQLServer = () => {
  return new ApolloServer({
    typeDefs: TypeDefs,
    resolvers: Resolvers,
    context: async ({ req, res }: ExpressContext) => {
      try{

      // Apply your custom middleware
      // myMiddleware(req, req.res, () => {});

      // Access the request headers to get the authorization token   
      let authToken = req.headers.authorization 
      // || req.headers.Authorization || req.headers.token||"";

      // authToken=JSON.stringify(authToken);
      
      let accept_language = req.headers["accept-language"] || "en";
      let location = req.headers["content-location"] || "India";

      let domainURL = req.headers.domainurlnew || req.headers.domainurl || "localhost";

      // for getting tenant connection
    //   let tenants = await getConnection(domainURL);

      console.log(authToken,"here is auth token")

      
      let user: any;

      // if (authToken != "") {
        user = await verifyToken(authToken);
      // }
      // let tenant_DomainURL = user.tenantdomainurl;
      // let databasename =req.headers.databasename
      

      // Check if the person is valid
      // const isPersonValid =await  checkAuthenticated(authToken);

      // tenants.sequelize.syn()

      // Return the context with the person validity status
      return {
        user: user ? user : false,
        res,
        req,
        // You can add other context data if needed
      };
    
    }catch(err:any){
      
      throw new GraphQLError(err, {
        extensions: {
          code: 'UNAUTHENTICATED',
          http: { status: 401 },
        },
      });
    }
    },
    formatError: (err) => {
      return {
        code: err?.extensions?.code,
        message: err.message,
        statusCode: 500,
      };
    },
  });
};

export const schema = makeExecutableSchema({
  typeDefs: TypeDefs,
  resolvers: Resolvers,
});

// export const createGraphQLAPIDoc = () => {
//   const schema = makeExecutableSchema({
//     typeDefs: TypeDefs,
//     resolvers: Resolvers,
//   });
//   const openApi = OpenAPI({
//     schema,
//     info: {
//       title: "API Documentation",
//       description: "API documentation for your project",
//       version: "1.0.0", // Add a comma here
//     },
//     components: {
//       securitySchemes: {
//         bearerAuth: {
//           type: "http",
//           scheme: "bearer",
//           bearerFormat: "JWT",
//         },
//       },
//     },
//     servers: [
//       {
//         url: "http://localhost:4000/", // Replace with your server URL
//         description: "Local Development Server",
//       },
//     ],
//   });
//   return openApi;
// };
