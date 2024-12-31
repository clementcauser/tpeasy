/*
  Warnings:

  - You are about to drop the `profiles` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('OWNER', 'EMPLOYEE');

-- DropForeignKey
ALTER TABLE "profiles" DROP CONSTRAINT "profiles_user_id_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "companyId" TEXT,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'EMPLOYEE';

-- DropTable
DROP TABLE "profiles";

-- CreateTable
CREATE TABLE "company" (
    "id" TEXT NOT NULL,
    "commercialName" TEXT NOT NULL,
    "siren" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "company_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "company_siren_key" ON "company"("siren");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
