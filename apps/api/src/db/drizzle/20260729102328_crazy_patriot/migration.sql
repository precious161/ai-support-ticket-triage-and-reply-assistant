CREATE TYPE "ai_runs_status" AS ENUM('PENDING', 'IN_PROGRESS', 'SUCCESS', 'FAILED');--> statement-breakpoint
CREATE TYPE "tickets_status" AS ENUM('QUEUED', 'PROCESSING', 'PENDING_REVIEW', 'APPROVED', 'REJECTED', 'RESOLVED');--> statement-breakpoint
ALTER TABLE "ai_runs" ALTER COLUMN "status" SET DATA TYPE "ai_runs_status" USING "status"::"ai_runs_status";--> statement-breakpoint
ALTER TABLE "ai_runs" ALTER COLUMN "status" SET DEFAULT 'PENDING'::"ai_runs_status";--> statement-breakpoint
ALTER TABLE "ai_runs" ALTER COLUMN "status" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "tickets" ALTER COLUMN "status" SET DATA TYPE "tickets_status" USING "status"::"tickets_status";--> statement-breakpoint
ALTER TABLE "tickets" ALTER COLUMN "status" SET DEFAULT 'QUEUED'::"tickets_status";--> statement-breakpoint
ALTER TABLE "tickets" ALTER COLUMN "status" SET NOT NULL;