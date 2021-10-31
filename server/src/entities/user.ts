import { getModelForClass, prop as Property } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { Field, ObjectType } from "type-graphql";
import { ObjectIdScalar } from "../lib/scalars";

@ObjectType()
export class User {
	@Field(() => ObjectIdScalar)
	public readonly _id: ObjectId;

	@Property({ required: true, default: 0 })
	public count: number;

	@Field()
	@Property({ required: true, unique: true })
	public username: string;

	@Field()
	@Property({ required: true, unique: true })
	public email: string;

	@Property({ required: true })
	public password: string;

	@Field()
	@Property()
	public displayName?: string;

	@Field()
	@Property({ required: true, default: false })
	public darkMode: boolean;
}

export const UserModel = getModelForClass(User);
