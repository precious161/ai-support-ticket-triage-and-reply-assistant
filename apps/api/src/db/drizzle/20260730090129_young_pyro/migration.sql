ALTER TABLE "tickets" ADD COLUMN "idempotency_key" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_idempotency_key_key" UNIQUE("idempotency_key");