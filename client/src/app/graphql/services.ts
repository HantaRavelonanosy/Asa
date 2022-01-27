import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
  BigInt: unknown;
  /** The `Byte` scalar type represents byte value as a Buffer */
  Byte: unknown;
  /** A field whose value is a Currency: https://en.wikipedia.org/wiki/ISO_4217. */
  Currency: unknown;
  /** A field whose value conforms to the standard DID format as specified in did-core: https://www.w3.org/TR/did-core/. */
  DID: unknown;
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: unknown;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: string;
  /**
   *
   *     A string representing a duration conforming to the ISO8601 standard,
   *     such as: P1W1DT13H23M34S
   *     P is the duration designator (for period) placed at the start of the duration representation.
   *     Y is the year designator that follows the value for the number of years.
   *     M is the month designator that follows the value for the number of months.
   *     W is the week designator that follows the value for the number of weeks.
   *     D is the day designator that follows the value for the number of days.
   *     T is the time designator that precedes the time components of the representation.
   *     H is the hour designator that follows the value for the number of hours.
   *     M is the minute designator that follows the value for the number of minutes.
   *     S is the second designator that follows the value for the number of seconds.
   *
   *     Note the time designator, T, that precedes the time value.
   *
   *     Matches moment.js, Luxon and DateFns implementations
   *     ,/. is valid for decimal places and +/- is a valid prefix
   *
   */
  Duration: unknown;
  /** A field whose value conforms to the standard internet email address format as specified in RFC822: https://www.w3.org/Protocols/rfc822/. */
  EmailAddress: unknown;
  /** A field whose value is a generic Universally Unique Identifier: https://en.wikipedia.org/wiki/Universally_unique_identifier. */
  GUID: unknown;
  /** A field whose value is a CSS HSL color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#hsl()_and_hsla(). */
  HSL: unknown;
  /** A field whose value is a CSS HSLA color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#hsl()_and_hsla(). */
  HSLA: unknown;
  /** A field whose value is a hex color code: https://en.wikipedia.org/wiki/Web_colors. */
  HexColorCode: unknown;
  /** A field whose value is a hexadecimal: https://en.wikipedia.org/wiki/Hexadecimal. */
  Hexadecimal: unknown;
  /** A field whose value is an International Bank Account Number (IBAN): https://en.wikipedia.org/wiki/International_Bank_Account_Number. */
  IBAN: unknown;
  /** A field whose value is a IPv4 address: https://en.wikipedia.org/wiki/IPv4. */
  IPv4: unknown;
  /** A field whose value is a IPv6 address: https://en.wikipedia.org/wiki/IPv6. */
  IPv6: unknown;
  /** A field whose value is a ISBN-10 or ISBN-13 number: https://en.wikipedia.org/wiki/International_Standard_Book_Number. */
  ISBN: unknown;
  /**
   *
   *     A string representing a duration conforming to the ISO8601 standard,
   *     such as: P1W1DT13H23M34S
   *     P is the duration designator (for period) placed at the start of the duration representation.
   *     Y is the year designator that follows the value for the number of years.
   *     M is the month designator that follows the value for the number of months.
   *     W is the week designator that follows the value for the number of weeks.
   *     D is the day designator that follows the value for the number of days.
   *     T is the time designator that precedes the time components of the representation.
   *     H is the hour designator that follows the value for the number of hours.
   *     M is the minute designator that follows the value for the number of minutes.
   *     S is the second designator that follows the value for the number of seconds.
   *
   *     Note the time designator, T, that precedes the time value.
   *
   *     Matches moment.js, Luxon and DateFns implementations
   *     ,/. is valid for decimal places and +/- is a valid prefix
   *
   */
  ISO8601Duration: unknown;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: unknown;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: Record<string, unknown>;
  /** A field whose value is a JSON Web Token (JWT): https://jwt.io/introduction. */
  JWT: unknown;
  /** A field whose value is a valid decimal degrees latitude number (53.471): https://en.wikipedia.org/wiki/Latitude */
  Latitude: unknown;
  /** A local date string (i.e., with no associated timezone) in `YYYY-MM-DD` format, e.g. `2020-01-01`. */
  LocalDate: unknown;
  /** A local time string (i.e., with no associated timezone) in 24-hr `HH:mm[:ss[.SSS]]` format, e.g. `14:25` or `14:25:06` or `14:25:06.123`.  This scalar is very similar to the `LocalTime`, with the only difference being that `LocalEndTime` also allows `24:00` as a valid value to indicate midnight of the following day.  This is useful when using the scalar to represent the exclusive upper bound of a time block. */
  LocalEndTime: unknown;
  /** A local time string (i.e., with no associated timezone) in 24-hr `HH:mm[:ss[.SSS]]` format, e.g. `14:25` or `14:25:06` or `14:25:06.123`. */
  LocalTime: unknown;
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
  Long: unknown;
  /** A field whose value is a valid decimal degrees longitude number (53.471): https://en.wikipedia.org/wiki/Longitude */
  Longitude: unknown;
  /** A field whose value is a IEEE 802 48-bit MAC address: https://en.wikipedia.org/wiki/MAC_address. */
  MAC: unknown;
  /** Floats that will have a value less than 0. */
  NegativeFloat: unknown;
  /** Integers that will have a value less than 0. */
  NegativeInt: unknown;
  /** A string that cannot be passed as an empty value */
  NonEmptyString: string;
  /** Floats that will have a value of 0 or more. */
  NonNegativeFloat: unknown;
  /** Integers that will have a value of 0 or more. */
  NonNegativeInt: number;
  /** Floats that will have a value of 0 or less. */
  NonPositiveFloat: unknown;
  /** Integers that will have a value of 0 or less. */
  NonPositiveInt: unknown;
  /** A field whose value conforms with the standard mongodb object ID as described here: https://docs.mongodb.com/manual/reference/method/ObjectId/#ObjectId. Example: 5e5677d71bdc2ae76344968c */
  ObjectID: unknown;
  /** A field whose value conforms to the standard E.164 format as specified in: https://en.wikipedia.org/wiki/E.164. Basically this is +17895551234. */
  PhoneNumber: unknown;
  /** A field whose value is a valid TCP port within the range of 0 to 65535: https://en.wikipedia.org/wiki/Transmission_Control_Protocol#TCP_ports */
  Port: unknown;
  /** Floats that will have a value greater than 0. */
  PositiveFloat: unknown;
  /** Integers that will have a value greater than 0. */
  PositiveInt: number;
  /** A field whose value conforms to the standard postal code formats for United States, United Kingdom, Germany, Canada, France, Italy, Australia, Netherlands, Spain, Denmark, Sweden, Belgium, India, Austria, Portugal, Switzerland or Luxembourg. */
  PostalCode: unknown;
  /** A field whose value is a CSS RGB color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb()_and_rgba(). */
  RGB: unknown;
  /** A field whose value is a CSS RGBA color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb()_and_rgba(). */
  RGBA: unknown;
  /** The `SafeInt` scalar type represents non-fractional signed whole numeric values that are considered safe as defined by the ECMAScript specification. */
  SafeInt: unknown;
  /** A time string at UTC, such as 10:15:30Z, compliant with the `full-time` format outlined in section 5.6 of the RFC 3339profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Time: unknown;
  /** The javascript `Date` as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
  Timestamp: unknown;
  /** A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt. */
  URL: unknown;
  /** A currency string, such as $21.25 */
  USCurrency: unknown;
  /** A field whose value is a generic Universally Unique Identifier: https://en.wikipedia.org/wiki/Universally_unique_identifier. */
  UUID: unknown;
  /** Floats that will have a value of 0 or more. */
  UnsignedFloat: unknown;
  /** Integers that will have a value of 0 or more. */
  UnsignedInt: unknown;
  /** A field whose value is a UTC Offset: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones */
  UtcOffset: unknown;
  /** Represents NULL values */
  Void: void;
};

