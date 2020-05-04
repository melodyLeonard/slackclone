export default `

  type Team {
    owner: User!
    members: [User!]!
    channel: [Channel!]!
  }

  type Mutation {
    createTeam(name: String!): Boolean!
  }
`;
