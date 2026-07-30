CREATE TABLE "agent_actions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"run_id" uuid NOT NULL,
	"action_type" varchar(255),
	"payload" text,
	"result" varchar(255),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "ai_runs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"ticket_id" uuid NOT NULL,
	"status" varchar(255),
	"reasoning" text,
	"reply" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "tickets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"title" varchar(255) NOT NULL,
	"description" text,
	"status" varchar(255),
	"priority" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "agent_actions" ADD CONSTRAINT "agent_actions_run_id_ai_runs_id_fkey" FOREIGN KEY ("run_id") REFERENCES "ai_runs"("id");--> statement-breakpoint
ALTER TABLE "ai_runs" ADD CONSTRAINT "ai_runs_ticket_id_tickets_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "tickets"("id");