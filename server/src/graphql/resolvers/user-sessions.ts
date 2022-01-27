import { Context } from "../context";
import { Resolvers } from "../resolver-types";
import { login, logout } from "../../util/session";
import { AuthenticationError } from "apollo-server-core";

export const userSessionResolvers: Resolvers<Context> = {
  Query: {
    userInfo(root, args, ctx) {
      return {
        loggedIn: !!ctx.user,
        user: ctx.user,
      };
    },
  },

  UserInfo: {
    modules(root, args, ctx) {
      if (!ctx.user) {
        return null;
      }
      return ["DASHBOARD"];
    },
  },

  Mutation: {
    async login(root, { username, password }, ctx) {
      const user = await login(username, password, ctx.ctx);
      return {
        loggedIn: true,
        user,
      };
    },

    async logout(root, args, ctx) {
      await logout(ctx.ctx);
      return {
        loggedIn: false,
      };
    },

    async changePassword(root, { oldPassword, password }, ctx) {
      if (!ctx.user?.checkPassword(oldPassword)) {
        throw new AuthenticationError("Invalid Password");
      }
      ctx.user?.setPassword(password);
      await ctx.user?.save();
    },
  },
};
