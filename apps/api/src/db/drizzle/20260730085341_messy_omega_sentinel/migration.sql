ALTER TABLE "tickets" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "tickets" ALTER COLUMN "status" DROP DEFAULT;--> statement-breakpoint
DROP TYPE "tickets_status";--> statement-breakpoint
CREATE TYPE "tickets_status" AS ENUM('NEW', 'PROCESSING', 'PENDING_REVIEW', 'APPROVED', 'REJECTED', 'RESOLVED');--> statement-breakpoint
ALTER TABLE "tickets" ALTER COLUMN "status" SET DATA TYPE "tickets_status" USING "status"::"tickets_status";--> statement-breakpoint
ALTER TABLE "tickets" ALTER COLUMN "status" SET DEFAULT 'NEW'::"tickets_status";