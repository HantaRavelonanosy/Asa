import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from "graphql";
import { UserDocument, TeamDocument } from "../mongo";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X];
} & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: Date;
  NonEmptyString: string;
  Void: void;
};

export type Module = "DASHBOARD";

export type Mutation = {
  __typename?: "Mutation";
  /** Modify own password */
  changePassword?: Maybe<Scalars["Void"]>;
  /** Create a new team */
  createTeam: Team;
  /** Create a new user */
  createUser: User;
  /** Delete a team */
  deleteTeam?: Maybe<Scalars["Void"]>;
  /** Edit a team name or description */
  editTeam: Team;
  /** Edit user info */
  editUser: User;
  /** Log navigation event */
  logNavigation?: Maybe<Scalars["Void"]>;
  /** Log in into the system */
  login: UserInfo;
  /** Log out of the system */
  logout: UserInfo;
};

export type MutationChangePasswordArgs = {
  oldPassword: Scalars["NonEmptyString"];
  password: Scalars["NonEmptyString"];
};

export type MutationCreateTeamArgs = {
  description?: InputMaybe<Scalars["String"]>;
  name: Scalars["NonEmptyString"];
};

export type MutationCreateUserArgs = {
  isDisabled?: InputMaybe<Scalars["Boolean"]>;
  password?: InputMaybe<Scalars["String"]>;
  role?: InputMaybe<UserRole>;
  teamId?: InputMaybe<Scalars["ID"]>;
  username: Scalars["NonEmptyString"];
};

export type MutationDeleteTeamArgs = {
  id: Scalars["ID"];
};

export type MutationEditTeamArgs = {
  description?: InputMaybe<Scalars["String"]>;
  id: Scalars["ID"];
  name?: InputMaybe<Scalars["NonEmptyString"]>;
};

export type MutationEditUserArgs = {
  id: Scalars["ID"];
  isDisabled?: InputMaybe<Scalars["Boolean"]>;
  password?: InputMaybe<Scalars["String"]>;
  role?: InputMaybe<UserRole>;
  teamId?: InputMaybe<Scalars["ID"]>;
  username?: InputMaybe<Scalars["NonEmptyString"]>;
};

export type MutationLogNavigationArgs = {
  path: Scalars["String"];
};

export type MutationLoginArgs = {
  password: Scalars["NonEmptyString"];
  username: Scalars["NonEmptyString"];
};

export type Query = {
  __typename?: "Query";
  /** Get a team by id */
  team?: Maybe<Team>;
  /** List of all teams */
  teams: Array<Team>;
  /** Get a user by id */
  user?: Maybe<User>;
  /** Get info of current user */
  userInfo: UserInfo;
  /** List of all users of the system */
  users: Array<User>;
};

export type QueryTeamArgs = {
  id: Scalars["ID"];
};

export type QueryUserArgs = {
  id: Scalars["ID"];
};

/** A team of users */
export type Team = {
  __typename?: "Team";
  createdAt: Scalars["DateTime"];
  description?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  name: Scalars["String"];
  updatedAt: Scalars["DateTime"];
  /** Get a user from the team by id */
  user?: Maybe<User>;
  /** List of all team users */
  users: Array<User>;
};

/** A team of users */
export type TeamUserArgs = {
  id: Scalars["ID"];
};

/** A user of the system */
export type User = {
  __typename?: "User";
  createdAt: Scalars["DateTime"];
  id: Scalars["ID"];
  /** A disabled user wont be able to log into the system */
  isDisabled: Scalars["Boolean"];
  role: UserRole;
  team?: Maybe<Team>;
  updatedAt: Scalars["DateTime"];
  username: Scalars["String"];
};

/** Information about the current user */
export type UserInfo = {
  __typename?: "UserInfo";
  loggedIn: Scalars["Boolean"];
  /** List of modules the user has access to */
  modules?: Maybe<Array<Module>>;
  /** Current user */
  user?: Maybe<User>;
};

