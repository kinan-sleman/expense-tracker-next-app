CREATE TABLE IF NOT EXISTS "budgets" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"amount" numeric NOT NULL,
	"icon" varchar,
	"createdBy" varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS "expenses" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"amount" numeric DEFAULT 0 NOT NULL,
	"budgetId" integer,
	"createdBy" varchar NOT NULL,
	"createdAt" timestamp DEFAULT now()
);

DO $$ BEGIN
 ALTER TABLE "expenses" ADD CONSTRAINT "expenses_budgetId_budgets_id_fk" FOREIGN KEY ("budgetId") REFERENCES "budgets"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;