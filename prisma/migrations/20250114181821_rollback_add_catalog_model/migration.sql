/*
  Warnings:

  - You are about to drop the `_QuoteToQuoteRowBase` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `quote_rows_base` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `quote_rows_values` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_QuoteToQuoteRowBase" DROP CONSTRAINT "_QuoteToQuoteRowBase_A_fkey";

-- DropForeignKey
ALTER TABLE "_QuoteToQuoteRowBase" DROP CONSTRAINT "_QuoteToQuoteRowBase_B_fkey";

-- DropForeignKey
ALTER TABLE "quote_rows_base" DROP CONSTRAINT "quote_rows_base_companyId_fkey";

-- DropForeignKey
ALTER TABLE "quote_rows_values" DROP CONSTRAINT "quote_rows_values_rowId_fkey";

-- AlterTable
ALTER TABLE "quotes" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "_QuoteToQuoteRowBase";

-- DropTable
DROP TABLE "quote_rows_base";

-- DropTable
DROP TABLE "quote_rows_values";

-- CreateTable
CREATE TABLE "catalog_rows" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "unit" TEXT NOT NULL DEFAULT 'unité',
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "taxRate" "TaxRate" NOT NULL DEFAULT 'TAX_20',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "companyId" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,

    CONSTRAINT "catalog_rows_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quote_rows" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "unit" TEXT NOT NULL DEFAULT 'unité',
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "taxRate" "TaxRate" NOT NULL DEFAULT 'TAX_20',
    "quantity" DOUBLE PRECISION NOT NULL,
    "totalET" DOUBLE PRECISION NOT NULL,
    "totalIT" DOUBLE PRECISION NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "type" "QuoteRowType" NOT NULL,
    "quoteId" TEXT,
    "companyId" TEXT,

    CONSTRAINT "quote_rows_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "catalog_rows" ADD CONSTRAINT "catalog_rows_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "catalog_rows" ADD CONSTRAINT "catalog_rows_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quote_rows" ADD CONSTRAINT "quote_rows_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "quotes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quote_rows" ADD CONSTRAINT "quote_rows_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;
