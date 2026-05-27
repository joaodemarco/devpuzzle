CREATE TYPE "public"."creator_type_enum" AS ENUM('Individual', 'Small team', 'Company');--> statement-breakpoint
CREATE TABLE "guess_the_tech_games" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tech_id" integer NOT NULL,
	"date" date NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "guess_the_tech_games_date_unique" UNIQUE("date")
);
--> statement-breakpoint
CREATE TABLE "guess_the_tech_results" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"game_id" uuid NOT NULL,
	"attempts" smallint NOT NULL,
	"won" boolean NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tech_area" (
	"tech_id" integer NOT NULL,
	"area_id" integer NOT NULL,
	CONSTRAINT "tech_area_tech_id_area_id_pk" PRIMARY KEY("tech_id","area_id")
);
--> statement-breakpoint
CREATE TABLE "tech_areas" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"slug" varchar(100) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "tech_areas_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "tech_type" (
	"tech_id" integer NOT NULL,
	"type_id" integer NOT NULL,
	CONSTRAINT "tech_type_tech_id_type_id_pk" PRIMARY KEY("tech_id","type_id")
);
--> statement-breakpoint
CREATE TABLE "tech_types" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"slug" varchar(100) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "tech_types_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "techs" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"slug" varchar(100) NOT NULL,
	"image_path" varchar(255),
	"open_source" boolean NOT NULL,
	"release_year" smallint NOT NULL,
	"creator_type" "creator_type_enum" NOT NULL,
	"hint" varchar(255) NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "techs_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "guess_the_tech_games" ADD CONSTRAINT "guess_the_tech_games_tech_id_techs_id_fk" FOREIGN KEY ("tech_id") REFERENCES "public"."techs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "guess_the_tech_results" ADD CONSTRAINT "guess_the_tech_results_game_id_guess_the_tech_games_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."guess_the_tech_games"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tech_area" ADD CONSTRAINT "tech_area_tech_id_techs_id_fk" FOREIGN KEY ("tech_id") REFERENCES "public"."techs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tech_area" ADD CONSTRAINT "tech_area_area_id_tech_areas_id_fk" FOREIGN KEY ("area_id") REFERENCES "public"."tech_areas"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tech_type" ADD CONSTRAINT "tech_type_tech_id_techs_id_fk" FOREIGN KEY ("tech_id") REFERENCES "public"."techs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tech_type" ADD CONSTRAINT "tech_type_type_id_tech_types_id_fk" FOREIGN KEY ("type_id") REFERENCES "public"."tech_types"("id") ON DELETE no action ON UPDATE no action;