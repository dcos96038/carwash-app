ALTER TABLE "carwash" ALTER COLUMN "opening_hours" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "carwash" ALTER COLUMN "closing_hours" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "carwash" ALTER COLUMN "email" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "carwash" ALTER COLUMN "logo" SET DEFAULT '';