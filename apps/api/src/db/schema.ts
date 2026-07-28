import { integer, pgTable, varchar,text, uuid, timestamp }  from "drizzle-orm/pg-core";

export const ticketsTable= pgTable("tickets",{
   id: uuid("id").primaryKey().defaultRandom(),
   title: varchar({length: 255}).notNull(),
   description: text(),
   status: varchar({ length: 255}),
   priority: integer(),
   created_at: timestamp().defaultNow(),
   updated_at: timestamp()
});

export const ai_runsTable= pgTable("ai_runs",{
   id: uuid("id").primaryKey().defaultRandom(),
   ticket_id: uuid().references(()=>ticketsTable.id).notNull(),
   status: varchar({length: 255}),
   reasoning: text(),
   reply: text(),
   created_at: timestamp().defaultNow(),
   updated_at: timestamp()
});

export const agent_actionsTable= pgTable("agent_actions",{
  id: uuid("id").primaryKey().defaultRandom(),
  run_id: uuid().references(()=>ai_runsTable.id).notNull(),
  action_type: varchar({length: 255}),
  payload: text(),
  result: varchar({length: 255}),
  created_at: timestamp().defaultNow(),
  updated_at: timestamp()
})