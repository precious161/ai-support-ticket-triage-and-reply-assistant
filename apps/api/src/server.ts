import { buildApp } from "./app.js";
import { config } from "./lib/env.js";

const port= config.port;
const host= '0.0.0.0';

const start= async()=>{

  const app= await buildApp();

  try{
    await app.listen({port,host});
  }
  catch(err){

    app.log.error(err);
    process.exit(1);
  }
}

start();