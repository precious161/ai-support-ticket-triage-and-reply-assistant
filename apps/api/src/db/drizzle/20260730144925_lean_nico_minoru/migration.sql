ALTER TABLE "tickets" ALTER COLUMN "idempotency_key" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_idempotency_key_key" UNIQUE("idempotency_key");