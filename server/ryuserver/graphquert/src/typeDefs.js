import pkg from 'apollo-server';
const { gql } = pkg;

export default gql`
  type User {
    _id: ID,
    uid: String,
    token: String,
    email: String,
    name: String,
    gender: String,
    pic: String,
    point: Int,
  }
  type Query {
    users: [User]
  }
  input UserInput {
    uid: String,
    token: String,
    email: String,
    name: String,
    gender: String,
    pic: String,
    point: Int,
  }
  type Mutation {
    createuser(input: UserInput): User
    updateuser(_id: ID!, input: UserInput): User
    deleteuser(_id: ID!): User
  }
`;
