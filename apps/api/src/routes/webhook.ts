import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { db } from "../db/drizzle.js";
import { ticketsTable } from "../db/schema.js";
import { redis } from "../lib/redis.js";


const ticketSchema= z.object({
  subject: z.string().min(1),
  body: z.string().min(1),
  customer_email: z.string().email()
});

export const webhookRoutes: FastifyPluginAsyncZod = async (app)=>{

  app.post("/webhooks/tickets",{schema: { body: ticketSchema}}, async(request,reply)=>{
     const { subject, body, customer_email} = request.body;

    const [newTicket]= await db.insert(ticketsTable).values({
    title: subject,
    description: body,
    email: customer_email
       }).returning({id: ticketsTable.id});

       if(!newTicket){
        return reply.status(500).send({error: "Failed to create ticket"})
       }

  await redis.lpush("triage_queue", newTicket.id);

   reply.status(200).send({status: "received", ticketId: newTicket.id});
  })

}