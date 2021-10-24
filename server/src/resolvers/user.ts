import { hash, verify } from "argon2";
import "dotenv-safe/config";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { User, UserModel } from "../entities/user";
import { setTokens } from "../lib/auth";
import { __prod__ } from "../lib/constants";
import { Context } from "../lib/types";

@Resolver()
export class UserResolver {
	@Mutation(() => User, { nullable: true })
	public async register(
		@Arg("username") username: string,
		@Arg("email") email: string,
		@Arg("password") password: string
	) {
		const hashed = await hash(password);

		try {
			const user = new UserModel({ username, email, password: hashed });
			await user.save();

			return user;
		} catch (err) {
			return;
		}
	}

	@Mutation(() => Boolean)
	public async login(
		@Arg("username") username: string,
		@Arg("password") password: string,
		@Ctx() { res }: Context
	) {
		const user = await UserModel.findOne(
			username.includes("@") ? { email: username } : { username }
		);
		if (!user) return false;

		if (!(await verify(user.password, password))) return false;

		setTokens(res, user);

		return true;
	}

	@Query(() => User, { nullable: true })
	public async me(@Ctx() { req }: Context) {
		if (!req.userId) return;

		return await UserModel.findById(req.userId);
	}

	@Mutation(() => Boolean)
	public logout(@Ctx() { res }: Context) {
		res.cookie("refresh-token", "", {
			maxAge: 0,
			sameSite:
				process.env.EXPLORER === "true" ? "none" : __prod__ ? "none" : "lax",
			secure: process.env.EXPLORER === "true" ? true : __prod__
		});
		res.cookie("access-token", "", {
			maxAge: 0,
			sameSite:
				process.env.EXPLORER === "true" ? "none" : __prod__ ? "none" : "lax",
			secure: process.env.EXPLORER === "true" ? true : __prod__
		});

		return true;
	}

	@Query(() => [User])
	public async users() {
		return await UserModel.find();
	}

	@Mutation(() => Boolean)
	public async invalidateTokens(@Ctx() { req }: Context) {
		if (!req.userId) return false;

		const user = await UserModel.findById(req.userId);
		if (!user) return false;

		user.count += 1;
		await user.save();

		return true;
	}

	@Mutation(() => Boolean)
	public async setDarkMode(
		@Arg("darkMode") darkMode: boolean,
		@Ctx() { req }: Context
	) {
		if (!req.userId) return false;

		const user = await UserModel.findById(req.userId);
		if (!user) return false;

		user.darkMode = darkMode;
		await user.save();

		return true;
	}
}
