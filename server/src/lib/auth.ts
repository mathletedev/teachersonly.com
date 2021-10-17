import { Response } from "express";
import { sign } from "jsonwebtoken";
import { User } from "../entities/user";

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
			sameSite: "none",
			secure: true
		}
	);
	res.cookie(
		"access-token",
		sign({ userId: user._id }, process.env.ACCESS_SECRET!, {
			expiresIn: "15min"
		}),
		{
			maxAge: 9e5,
			sameSite: "none",
			secure: true
		}
	);
};
