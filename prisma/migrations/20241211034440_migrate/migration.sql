-- CreateEnum
CREATE TYPE "ItineraryType" AS ENUM ('DYNAMIC', 'CUSTOM');

-- CreateEnum
CREATE TYPE "ItineraryCategory" AS ENUM ('RED', 'GREEN', 'BLUE');

-- CreateTable
CREATE TABLE "Itinerary" (
    "id" TEXT NOT NULL,
    "itinerary_title" TEXT NOT NULL,
    "itinerary_thumbnail" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "itinerary_type" "ItineraryType" NOT NULL DEFAULT 'DYNAMIC',
    "itinerary_category" "ItineraryCategory" NOT NULL,
    "google_places_primary_place_types" TEXT[],
    "google_places_place_ids" TEXT[],

    CONSTRAINT "Itinerary_pkey" PRIMARY KEY ("id")
);
