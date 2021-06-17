import { config } from "dotenv";
config();

export const Environment: any = {
  "PORT": process.env.PORT,
  "HOST": process.env.HOST,
  "DB_DIALECT": process.env.DB_DIALECT,
  "DB_NAME": process.env.DB_NAME,
  "DB_USER": process.env.DB_USER,
  "DB_PASSWORD": process.env.DB_PASSWORD,
  "DB_PORT": process.env.DB_PORT,
  "DB_HOST": process.env.DB_HOST,
  "SECRET": process.env.SECRET,
};
