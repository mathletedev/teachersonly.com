import { getModelForClass, prop as Property } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { Field, ObjectType } from "type-graphql";
import { ObjectIdScalar } from "../lib/scalars";

@ObjectType()
export class User {
	@Field(() => ObjectIdScalar)
	public readonly _id: ObjectId;

	@Field()
	@Property({ required: true, unique: true })
	public username: string;
}

export const UserModel = getModelForClass(User);