export enum Module {
  Dashboard = 'DASHBOARD'
}

export enum UserRole {
  Admin = 'ADMIN',
  ReadOnly = 'READ_ONLY',
  SimpleUser = 'SIMPLE_USER',
  TeamLead = 'TEAM_LEAD',
  Unknown = 'UNKNOWN'
}

export type TeamListQueryVariables = Exact<{ [key: string]: never; }>;


export type TeamListQuery = { __typename?: 'Query', teams: Array<{ __typename?: 'Team', id: string, name: string, description?: string | null | undefined }> };

export type TeamDetailQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type TeamDetailQuery = { __typename?: 'Query', team?: { __typename?: 'Team', id: string, name: string, description?: string | null | undefined } | null | undefined };

export type CreateTeamMutationVariables = Exact<{
  name: Scalars['NonEmptyString'];
  description?: InputMaybe<Scalars['String']>;
}>;


export type CreateTeamMutation = { __typename?: 'Mutation', team: { __typename?: 'Team', id: string, name: string, description?: string | null | undefined } };

export type EditTeamMutationVariables = Exact<{
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['NonEmptyString']>;
  description?: InputMaybe<Scalars['String']>;
}>;


export type EditTeamMutation = { __typename?: 'Mutation', team: { __typename?: 'Team', id: string, name: string, description?: string | null | undefined } };

