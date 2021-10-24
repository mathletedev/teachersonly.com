import { ApolloServer } from "apollo-server-express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv-safe/config";
import express from "express";
import { verify } from "jsonwebtoken";
import { connect } from "mongoose";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { UserModel } from "./entities/user";
import { setTokens } from "./lib/auth";
import { __clientUrl__, __graphqlUrl__, __port__ } from "./lib/constants";
import { HelloResolver } from "./resolvers/hello";
import { UserResolver } from "./resolvers/user";

(async () => {
	await connect(process.env.MONGO_URI!, { dbName: "teachersonly" });

	const app = express();

	app.use(
		cors({
			origin: [__clientUrl__, __graphqlUrl__],
			credentials: true
		})
	);

	app.use(cookieParser());

	app.use(async (req, res, next) => {
		const refreshToken = req.cookies["refresh-token"];
		const accessToken = req.cookies["access-token"];

		if (!refreshToken && !accessToken) return next();

		try {
			req.userId = (
				verify(accessToken, process.env.ACCESS_SECRET!) as any
			).userId;

			return next();
		} catch {}

		if (!refreshToken) return next();

		let data;

		try {
			data = verify(refreshToken, process.env.REFRESH_SECRET!) as any;
		} catch {
			return next();
		}

		const user = await UserModel.findById(data.userId);
		if (!user || user.count !== data.count) return next();

		setTokens(res, user);
		req.userId = user._id.toString();

		next();
	});

	const server = new ApolloServer({
		schema: await buildSchema({
			resolvers: [HelloResolver, UserResolver],
			validate: false
		}),
		context: ({ req, res }) => {
			res.header(
				"Access-Control-Allow-Origin",
				process.env.EXPLORER === "true"
					? __graphqlUrl__
					: __clientUrl__
			);
			res.header("Access-Control-Allow-Credentials", "true");

			return { req, res };
		}
	});

	await server.start();

	server.applyMiddleware({
		app,
		cors: {
			origin: [__clientUrl__, __graphqlUrl__],
			credentials: true
		}
	});

	app.listen(__port__, () =>
		console.log(
			`🚀 Server started at http://localhost:${__port__}${server.graphqlPath}`
		)
	);
})();
