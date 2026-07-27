import fastify from "fastify";
import { config } from "./config/env.js";
import pingRoutes from "./routes/ping.js";

let loggerOptions: any= true;

if(config.node_env === "development"){
  loggerOptions={
    transport: { target: "pino-pretty"},
    options:{
      colorize: true
    }
  }
}
else if(config.node_env === "production"){
  loggerOptions= true;
}

export const buildApp = async()=>{

  const app = fastify({logger: loggerOptions});

  app.register(pingRoutes);
  return app;

}