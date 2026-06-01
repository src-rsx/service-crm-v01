CREATE TABLE "service_call_visits" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"service_call_id" uuid NOT NULL,
	"engineer_id" uuid NOT NULL,
	"status" varchar(30) DEFAULT 'ASSIGNED' NOT NULL,
	"travel_started_at" timestamp,
	"check_in_at" timestamp,
	"check_out_at" timestamp,
	"observation" text,
	"action_taken" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "service_call_visits" ADD CONSTRAINT "service_call_visits_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service_call_visits" ADD CONSTRAINT "service_call_visits_service_call_id_service_calls_id_fk" FOREIGN KEY ("service_call_id") REFERENCES "public"."service_calls"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service_call_visits" ADD CONSTRAINT "service_call_visits_engineer_id_engineers_id_fk" FOREIGN KEY ("engineer_id") REFERENCES "public"."engineers"("id") ON DELETE no action ON UPDATE no action;