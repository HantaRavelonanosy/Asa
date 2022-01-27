import { mergeSchemas } from "@graphql-tools/schema";

// @auth directive
import { authDirectiveTransformer } from "./auth-directive";

// custom scalars
import {
  resolvers as scalarResolvers,
  typeDefs as scalarTypeDefs,
} from "graphql-scalars";

// typeDefs
import { userTypeDefs } from "./schemas/user-management";
import { userSessionTypeDefs } from "./schemas/user-sessions";

// resolvers
import { userResolvers } from "./resolvers/user-management";
import { userSessionResolvers } from "./resolvers/user-sessions";

export const schema = authDirectiveTransformer(
  mergeSchemas({
    // GraphQL type definitions
    typeDefs: [
      userTypeDefs,
      userSessionTypeDefs,
      // graphq-scalars type definitions
      scalarTypeDefs,
    ],

    // GraphQL resolvers
    resolvers: [
      userResolvers,
      userSessionResolvers,
      // custom scalars resolvers
      scalarResolvers,
    ],
  })
);
