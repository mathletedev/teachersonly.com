import { hash, verify } from "argon2";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { User, UserModel } from "../entities/user";
import { Context } from "../lib/types";

@Resolver()
export class UserResolver {
	@Mutation(() => User, { nullable: true })
	public async register(
		@Arg("username") username: string,
		@Arg("email") email: string,
		@Arg("password") password: string,
		@Ctx() { req }: Context
	) {
		const hashed = await hash(password);
		let user;

		try {
			user = new UserModel({ username, email, password: hashed });
			await user.save();
		} catch (err) {
			return;
		}

		req.session.userId = user._id;

		return user;
	}

	@Mutation(() => User, { nullable: true })
	public async login(
		@Arg("username") username: string,
		@Arg("password") password: string,
		@Ctx() { req }: Context
	) {
		const user = await UserModel.findOne(
			username.includes("@") ? { email: username } : { username }
		);
		if (!user) return;

		if (!(await verify(user.password, password))) return;

		req.session.userId = user._id;

		return user;
	}

	@Query(() => User, { nullable: true })
	public me(@Ctx() { req }: Context) {
		console.log(req.session);
		if (!req.session.userId) return;

		return UserModel.findOne({ _id: req.session.userId });
	}

	@Query(() => [User])
	public async users() {
		return await UserModel.find();
	}
}
