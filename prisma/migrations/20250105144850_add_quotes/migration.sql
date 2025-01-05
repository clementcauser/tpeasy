-- CreateEnum
CREATE TYPE "QuoteStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "QuoteRowType" AS ENUM ('SERVICE', 'PRODUCT');

-- CreateEnum
CREATE TYPE "TaxRate" AS ENUM ('TAX_20', 'TAX_10', 'TAX_5_5');

-- AlterTable
ALTER TABLE "companies" ADD COLUMN     "companyPrefix" TEXT;

-- CreateTable
CREATE TABLE "quotes" (
    "id" TEXT NOT NULL,
    "referenceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expirationDate" TIMESTAMP(3) NOT NULL,
    "comment" TEXT,
    "status" "QuoteStatus" NOT NULL DEFAULT 'PENDING',
    "clientId" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,

    CONSTRAINT "quotes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quote_rows" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "taxRate" "TaxRate" NOT NULL DEFAULT 'TAX_20',
    "totalET" DOUBLE PRECISION NOT NULL,
    "totalIT" DOUBLE PRECISION NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "type" "QuoteRowType" NOT NULL,
    "quoteId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "quote_rows_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "quotes_referenceId_key" ON "quotes"("referenceId");

-- AddForeignKey
ALTER TABLE "quotes" ADD CONSTRAINT "quotes_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quotes" ADD CONSTRAINT "quotes_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quote_rows" ADD CONSTRAINT "quote_rows_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "quotes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quote_rows" ADD CONSTRAINT "quote_rows_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
