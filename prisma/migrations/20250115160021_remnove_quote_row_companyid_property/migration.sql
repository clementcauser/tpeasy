/*
  Warnings:

  - You are about to drop the column `companyId` on the `quote_rows` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "quote_rows" DROP CONSTRAINT "quote_rows_companyId_fkey";

-- AlterTable
ALTER TABLE "quote_rows" DROP COLUMN "companyId";