export type UserRole =
  | "ADMIN"
  | "READ_ONLY"
  | "SIMPLE_USER"
  | "TEAM_LEAD"
  | "UNKNOWN";

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  DateTime: ResolverTypeWrapper<Scalars["DateTime"]>;
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  Module: Module;
  Mutation: ResolverTypeWrapper<{}>;
  NonEmptyString: ResolverTypeWrapper<Scalars["NonEmptyString"]>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  Team: ResolverTypeWrapper<TeamDocument>;
  User: ResolverTypeWrapper<UserDocument>;
  UserInfo: ResolverTypeWrapper<
    Omit<UserInfo, "user"> & { user?: Maybe<ResolversTypes["User"]> }
  >;
  UserRole: UserRole;
  Void: ResolverTypeWrapper<Scalars["Void"]>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars["Boolean"];
  DateTime: Scalars["DateTime"];
  ID: Scalars["ID"];
  Mutation: {};
  NonEmptyString: Scalars["NonEmptyString"];
  Query: {};
  String: Scalars["String"];
  Team: TeamDocument;
  User: UserDocument;
  UserInfo: Omit<UserInfo, "user"> & {
    user?: Maybe<ResolversParentTypes["User"]>;
  };
  Void: Scalars["Void"];
}>;

export type AuthDirectiveArgs = {
  requires?: Maybe<UserRole>;
};

export type AuthDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = AuthDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["DateTime"], any> {
  name: "DateTime";
}

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = ResolversObject<{
  changePassword?: Resolver<
    Maybe<ResolversTypes["Void"]>,
    ParentType,
    ContextType,
    RequireFields<MutationChangePasswordArgs, "oldPassword" | "password">
  >;
  createTeam?: Resolver<
    ResolversTypes["Team"],
    ParentType,
    ContextType,
    RequireFields<MutationCreateTeamArgs, "name">
  >;
  createUser?: Resolver<
    ResolversTypes["User"],
    ParentType,
    ContextType,
    RequireFields<MutationCreateUserArgs, "isDisabled" | "role" | "username">
  >;
  deleteTeam?: Resolver<
    Maybe<ResolversTypes["Void"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteTeamArgs, "id">
  >;
  editTeam?: Resolver<
    ResolversTypes["Team"],
    ParentType,
    ContextType,
    RequireFields<MutationEditTeamArgs, "id">
  >;
  editUser?: Resolver<
    ResolversTypes["User"],
    ParentType,
    ContextType,
    RequireFields<MutationEditUserArgs, "id">
  >;
  logNavigation?: Resolver<
    Maybe<ResolversTypes["Void"]>,
    ParentType,
    ContextType,
    RequireFields<MutationLogNavigationArgs, "path">
  >;
  login?: Resolver<
    ResolversTypes["UserInfo"],
    ParentType,
    ContextType,
    RequireFields<MutationLoginArgs, "password" | "username">
  >;
  logout?: Resolver<ResolversTypes["UserInfo"], ParentType, ContextType>;
}>;

export interface NonEmptyStringScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["NonEmptyString"], any> {
  name: "NonEmptyString";
}

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = ResolversObject<{
  team?: Resolver<
    Maybe<ResolversTypes["Team"]>,
    ParentType,
    ContextType,
    RequireFields<QueryTeamArgs, "id">
  >;
  teams?: Resolver<Array<ResolversTypes["Team"]>, ParentType, ContextType>;
  user?: Resolver<
    Maybe<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    RequireFields<QueryUserArgs, "id">
  >;
  userInfo?: Resolver<ResolversTypes["UserInfo"], ParentType, ContextType>;
  users?: Resolver<Array<ResolversTypes["User"]>, ParentType, ContextType>;
}>;

export type TeamResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Team"] = ResolversParentTypes["Team"]
> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  description?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  user?: Resolver<
    Maybe<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    RequireFields<TeamUserArgs, "id">
  >;
  users?: Resolver<Array<ResolversTypes["User"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]
> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  isDisabled?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  role?: Resolver<ResolversTypes["UserRole"], ParentType, ContextType>;
  team?: Resolver<Maybe<ResolversTypes["Team"]>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  username?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserInfoResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["UserInfo"] = ResolversParentTypes["UserInfo"]
> = ResolversObject<{
  loggedIn?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  modules?: Resolver<
    Maybe<Array<ResolversTypes["Module"]>>,
    ParentType,
    ContextType
  >;
  user?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface VoidScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Void"], any> {
  name: "Void";
}

export type Resolvers<ContextType = any> = ResolversObject<{
  DateTime?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  NonEmptyString?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  Team?: TeamResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserInfo?: UserInfoResolvers<ContextType>;
  Void?: GraphQLScalarType;
}>;

export type DirectiveResolvers<ContextType = any> = ResolversObject<{
  auth?: AuthDirectiveResolver<any, any, ContextType>;
}>;
