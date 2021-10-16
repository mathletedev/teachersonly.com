import { Request } from "express";
import { ObjectId } from "mongodb";

export type Context = {
	req: Request;
};

declare module "express-session" {
	export interface SessionData {
		userId: ObjectId;
	}
}
