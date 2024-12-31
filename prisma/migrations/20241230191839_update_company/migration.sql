/*
  Warnings:

  - Added the required column `capital` to the `company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currency` to the `company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "company" ADD COLUMN     "capital" TEXT NOT NULL,
ADD COLUMN     "currency" TEXT NOT NULL;
