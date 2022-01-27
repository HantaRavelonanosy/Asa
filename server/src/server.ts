import Koa from "koa";
import mongoose from "mongoose";
import { ApolloServer } from "apollo-server-koa";
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled,
} from "apollo-server-core";
import { sessionMiddleware, AppState } from "./util/session";
import { schema } from "./graphql/schema";
import { getContext } from "./graphql/context";
import { UserModel } from "./mongo/models/user";

// connection parameters
import { MONGO_URL, PORT } from "./config";

/**
 * Main loop
 */
async function main() {
  // create koa app
  const app = new Koa<AppState>({
    proxy: true, // trust proxy headers
  });
  // handle session cookie
  app.use(sessionMiddleware);
  // mount graphql server
  const apolloServer = new ApolloServer({
    schema,
    context: getContext,
    plugins: [
      // serve graphql playground in dev mode and nothing in prod mode
      process.env.NODE_ENV === "production"
        ? ApolloServerPluginLandingPageDisabled
        : ApolloServerPluginLandingPageGraphQLPlayground,
    ],
  });
  await apolloServer.start(); // will fail here if graphql schema has errors
  apolloServer.applyMiddleware({ app, path: "/api/graphql" });

  // connect to mongo database
  await mongoose.connect(MONGO_URL);
  console.log(`Connected to ${MONGO_URL}`);

  // start server
  app
    .listen(PORT)
    .on("listening", () => console.log(`Server ready on port ${PORT}`));

  // create default admin user
  await createAdmin();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

/**
 * Create default admin user
 * @todo remove this
 */
async function createAdmin() {
  const user = await UserModel.findOne({ username: "admin" });
  if (!user) {
    await UserModel.create({
      username: "admin",
      password: "admin",
      role: "ADMIN",
    });
    console.log("Created user 'admin'");
  }
}
