/*
  Warnings:

  - You are about to drop the `company` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_companyId_fkey";

-- DropTable
DROP TABLE "company";

-- CreateTable
CREATE TABLE "companies" (
    "id" TEXT NOT NULL,
    "commercialName" TEXT NOT NULL,
    "siren" TEXT NOT NULL,
    "siret" TEXT NOT NULL,
    "category" TEXT,
    "activityCode" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "mainPhone" TEXT NOT NULL,
    "secondaryPhone" TEXT,
    "currency" TEXT NOT NULL,
    "capital" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "features" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "features_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_features" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "featureId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "company_features_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "companies_siren_key" ON "companies"("siren");

-- CreateIndex
CREATE UNIQUE INDEX "companies_siret_key" ON "companies"("siret");

-- CreateIndex
CREATE UNIQUE INDEX "companies_activityCode_key" ON "companies"("activityCode");

-- CreateIndex
CREATE UNIQUE INDEX "company_features_companyId_featureId_key" ON "company_features"("companyId", "featureId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_features" ADD CONSTRAINT "company_features_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_features" ADD CONSTRAINT "company_features_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "features"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
