import { ApolloServer } from "apollo-server-express";
import "dotenv-safe/config";
import express from "express";
import { connect } from "mongoose";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { __port__ } from "./lib/constants";
import { HelloResolver } from "./resolvers/hello";
import { UserResolver } from "./resolvers/user";

(async () => {
	await connect(process.env.MONGO_URI!, { dbName: "teachersonly" });

	const app = express();

	const server = new ApolloServer({
		schema: await buildSchema({
			resolvers: [HelloResolver, UserResolver],
			validate: false
		})
	});

	await server.start();

	server.applyMiddleware({
		app,
		cors: { origin: "*", credentials: true }
	});

	app.listen(__port__, () =>
		console.log(
			`🚀 Server started at http://localhost:${__port__}${server.graphqlPath}`
		)
	);
})();
