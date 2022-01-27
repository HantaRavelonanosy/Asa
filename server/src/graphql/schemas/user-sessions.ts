import { gql } from "graphql-tag";

export const userSessionTypeDefs = gql`
  scalar NonEmptyString
  scalar Void

  enum Module {
    DASHBOARD
  }

  "Information about the current user"
  type UserInfo {
    loggedIn: Boolean!
    "Current user"
    user: User
    "List of modules the user has access to"
    modules: [Module!]
  }

  type Query {
    "Get info of current user"
    userInfo: UserInfo!
  }
  type Mutation {
    "Log in into the system"
    login(username: NonEmptyString!, password: NonEmptyString!): UserInfo!
    "Log out of the system"
    logout: UserInfo!

    "Modify own password"
    changePassword(
      oldPassword: NonEmptyString!
      password: NonEmptyString!
    ): Void @auth

    "Log navigation event"
    logNavigation(path: String!): Void @auth
  }
`;
