ALTER TABLE "budgets" ALTER COLUMN "amount" TYPE numeric USING amount::numeric;


ALTER TABLE "expenses" ALTER COLUMN "amount" TYPE numeric USING amount::numeric;
