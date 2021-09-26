export const __prod__ = process.env.NODE_ENV === "development";
export const __callbackUrl__ = __prod__
	? "https://teachersonly.vercel.app/"
	: "http://localhost:3000/";
