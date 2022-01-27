import { fieldsList } from "graphql-fields-list";
import { ForbiddenError, UserInputError } from "apollo-server-core";
import { Context } from "../context";
import { Resolvers } from "../resolver-types";
import { TeamDocument } from "../../mongo";

export const userResolvers: Resolvers<Context> = {
  User: {
    id(user) {
      // this resolver is required if user was not populated and is actually an ObjectId
      return user._id.toString();
    },
    async team(user, args, ctx, info) {
      if (!user.team) {
        return null;
      }
      // only populate if we need more than the id
      if (
        !user.populated("team") &&
        fieldsList(info, { skip: ["id"] }).length
      ) {
        await user.populate("team");
      }
      return user.team as TeamDocument;
    },
  },

  Team: {
    id(team) {
      return team._id.toString();
    },
    async users(team, args, ctx) {
      return ctx.m.UserModel.find({ team });
    },
    async user(team, { id }, ctx) {
      return ctx.m.UserModel.findOne({ _id: id, team });
    },
  },

  Query: {
    async users(root, args, ctx) {
      return ctx.m.UserModel.find(
        ctx.user?.role === "ADMIN" ? {} : { team: ctx.user?.team }
      );
    },
    async user(root, { id }, ctx) {
      return ctx.m.UserModel.findOne(
        ctx.user?.role === "ADMIN"
          ? { _id: id }
          : { _id: id, team: ctx.user?.team }
      );
    },

    async teams(root, args, ctx) {
      return ctx.m.TeamModel.find();
    },
    async team(root, { id }, ctx) {
      return ctx.m.TeamModel.findById(id);
    },
  },

  Mutation: {
    async createUser(
      root,
      { username, teamId, password, isDisabled, role },
      ctx
    ) {
      if (await ctx.m.UserModel.findOne({ username })) {
        throw new UserInputError("Username already taken");
      }
      let team;
      if (teamId !== undefined) {
        if (ctx.user?.role !== "ADMIN") {
          throw new ForbiddenError("Insufficient credentials");
        }
        if (teamId === null) {
          team = undefined;
        } else {
          team = await ctx.m.TeamModel.findById(teamId);
          if (!team) {
            throw new UserInputError("Team not found");
          }
        }
      }
      return ctx.m.UserModel.create({
        username,
        password,
        isDisabled,
        team,
        role,
      });
    },

    async editUser(
      root,
      { id, username, password, role, teamId, isDisabled },
      ctx
    ) {
      const user = await ctx.m.UserModel.findOne(
        ctx.user?.role === "ADMIN"
          ? { _id: id }
          : { _id: id, team: ctx.user?.team, role: { $ne: "ADMIN" } }
      );
      if (!user) {
        throw new UserInputError("User not found");
      }
      // change username
      if (username && username !== user.username) {
        if (await ctx.m.UserModel.findOne({ username })) {
          throw new UserInputError("Username already taken");
        }
        user.username = username;
      }
      // change password
      if (password) {
        user.setPassword(password);
      }

      // change role
      if (role) {
        if (id === ctx.user?.id) {
          throw new UserInputError("Cannot change role from current user");
        }
        user.role = role;
      }

      // change team
      if (teamId !== undefined) {
        if (teamId === null) {
          user.team = undefined;
        } else {
          const team = await ctx.m.TeamModel.findById(teamId);
          if (!team) {
            throw new UserInputError("Team not found");
          }
          user.team = team;
        }
      }

      // disable or enable user
      if (isDisabled != null) {
        if (id === ctx.user?.id) {
          throw new UserInputError("Cannot disable current user");
        }
        user.isDisabled = isDisabled;
        if (isDisabled === true) {
          // remove potential user sessions if we disable user
          await ctx.m.UserSessionModel.deleteMany({ user });
        }
      }
      return user.save();
    },

    async createTeam(root, { name, description }, ctx) {
      if (await ctx.m.TeamModel.findOne({ name })) {
        throw new UserInputError("Team name already taken");
      }
      return ctx.m.TeamModel.create({
        name,
        description,
      });
    },

    async editTeam(root, { id, name, description }, ctx) {
      const team = await ctx.m.TeamModel.findById(id);
      if (!team) {
        throw new UserInputError("Team not found");
      }
      if (name && name !== team.name) {
        if (await ctx.m.TeamModel.findOne({ name })) {
          throw new UserInputError("Team name already taken");
        }
        team.name = name;
      }
      if (description) {
        team.description = description;
      }
      return team.save();
    },

    async deleteTeam(root, { id }, ctx) {
      const team = await ctx.m.TeamModel.findByIdAndDelete(id);
      if (!team) {
        throw new UserInputError("Team not found");
      }
      // remove team and roles from users
      await ctx.m.UserModel.updateMany(
        { team },
        { $unset: { team: true, role: true } }
      );
    },
  },
};
