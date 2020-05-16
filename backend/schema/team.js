export default `

  type Team {
    owner: User!
    members: [User!]!
    channel: [Channel!]!
  }

  type teamResponse {
    admin: User!
    members: [User!]!
    ok: Boolean!
    errors: [Error!]
  }

  type Mutation {
    createTeam(name: String!, owner:Int!): teamResponse!
  }
`;
