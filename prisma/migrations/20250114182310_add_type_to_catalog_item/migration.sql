/*
  Warnings:

  - Added the required column `type` to the `catalog_rows` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "catalog_rows" ADD COLUMN     "type" "QuoteRowType" NOT NULL;
