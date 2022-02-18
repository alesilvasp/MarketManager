import dotenv from "dotenv";
dotenv.config();

export const config = {
  secret: process.env.SECRET || "",
  expiresIn: "12h",
};
