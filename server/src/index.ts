import { ApolloServer } from "apollo-server-express";
import express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { __port__ } from "./lib/constants";
import { HelloResolver } from "./resolvers/hello";

(async () => {
	const app = express();

	const server = new ApolloServer({
		schema: await buildSchema({
			resolvers: [HelloResolver],
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
