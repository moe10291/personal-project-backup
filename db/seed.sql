DROP TABLE IF EXISTS "users";
CREATE TABLE "users" (
	"id" serial PRIMARY KEY,
	"first_name" varchar(20) NOT NULL,
	"last_name" varchar(20) NOT NULL,
	"email" varchar(30) NOT NULL,
	"username" varchar(20) NOT NULL,
	"password" TEXT NOT NULL,
	"phone" integer NOT NULL,
	"lisc" varchar(15)
);


DROP TABLE IF EXISTS "listings";
CREATE TABLE "listings" (
	"id" serial PRIMARY KEY,
	"address" text,
	"beds" varchar(10) NOT NULL,
	"bath" varchar(10) NOT NULL,
	"area_sqft" varchar(10) NOT NULL,
	"price" DECIMAL(10) NOT NULL,
	"description" varchar(300) NOT NULL,
	"lat" text,
	"lng" text
);


DROP TABLE IF EXISTS "users_listings";
CREATE TABLE "users_listings" (
	"id" serial PRIMARY KEY,
	"users_id" integer NOT NULL,
	"listings_id" integer NOT NULL
);

