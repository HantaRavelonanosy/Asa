import { AuthenticationError, ForbiddenError } from "apollo-server-core";
import { mapSchema, getDirective, MapperKind } from "@graphql-tools/utils";
import { Context } from "./context";
import { AuthDirectiveArgs } from "./resolver-types";
import { defaultFieldResolver, GraphQLSchema } from "graphql";
import { UserDocument } from "../mongo";

// based on example in https://www.graphql-tools.com/docs/schema-directives

// typeDef is in schemas/user-management.ts

const DIRECTIVE_NAME = "auth";

/** roles in order */
const ROLES = [
  // UNKNOWN is indexOf -1
  "READ_ONLY", // 0
  "SIMPLE_USER", // 1
  "TEAM_LEAD", // 2
  "ADMIN", // 3
];

function checkRole(user: UserDocument, role: string) {
  if (user.role === "ADMIN") {
    return true;
  }
  if (!user.team) {
    return false; // non ADMINs *must* have a team if a role is required
  }
  return ROLES.indexOf(user.role) >= ROLES.indexOf(role);
}

export function authDirectiveTransformer(schema: GraphQLSchema): GraphQLSchema {
  const typeDirectiveArgumentMaps: Record<string, Record<string, unknown>> = {};
  return mapSchema(schema, {
    [MapperKind.TYPE]: (type) => {
      const authDirective = getDirective(schema, type, DIRECTIVE_NAME)?.[0];
      if (authDirective) {
        typeDirectiveArgumentMaps[type.name] = authDirective;
      }
      return undefined;
    },
    [MapperKind.OBJECT_FIELD]: (fieldConfig, _fieldName, typeName) => {
      const authDirective =
        getDirective(schema, fieldConfig, DIRECTIVE_NAME)?.[0] ??
        typeDirectiveArgumentMaps[typeName];
      if (authDirective) {
        // if this field has the @auth directive, wrap the resolver
        const { requires } = authDirective as AuthDirectiveArgs;
        const { resolve = defaultFieldResolver } = fieldConfig; // save a reference to original or default resolver
        fieldConfig.resolve = (source, args, ctx: Context, info) => {
          if (!ctx.user) {
            throw new AuthenticationError("Authentication required");
          }
          if (requires && !checkRole(ctx.user, requires)) {
            throw new ForbiddenError("Insufficient credentials");
          }
          return resolve(source, args, ctx, info);
        };
      }
      return fieldConfig;
    },
  });
}
