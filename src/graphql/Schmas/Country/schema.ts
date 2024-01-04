
export const CountrySchema = `#graphql
  type Country {
    id: String
    name: String
    Phonecode: String
    sortname: String

  }

  input CountryInput {
    name: String
    Phonecode: String
    sortname: String

  }

  input CountryUpdate {
    name: String
    Phonecode: String
    sortname: String

  }

  type Query {
    getCountryList: [Country]
    getCountry(id: ID!): Country
  }

  type Mutation {
    createCountry(country: CountryInput!): Country

    updateCountry(id: ID!, country: CountryUpdate!): Country

    deleteCountry(id: ID!): Country
  }
`;
