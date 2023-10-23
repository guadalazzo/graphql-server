import { gql, ApolloServer } from "apollo-server";
const persons = [
  {
    name: "ask",
    phone: "0100192",
    street: "AAKK SKK",
    city: "kakk",
    id: "2200200203",
  },
  {
    name: "aallal",
    phone: "02002020",
    street: "aslaslk SKK",
    city: "lowkw",
    id: "29299292929",
  },
  {
    name: "slsll",
    street: "loslajs SKK",
    city: "löakss",
    id: "039381902",
  },
];

//DATA DEFINITIONS (! means not null)
const typeDefs = gql`
  type Person {
    name: String!
    phone: String
    street: String!
    city: String!
    id: ID!
  }

  type Query {
    personCount: Int!
    allPersons: [Person]!
    findPerson(name: String!): Person
  }
`;

// Resolve the data from the queries.
const resolvers = {
  Query: {
    personCount: () => persons.length,
    allPersons: () => persons,
    findPerson: (root, args) => {
      const { name } = args;
      return persons.find((person) => person.name === name);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

// query for findPerson
/**
query {
    findPerson(name: "aallal"){
      street
      street
    }
  }

  result: {
  "data": {
    "findPerson": {
      "street": "aslaslk SKK"
    }
  }
}


Query for allPersons

query {
  allPersons {
    city
    street
    phone
  }
}

result:
{
  "data": {
    "allPersons": [
      {
        "city": "kakk",
        "street": "AAKK SKK",
        "phone": "0100192"
      },
      {
        "city": "lowkw",
        "street": "aslaslk SKK",
        "phone": "02002020"
      },
      {
        "city": "löakss",
        "street": "loslajs SKK",
        "phone": null
      }
    ]
  }
}
 */
