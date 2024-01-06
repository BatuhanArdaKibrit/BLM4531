START TRANSACTION;

ALTER TABLE "Foods" DROP CONSTRAINT "FK_Foods_Users_CreatedBy";

ALTER TABLE "Users" DROP CONSTRAINT "AK_Users_Name";

ALTER TABLE "Foods" ALTER COLUMN "CreatedBy" TYPE integer;

ALTER TABLE "Foods" ADD CONSTRAINT "FK_Foods_Users_CreatedBy" FOREIGN KEY ("CreatedBy") REFERENCES "Users" ("Id") ON DELETE CASCADE;

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20231217101801_fix_createdBy_fk', '8.0.0');

COMMIT;

