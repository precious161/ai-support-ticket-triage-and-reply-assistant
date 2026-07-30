import fastify, { type FastifyInstance } from "fastify";
import { config } from "./lib/env.js";
import { validatorCompiler, serializerCompiler} from "fastify-type-provider-zod";
import type { ZodTypeProvider } from "fastify-type-provider-zod";

const getLoggerConfig = () =>{
  if(config.node_env === "development"){
    return{
      transport:{
        target: "pino-pretty",
        options:{
          colorize: true,
          translateTime: "HH:MM:ss Z",
          ignore: "pid,hostname"
        }
      }
    }
  }
  return true;
}

export const buildApp = async()=>{

  const app = fastify({logger: getLoggerConfig()});

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  const appWithZod= app.withTypeProvider<ZodTypeProvider>();


  return appWithZod;

}