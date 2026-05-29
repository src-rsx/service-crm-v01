CREATE TABLE "service_call_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"service_call_id" uuid NOT NULL,
	"event_type" varchar(50) NOT NULL,
	"remarks" text,
	"old_status" varchar(30),
	"new_status" varchar(30),
	"performed_by_user_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "service_call_events" ADD CONSTRAINT "service_call_events_service_call_id_service_calls_id_fk" FOREIGN KEY ("service_call_id") REFERENCES "public"."service_calls"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service_call_events" ADD CONSTRAINT "service_call_events_performed_by_user_id_users_id_fk" FOREIGN KEY ("performed_by_user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;