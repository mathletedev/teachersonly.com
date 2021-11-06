import { hash, verify } from "argon2";
import "dotenv-safe/config";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { User, UserModel } from "../entities/user";
import { setTokens } from "../lib/auth";
import { __prod__ } from "../lib/constants";
import { Context } from "../lib/types";

@Resolver()
export class UserResolver {
	@Mutation(() => String, { nullable: true })
	public async register(
		@Arg("username") username: string,
		@Arg("email") email: string,
		@Arg("password") password: string
	) {
		if (await UserModel.exists({ email })) return "account";
		if (await UserModel.exists({ username })) return "taken";

		if (!/^[a-z0-9]+$/.test(username) || username.length < 3) return "username";
		if (!email.includes("@")) return "email";
		if (
			!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$&*]).{8,}$/)
		)
			return "password";

		const hashed = await hash(password);

		const user = new UserModel({ username, email, password: hashed });
		await user.save();

		return "success";
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
	public async editUser(@Arg("data") data: string, @Ctx() { req }: Context) {
		if (!req.userId) return false;

		const user = await UserModel.findById(req.userId);
		if (!user) return false;

		const parsed = JSON.parse(data);
		if ("username" in parsed || "email" in parsed || "password" in parsed)
			return false;

		Object.assign(user, parsed);
		await user.save();

		return true;
	}
}
