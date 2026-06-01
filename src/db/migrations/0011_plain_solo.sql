ALTER TABLE "service_call_visits" ADD COLUMN "customer_name" varchar(255);--> statement-breakpoint
ALTER TABLE "service_call_visits" ADD COLUMN "customer_mobile" varchar(20);--> statement-breakpoint
ALTER TABLE "service_call_visits" ADD COLUMN "customer_remarks" text;