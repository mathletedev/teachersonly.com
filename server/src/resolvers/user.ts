import { hash, verify } from "argon2";
import "dotenv-safe/config";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { User, UserModel } from "../entities/user";
import { setTokens } from "../lib/auth";
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

	@Mutation(() => User, { nullable: true })
	public async login(
		@Arg("username") username: string,
		@Arg("password") password: string,
		@Ctx() { res }: Context
	) {
		const user = await UserModel.findOne(
			username.includes("@") ? { email: username } : { username }
		);
		if (!user) return;

		if (!(await verify(user.password, password))) return;

		setTokens(res, user);

		return user;
	}

	@Query(() => User, { nullable: true })
	public async me(@Ctx() { req }: Context) {
		console.log(req.userId);
		if (!req.userId) return;

		return await UserModel.findById(req.userId);
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
}
