import { pgEnum, integer, pgTable, varchar,text, uuid, timestamp }  from "drizzle-orm/pg-core";

export const ticketsStatus= pgEnum("tickets_status",[
   "NEW",
   "PROCESSING",
   "PENDING_REVIEW",
   "APPROVED",
   "REJECTED",
   "RESOLVED"
])

export const ai_runsStatus= pgEnum("ai_runs_status",[
  "PENDING",
  "IN_PROGRESS",
  "SUCCESS",
  "FAILED"
])

export const ticketsTable= pgTable("tickets",{
   id: uuid("id").primaryKey().defaultRandom(),
   title: varchar("title",{length: 255}).notNull(),
   description: text("description"),
   email: varchar("email",{ length: 255}).notNull(),
   status: ticketsStatus("status").default("NEW").notNull(),
   priority: integer("priority"),
   created_at: timestamp("created_at").defaultNow(),
   updated_at: timestamp("updated_at"),
   idempotency_key: uuid("idempotency_key").unique().notNull()
});

export const ai_runsTable= pgTable("ai_runs",{
   id: uuid("id").primaryKey().defaultRandom(),
   ticket_id: uuid("ticket_id").references(()=>ticketsTable.id).notNull(),
   status: ai_runsStatus("status").default("PENDING").notNull(),
   reasoning: text("reasoning"),
   reply: text("reply"),
   created_at: timestamp("created_at").defaultNow(),
   updated_at: timestamp("updated_at")
});

export const agent_actionsTable= pgTable("agent_actions",{
  id: uuid("id").primaryKey().defaultRandom(),
  run_id: uuid("run_id").references(()=>ai_runsTable.id).notNull(),
  action_type: varchar("action_type",{length: 255}),
  payload: text("payload"),
  result: varchar("result",{length: 255}),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at")
})