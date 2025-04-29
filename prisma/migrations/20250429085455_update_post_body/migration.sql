/*
  Warnings:

  - Changed the type of `body` on the `Post` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN "body_temp" TEXT;

UPDATE "Post" SET "body_temp" = "body"::TEXT;

ALTER TABLE "Post" DROP COLUMN "body";

ALTER TABLE "Post" RENAME COLUMN "body_temp" TO "body";