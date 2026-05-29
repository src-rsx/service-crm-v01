ALTER TABLE "service_calls" ADD COLUMN "resolution_remarks" text;--> statement-breakpoint
ALTER TABLE "service_calls" ADD CONSTRAINT "service_calls_call_number_unique" UNIQUE("call_number");