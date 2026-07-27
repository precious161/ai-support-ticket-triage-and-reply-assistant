import type { FastifyInstance } from "fastify";
import getPing from "../controllers/ping.js";

export default async function pingRoutes(fastify: FastifyInstance){
  fastify.get('/ping',getPing);
}