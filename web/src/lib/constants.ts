export const __prod__ = process.env.NODE_ENV === "production";
export const __serverUrl__ = __prod__ ? "" : "http://localhost:4000";
