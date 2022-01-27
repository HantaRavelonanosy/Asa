import { gql } from "graphql-tag";

export const userTypeDefs = gql`
  scalar DateTime
  scalar NonEmptyString
  scalar Void

  directive @auth(requires: UserRole) on OBJECT | FIELD_DEFINITION

  enum UserRole {
    ADMIN
    TEAM_LEAD
    SIMPLE_USER
    READ_ONLY
    UNKNOWN
  }

  "A user of the system"
  type User {
    id: ID!
    username: String!

    role: UserRole!
    team: Team
    "A disabled user wont be able to log into the system"
    isDisabled: Boolean!

    createdAt: DateTime!
    updatedAt: DateTime!
  }

  "A team of users"
  type Team {
    id: ID!
    name: String!
    description: String

    "List of all team users"
    users: [User!]! @auth(requires: TEAM_LEAD)
    "Get a user from the team by id"
    user(id: ID!): User @auth(requires: TEAM_LEAD)

    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    "List of all users of the system"
    users: [User!]! @auth(requires: TEAM_LEAD)
    "Get a user by id"
    user(id: ID!): User @auth(requires: TEAM_LEAD)

    "List of all teams"
    teams: [Team!]! @auth(requires: ADMIN)
    "Get a team by id"
    team(id: ID!): Team @auth(requires: ADMIN)
  }

  type Mutation {
    "Create a new user"
    createUser(
      username: NonEmptyString!
      password: String
      isDisabled: Boolean = false
      teamId: ID
      role: UserRole = UNKNOWN
    ): User! @auth(requires: ADMIN)
    "Edit user info"
    editUser(
      id: ID!
      username: NonEmptyString
      password: String
      isDisabled: Boolean
      teamId: ID
      role: UserRole
    ): User! @auth(requires: ADMIN)

    "Create a new team"
    createTeam(name: NonEmptyString!, description: String): Team!
      @auth(requires: ADMIN)
    "Edit a team name or description"
    editTeam(id: ID!, name: NonEmptyString, description: String): Team!
      @auth(requires: ADMIN)
    "Delete a team"
    deleteTeam(id: ID!): Void @auth(requires: ADMIN)
  }
`;
