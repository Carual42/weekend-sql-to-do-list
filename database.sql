CREATE TABLE "to_Do" (
	"id" serial primary key,
	-- not null means this is required
	"task" varchar(80) not null, 
	"complete" varchar(1) not null
);

INSERT INTO "to_Do" ("task", "complete")
VALUES ('Wash dishes', 'N');