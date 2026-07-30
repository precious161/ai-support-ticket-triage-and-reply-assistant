ALTER TABLE "tickets" DROP CONSTRAINT "tickets_idempotency_key_key";--> statement-breakpoint
ALTER TABLE "tickets" ALTER COLUMN "idempotency_key" SET DATA TYPE uuid USING "idempotency_key"::uuid;--> statement-breakpoint
ALTER TABLE "tickets" ALTER COLUMN "idempotency_key" SET DEFAULT gen_random_uuid();