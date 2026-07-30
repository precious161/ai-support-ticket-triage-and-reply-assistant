import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { db } from "../db/drizzle.js";
import { ticketsTable } from "../db/schema.js";
import { redis } from "../lib/redis.js";
import { eq } from "drizzle-orm";


const ticketSchema= z.object({
  subject: z.string().min(1),
  body: z.string().min(1),
  customer_email: z.string().email(),
});

const headerSchema= z.object({
  "idempotency-key": z.string().min(1)
})

export const webhookRoutes: FastifyPluginAsyncZod = async (app)=>{

  app.post("/webhooks/tickets",
    {
      schema: {
        body: ticketSchema,
        headers: headerSchema.passthrough()
  }}, async(request,reply)=>{
     const { subject, body, customer_email} = request.body;
     const idempotency_key = request.headers["idempotency-key"] as string;


     const [existingTicket]= await db.select({id: ticketsTable.id}).from(ticketsTable).where(eq(ticketsTable.idempotency_key, idempotency_key));

     if(existingTicket){
      return reply.status(200).send({
        ticket_id: existingTicket.id,
        status: "queued"
      });
     }

     try{

    const [newTicket]= await db.insert(ticketsTable).values({
    title: subject,
    description: body,
    email: customer_email,
    idempotency_key: idempotency_key
       }).returning({id: ticketsTable.id});

       if(!newTicket){
        return reply.status(500).send({error: "Failed to create ticket"})
       }

  await redis.lpush("triage_queue", newTicket.id);

   reply.status(200).send({ ticketId: newTicket.id,status: "queued"});
     } catch(error: any){

      if(error.code === "23505"){
        const [raceTicket] = await db.select({id: ticketsTable.id}).from(ticketsTable).where(eq(ticketsTable.idempotency_key,idempotency_key));

        return reply.status(200).send({
          ticket_id: raceTicket?.id,
          status: "queued"
        });

      }

      throw error;

     }


  })
}