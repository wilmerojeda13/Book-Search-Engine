// import the gql tagged template function
const { gql } = require('apollo-server-express');

//Creating custom tags to retrieve array for al book data with the 'Type argument
const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String
    bookCount: Int
    savedBooks: [Book]
  }
  type Book {
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }

  input BookInput {
    bookId: String!
    authors: [String]
    description:  String
    title: String
    image: String
    link: String
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(input: BookInput): User
    removeBook(bookId: ID!): User
  }
  type Query {
    me: User
  }
`;

// export the typeDefs
module.exports = typeDefs;