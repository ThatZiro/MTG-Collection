import {ApolloServer} from "apollo-server";
import {typeDefs} from './graphql/typedefs';
import {resolvers} from "./graphql/resolvers";
import dotenv from 'dotenv';
import {sequelize} from "./connection/connection";

dotenv.config();

const PORT = process.env.PORT || 5000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    sequelize
  })
})

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
