export const __port__ = process.env.PORT || "4000";
export const __prod__ = process.env.NODE_ENV === "production";
export const __clientUrl__ = __prod__
	? "https://teachersonly.vercel.app/"
	: "http://localhost:3000/";
export const __authBase__ = "/auth";
