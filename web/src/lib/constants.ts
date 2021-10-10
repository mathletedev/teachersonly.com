export const __prod__ = process.env.NODE_ENV === "production";
export const __callbackUrl__ = __prod__
	? "https://teachersonly.vercel.app"
	: "http://localhost:3000";
export const __serverUrl__ = __prod__ ? "" : "http://localhost:4000";
