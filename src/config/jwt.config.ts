import dotenv from "dotenv";
dotenv.config();

export const config: JWTConfig = {
  secret: process.env.SECRET || "",
  expiresIn: "12h",
};
