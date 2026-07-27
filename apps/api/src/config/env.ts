import dotenv from "dotenv";

dotenv.config();

export const config={
  port: Number(process.env.PORT) ,
  node_env: process.env.NODE_ENV
}

if(!config.port){
  throw new Error("Missing environment variable: PORT");
}

if(!config.node_env){
  throw new Error("Missing environment variable: NODE_ENV")
}