/*
  Warnings:

  - You are about to drop the column `description` on the `quote_rows` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "quote_rows" DROP COLUMN "description",
ADD COLUMN     "unit" TEXT NOT NULL DEFAULT 'unités';

-- AlterTable
ALTER TABLE "quotes" ADD COLUMN     "totalET" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "totalIT" DOUBLE PRECISION NOT NULL DEFAULT 0;
