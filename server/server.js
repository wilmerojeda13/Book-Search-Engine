const express = require('express');
const db = require('./config/connection');
const {authMiddleware} = require('./utils/auth')

//Import ApolloServer
const { ApolloServer } = require('apollo-server-express');

// Call the async function to start the server
const {typeDefs, resolvers} = require('./schemas')


const app = express();
const PORT = process.env.PORT || 3001;

// create a new Apollo server and pass in our schema data
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

// integrate our Apollo server with the Express application as middleware
server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    // log where we can go to test our GQL API
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  })
})
