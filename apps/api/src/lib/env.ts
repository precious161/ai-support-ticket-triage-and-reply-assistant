import dotenv from "dotenv";

dotenv.config();

export const config={
  port: Number(process.env.PORT) ,
  node_env: process.env.NODE_ENV,
  db_url: process.env.DATABASE_URL,
  redis_url: process.env.REDIS_URL
}

if(!config.port){
  throw new Error("Missing environment variable: PORT");
}

if(!config.node_env){
  throw new Error("Missing environment variable: NODE_ENV")
}

if(!config.db_url){
  throw new Error("Missing environment variable: DATABASE_URL")
}