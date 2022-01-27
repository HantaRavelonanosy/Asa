import { UserDocument } from "../mongo/models/user";
import { UserSessionDocument } from "../mongo/models/user-session";
import * as models from "../mongo";
import { AppContext } from "../util/session";

/** Graphql query context passed to resolvers */
export interface Context {
  /** Current user mongoose document if any */
  user?: UserDocument;
  userSession?: UserSessionDocument;
  /** Access to koa context */
  ctx: AppContext;
  /** Mongoose models for the current tenant */
  m: typeof models;
}

export function getContext({ ctx }: { ctx: AppContext }): Context {
  return {
    ...ctx.state,
    ctx,
  };
}
