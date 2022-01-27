import { Middleware, ParameterizedContext } from "koa";
import { AuthenticationError } from "apollo-server-core";

import { UserDocument, UserSessionDocument } from "../mongo";
import * as models from "../mongo";

/** Koa app state, accessible from ctx.state */
export interface AppState {
  /** Current user */
  user?: UserDocument;
  /** Current user session */
  userSession?: UserSessionDocument;
  /** Mongoose models for current tenant */
  m: typeof models;
}

/** Koa context with our custom app state */
export type AppContext = ParameterizedContext<AppState>;

/** Cookie name for the session token */
const COOKIE_NAME = "sessionToken";

/** Koa middleware setting up state and user session information */
export const sessionMiddleware: Middleware<AppState> = async (ctx, next) => {
  ctx.state.m = models; // TODO handle multi-tenants

  // setup user session
  const token = ctx.cookies.get(COOKIE_NAME);
  if (token) {
    const session = await ctx.state.m.UserSessionModel.findOne({
      token,
    }).populate("user");
    if (
      session?.populated("user") &&
      !(session?.user as UserDocument)?.isDisabled
    ) {
      // session was found, user exists and is not disabled
      ctx.state.userSession = session;
      ctx.state.user = session.user as UserDocument;
      void session.refresh(); // refresh session expiry without blocking
    } else {
      // session is invalid, remove it
      await session?.delete();
      ctx.cookies.set(COOKIE_NAME);
    }
  }

  return next();
};

/** User log in */
export async function login(
  username: string,
  password: string,
  ctx: AppContext
): Promise<UserDocument> {
  // first, logout if needed, only one session at a time
  await logout(ctx);

  // check credentials
  const user = await ctx.state.m.UserModel.findOne({ username });
  if (user?.isDisabled || !user?.checkPassword(password)) {
    throw new AuthenticationError("Invalid username or password");
  }
  // credentials are OK

  // ensure only one session at a time per user
  await ctx.state.m.UserSessionModel.deleteMany({ user });
  // store last login date
  user.lastLogIn = new Date();
  await user.save();
  // create new session
  const session = await ctx.state.m.UserSessionModel.create({ user });
  ctx.cookies.set(COOKIE_NAME, session.token);

  // return user info
  return user;
}

/** User log out */
export async function logout(ctx: AppContext): Promise<void> {
  if (ctx.state.userSession) {
    await ctx.state.userSession.delete();
  }
  if (ctx.cookies.get(COOKIE_NAME)) {
    // remove session cookie
    ctx.cookies.set(COOKIE_NAME);
  }
}
