export const __prod__ = process.env.NODE_ENV === "production";
export const __serverUrl__ = __prod__
	? "https://teachersonly.herokuapp.com"
	: "http://localhost:4000";
