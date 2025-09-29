/*
  Warnings:

  - You are about to drop the column `origin_lInk` on the `Links` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[origin_link]` on the table `Links` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[short_link]` on the table `Links` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `origin_link` to the `Links` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Links" DROP COLUMN "origin_lInk",
ADD COLUMN     "origin_link" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Links_origin_link_key" ON "public"."Links"("origin_link");

-- CreateIndex
CREATE UNIQUE INDEX "Links_short_link_key" ON "public"."Links"("short_link");
