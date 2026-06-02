ALTER TABLE "service_calls" ALTER COLUMN "company_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "service_calls" ALTER COLUMN "site_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "service_calls" ALTER COLUMN "status" SET DEFAULT 'LOGGED';--> statement-breakpoint
ALTER TABLE "service_calls" ADD COLUMN "customer_name" varchar(255);--> statement-breakpoint
ALTER TABLE "service_calls" ADD COLUMN "customer_mobile" varchar(20);--> statement-breakpoint
ALTER TABLE "service_calls" ADD COLUMN "customer_email" varchar(255);--> statement-breakpoint
ALTER TABLE "service_calls" ADD COLUMN "customer_address" text;