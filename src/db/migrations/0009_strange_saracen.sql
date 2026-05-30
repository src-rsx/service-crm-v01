ALTER TABLE "service_calls" ALTER COLUMN "asset_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "service_calls" ADD COLUMN "company_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "service_calls" ADD COLUMN "site_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "service_calls" ADD COLUMN "call_type" varchar(30) DEFAULT 'BREAKDOWN' NOT NULL;--> statement-breakpoint
ALTER TABLE "service_calls" ADD COLUMN "source" varchar(30) DEFAULT 'PHONE' NOT NULL;--> statement-breakpoint
ALTER TABLE "service_calls" ADD COLUMN "reported_by" varchar(255);--> statement-breakpoint
ALTER TABLE "service_calls" ADD COLUMN "reported_mobile" varchar(20);--> statement-breakpoint
ALTER TABLE "service_calls" ADD CONSTRAINT "service_calls_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service_calls" ADD CONSTRAINT "service_calls_site_id_sites_id_fk" FOREIGN KEY ("site_id") REFERENCES "public"."sites"("id") ON DELETE no action ON UPDATE no action;