import type{ FastifyRequest, FastifyReply} from "fastify";

export default async function getPing(request: FastifyRequest, reply:FastifyReply){
  reply.send({'pong':true});

}