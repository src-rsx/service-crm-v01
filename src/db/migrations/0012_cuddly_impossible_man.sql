ALTER TABLE "service_call_visits" ADD COLUMN "root_cause" text;--> statement-breakpoint
ALTER TABLE "service_call_visits" ADD COLUMN "parts_used" text;--> statement-breakpoint
ALTER TABLE "service_call_visits" ADD COLUMN "travel_latitude" double precision;--> statement-breakpoint
ALTER TABLE "service_call_visits" ADD COLUMN "travel_longitude" double precision;--> statement-breakpoint
ALTER TABLE "service_call_visits" ADD COLUMN "checkin_latitude" double precision;--> statement-breakpoint
ALTER TABLE "service_call_visits" ADD COLUMN "checkin_longitude" double precision;--> statement-breakpoint
ALTER TABLE "service_call_visits" ADD COLUMN "checkout_latitude" double precision;--> statement-breakpoint
ALTER TABLE "service_call_visits" ADD COLUMN "checkout_longitude" double precision;