export default `
type Channel {
    id: Int!
    name: String!
    public: Boolean!
    message: [Message!]!
    users: [User!]!
  }
  
  type channelResponse {
    ok: Boolean!
    errors: [Error!]
    channel: Channel!
  }

  type Query {
    singleChannel(id: Int!): Channel!
    allChannels:[Channel!]!
  }

  type Mutation {
    createChannel( name: String!, public: Boolean=false): channelResponse!
  }
`;
