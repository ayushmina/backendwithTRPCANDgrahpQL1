
export const CountryResolvers = {
  Query: {
    getCountry: async (root: any, args: any, context: any, info: any) => {
      try {
        let { countries } = context.tenants;
        const country = await countries.findByPk(args.id);
        if (!country) {
          throw new Error("Country not found");
        }
        return country;
      } catch (error: any) {
        throw new Error(`Failed to fetch Country: ${error.message}`);
      }
    },
    getCountryList: async (root: any, args: any, context: any, info: any) => {
      try {
        //  isAuthenticated(context);
        let { users,countries } = await context.tenants;

        console.log(context.tenants)
    
        const countrys = await countries.findAll({
          attributes:["id" ,"name","Phonecode","sortname"]
        });
        return countrys;
      } catch (error: any) {
        console.log(error, "-----------");
        throw new Error(`Failed to fetch Countries: ${error.message}`);
      }
    },
  },
  Mutation: {},
};
