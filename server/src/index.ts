import { ApolloServer } from "apollo-server-express";
import { json, urlencoded } from "body-parser";
import MongoStore from "connect-mongo";
import cors from "cors";
import "dotenv-safe/config";
import express from "express";
import session from "express-session";
import { connect } from "mongoose";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import {
	__clientUrl__,
	__port__,
	__prod__,
	__serverUrl__
} from "./lib/constants";
import { HelloResolver } from "./resolvers/hello";
import { UserResolver } from "./resolvers/user";

(async () => {
	await connect(process.env.MONGO_URI!, { dbName: "teachersonly" });

	const app = express();

	app.use(
		cors({
			origin: [
				__clientUrl__,
				__serverUrl__,
				"https://studio.apollographql.com"
			],
			credentials: true
		})
	);

	app.use(urlencoded({ extended: true }));
	app.use(json());

	app.set("trust proxy", true);

	app.use(
		session({
			name: "qid",
			secret: process.env.SESSION_SECRET!,
			store: MongoStore.create({
				mongoUrl: process.env.MONGO_URI,
				dbName: "teachersonly"
			}),
			saveUninitialized: false,
			resave: false,
			cookie: {
				maxAge: 6.048e8,
				httpOnly: true,
				sameSite: "lax",
				secure: __prod__
			}
		})
	);

	const server = new ApolloServer({
		schema: await buildSchema({
			resolvers: [HelloResolver, UserResolver],
			validate: false
		}),
		context: ({ req, res }) => ({ req, res })
	});

	await server.start();

	server.applyMiddleware({
		app,
		cors: {
			origin: [
				__clientUrl__,
				__serverUrl__,
				"https://studio.apollographql.com"
			],
			credentials: true
		}
	});

	app.listen(__port__, () =>
		console.log(
			`🚀 Server started at http://localhost:${__port__}${server.graphqlPath}`
		)
	);
})();
