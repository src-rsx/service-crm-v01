CREATE TABLE "tenants" (
	"id" serial PRIMARY KEY NOT NULL,
	"tenant_code" varchar(50) NOT NULL,
	"company_name" varchar(255) NOT NULL,
	"contact_person" varchar(255),
	"email" varchar(255),
	"mobile" varchar(20),
	"subscription_plan" varchar(50) DEFAULT 'TRIAL',
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "tenants_tenant_code_unique" UNIQUE("tenant_code")
);