export type DeleteTeamMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteTeamMutation = { __typename?: 'Mutation', deleteTeam?: void | null | undefined };

export type UserFieldsFragment = { __typename?: 'User', id: string, username: string, role: UserRole, isDisabled: boolean, team?: { __typename?: 'Team', id: string, name: string } | null | undefined };

export type UserListQueryVariables = Exact<{ [key: string]: never; }>;


export type UserListQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, username: string, role: UserRole, isDisabled: boolean, team?: { __typename?: 'Team', id: string, name: string } | null | undefined }> };

export type UserDetailQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UserDetailQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, username: string, role: UserRole, isDisabled: boolean, team?: { __typename?: 'Team', id: string, name: string } | null | undefined } | null | undefined };

export type CreateUserMutationVariables = Exact<{
  username: Scalars['NonEmptyString'];
  password?: InputMaybe<Scalars['String']>;
  role: UserRole;
  teamId?: InputMaybe<Scalars['ID']>;
  isDisabled?: InputMaybe<Scalars['Boolean']>;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', user: { __typename?: 'User', id: string, username: string, role: UserRole, isDisabled: boolean, team?: { __typename?: 'Team', id: string, name: string } | null | undefined } };

export type EditUserMutationVariables = Exact<{
  id: Scalars['ID'];
  username?: InputMaybe<Scalars['NonEmptyString']>;
  password?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<UserRole>;
  teamId?: InputMaybe<Scalars['ID']>;
  isDisabled?: InputMaybe<Scalars['Boolean']>;
}>;


export type EditUserMutation = { __typename?: 'Mutation', user: { __typename?: 'User', id: string, username: string, role: UserRole, isDisabled: boolean, team?: { __typename?: 'Team', id: string, name: string } | null | undefined } };

export type UserInfoFieldsFragment = { __typename?: 'UserInfo', loggedIn: boolean, modules?: Array<Module> | null | undefined, user?: { __typename?: 'User', id: string, username: string, role: UserRole } | null | undefined };

export type UserInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type UserInfoQuery = { __typename?: 'Query', userInfo: { __typename?: 'UserInfo', loggedIn: boolean, modules?: Array<Module> | null | undefined, user?: { __typename?: 'User', id: string, username: string, role: UserRole } | null | undefined } };

export type LoginMutationVariables = Exact<{
  username: Scalars['NonEmptyString'];
  password: Scalars['NonEmptyString'];
}>;


export type LoginMutation = { __typename?: 'Mutation', userInfo: { __typename?: 'UserInfo', loggedIn: boolean, modules?: Array<Module> | null | undefined, user?: { __typename?: 'User', id: string, username: string, role: UserRole } | null | undefined } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', userInfo: { __typename?: 'UserInfo', loggedIn: boolean, modules?: Array<Module> | null | undefined, user?: { __typename?: 'User', id: string, username: string, role: UserRole } | null | undefined } };

export type LogNavigationMutationVariables = Exact<{
  path: Scalars['String'];
}>;


export type LogNavigationMutation = { __typename?: 'Mutation', logNavigation?: void | null | undefined };

export type ChangePasswordMutationVariables = Exact<{
  oldPassword: Scalars['NonEmptyString'];
  password: Scalars['NonEmptyString'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword?: void | null | undefined };

export const UserFieldsFragmentDoc = gql`
    fragment userFields on User {
  id
  username
  role
  isDisabled
  team {
    id
    name
  }
}
    `;
export const UserInfoFieldsFragmentDoc = gql`
    fragment userInfoFields on UserInfo {
  loggedIn
  user {
    id
    username
    role
  }
  modules
}
    `;
export const TeamListDocument = gql`
    query teamList {
  teams {
    id
    name
    description
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class TeamListGQL extends Apollo.Query<TeamListQuery, TeamListQueryVariables> {
    document = TeamListDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const TeamDetailDocument = gql`
    query teamDetail($id: ID!) {
  team(id: $id) {
    id
    name
    description
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class TeamDetailGQL extends Apollo.Query<TeamDetailQuery, TeamDetailQueryVariables> {
    document = TeamDetailDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateTeamDocument = gql`
    mutation createTeam($name: NonEmptyString!, $description: String) {
  team: createTeam(name: $name, description: $description) {
    id
    name
    description
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateTeamGQL extends Apollo.Mutation<CreateTeamMutation, CreateTeamMutationVariables> {
    document = CreateTeamDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const EditTeamDocument = gql`
    mutation editTeam($id: ID!, $name: NonEmptyString, $description: String) {
  team: editTeam(id: $id, name: $name, description: $description) {
    id
    name
    description
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class EditTeamGQL extends Apollo.Mutation<EditTeamMutation, EditTeamMutationVariables> {
    document = EditTeamDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteTeamDocument = gql`
    mutation deleteTeam($id: ID!) {
  deleteTeam(id: $id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteTeamGQL extends Apollo.Mutation<DeleteTeamMutation, DeleteTeamMutationVariables> {
    document = DeleteTeamDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UserListDocument = gql`
    query userList {
  users {
    ...userFields
  }
}
    ${UserFieldsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UserListGQL extends Apollo.Query<UserListQuery, UserListQueryVariables> {
    document = UserListDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UserDetailDocument = gql`
    query userDetail($id: ID!) {
  user(id: $id) {
    ...userFields
  }
}
    ${UserFieldsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UserDetailGQL extends Apollo.Query<UserDetailQuery, UserDetailQueryVariables> {
    document = UserDetailDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateUserDocument = gql`
    mutation createUser($username: NonEmptyString!, $password: String, $role: UserRole!, $teamId: ID, $isDisabled: Boolean) {
  user: createUser(
    username: $username
    password: $password
    role: $role
    teamId: $teamId
    isDisabled: $isDisabled
  ) {
    ...userFields
  }
}
    ${UserFieldsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateUserGQL extends Apollo.Mutation<CreateUserMutation, CreateUserMutationVariables> {
    document = CreateUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const EditUserDocument = gql`
    mutation editUser($id: ID!, $username: NonEmptyString, $password: String, $role: UserRole, $teamId: ID, $isDisabled: Boolean) {
  user: editUser(
    id: $id
    username: $username
    password: $password
    role: $role
    teamId: $teamId
    isDisabled: $isDisabled
  ) {
    ...userFields
  }
}
    ${UserFieldsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class EditUserGQL extends Apollo.Mutation<EditUserMutation, EditUserMutationVariables> {
    document = EditUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UserInfoDocument = gql`
    query UserInfo {
  userInfo {
    ...userInfoFields
  }
}
    ${UserInfoFieldsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UserInfoGQL extends Apollo.Query<UserInfoQuery, UserInfoQueryVariables> {
    document = UserInfoDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const LoginDocument = gql`
    mutation login($username: NonEmptyString!, $password: NonEmptyString!) {
  userInfo: login(username: $username, password: $password) {
    ...userInfoFields
  }
}
    ${UserInfoFieldsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class LoginGQL extends Apollo.Mutation<LoginMutation, LoginMutationVariables> {
    document = LoginDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const LogoutDocument = gql`
    mutation logout {
  userInfo: logout {
    ...userInfoFields
  }
}
    ${UserInfoFieldsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class LogoutGQL extends Apollo.Mutation<LogoutMutation, LogoutMutationVariables> {
    document = LogoutDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const LogNavigationDocument = gql`
    mutation logNavigation($path: String!) {
  logNavigation(path: $path)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class LogNavigationGQL extends Apollo.Mutation<LogNavigationMutation, LogNavigationMutationVariables> {
    document = LogNavigationDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ChangePasswordDocument = gql`
    mutation changePassword($oldPassword: NonEmptyString!, $password: NonEmptyString!) {
  changePassword(oldPassword: $oldPassword, password: $password)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ChangePasswordGQL extends Apollo.Mutation<ChangePasswordMutation, ChangePasswordMutationVariables> {
    document = ChangePasswordDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }