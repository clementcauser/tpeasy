/*
  Warnings:

  - A unique constraint covering the columns `[siret]` on the table `company` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[activityCode]` on the table `company` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `activityCode` to the `company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mainPhone` to the `company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `secondaryPhone` to the `company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `siret` to the `company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "company" ADD COLUMN     "activityCode" TEXT NOT NULL,
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "category" TEXT,
ADD COLUMN     "mainPhone" TEXT NOT NULL,
ADD COLUMN     "secondaryPhone" TEXT NOT NULL,
ADD COLUMN     "siret" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "company_siret_key" ON "company"("siret");

-- CreateIndex
CREATE UNIQUE INDEX "company_activityCode_key" ON "company"("activityCode");
