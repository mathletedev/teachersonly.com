import { Response } from "express";
import { sign } from "jsonwebtoken";
import { User } from "../entities/user";
import { __prod__ } from "./constants";

export const setTokens = (res: Response, user: User) => {
	sign({ userId: user._id }, process.env.ACCESS_SECRET!, {
		expiresIn: "15min"
	});

	res.cookie(
		"refresh-token",
		sign({ userId: user._id, count: user.count }, process.env.REFRESH_SECRET!, {
			expiresIn: "7d"
		}),
		{
			maxAge: 6.048e8,
			sameSite:
				process.env.EXPLORER === "true" ? "none" : __prod__ ? "none" : "lax",
			secure: process.env.EXPLORER === "true" ? true : __prod__
		}
	);
	res.cookie(
		"access-token",
		sign({ userId: user._id }, process.env.ACCESS_SECRET!, {
			expiresIn: "15min"
		}),
		{
			maxAge: 9e5,
			sameSite:
				process.env.EXPLORER === "true" ? "none" : __prod__ ? "none" : "lax",
			secure: process.env.EXPLORER === "true" ? true : __prod__
		}
	);
};
