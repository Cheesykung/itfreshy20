import pkg from 'apollo-server';
const { ApolloServer, gql } = pkg;
import mongoose from 'mongoose'
import typeDefs from './typeDefs.js'
import resolvers from './resolvers.js'

// TODO: initial and connect to MongoDB
mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://ryu:test@cluster0.ljg2u.mongodb.net/facebookauth?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// TODO: create Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});