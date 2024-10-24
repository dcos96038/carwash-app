DO $$ BEGIN
 CREATE TYPE "public"."role" AS ENUM('USER', 'ADMIN');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "role" "role" DEFAULT 'USER' NOT NULL;