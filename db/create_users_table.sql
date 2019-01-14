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




CREATE TABLE "listings" (
	"id" serial NOT NULL,
	"address" text,
	"beds" varchar(10) NOT NULL,
	"bath" varchar(10) NOT NULL,
	"area_sqft" varchar(10) NOT NULL,
	"price" DECIMAL(10) NOT NULL,
	"description" varchar(300) NOT NULL,
	"lat" integer,
	"long" integer
	CONSTRAINT listings_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "users_listings" (
	"id" serial NOT NULL,
	"users_id" integer NOT NULL,
	"listings_id" integer NOT NULL,
	CONSTRAINT users_listings_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "listings" ADD CONSTRAINT "fk_listings" FOREIGN KEY ("address") REFERENCES "users"("id");

ALTER TABLE "users_listings" ADD CONSTRAINT "fk1_users_listings" FOREIGN KEY ("users_id") REFERENCES "users"("id");
ALTER TABLE "users_listings" ADD CONSTRAINT "fk2_users_listings" FOREIGN KEY ("listings_id") REFERENCES "listings"("id");
