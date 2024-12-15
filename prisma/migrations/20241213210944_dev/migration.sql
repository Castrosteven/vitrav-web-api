/*
  Warnings:

  - The values [RED,GREEN,BLUE] on the enum `ItineraryCategory` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ItineraryCategory_new" AS ENUM ('ROMANTIC', 'ADVENTUROUS', 'FUN', 'CHILL', 'CULTURAL', 'NATURE', 'ACTIVE', 'INDULGENT', 'FAMILY_FRIENDLY', 'SOLO');
ALTER TABLE "Itinerary" ALTER COLUMN "itinerary_category" TYPE "ItineraryCategory_new" USING ("itinerary_category"::text::"ItineraryCategory_new");
ALTER TYPE "ItineraryCategory" RENAME TO "ItineraryCategory_old";
ALTER TYPE "ItineraryCategory_new" RENAME TO "ItineraryCategory";
DROP TYPE "ItineraryCategory_old";
COMMIT;
