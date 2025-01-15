/*
  Warnings:

  - You are about to drop the `quote_rows` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
ALTER TYPE "TaxRate" ADD VALUE 'TAX_0';

-- DropForeignKey
ALTER TABLE "quote_rows" DROP CONSTRAINT "quote_rows_companyId_fkey";

-- DropForeignKey
ALTER TABLE "quote_rows" DROP CONSTRAINT "quote_rows_quoteId_fkey";

-- DropTable
DROP TABLE "quote_rows";

-- CreateTable
CREATE TABLE "quote_rows_base" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "unit" TEXT NOT NULL DEFAULT 'unité',
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "taxRate" "TaxRate" NOT NULL DEFAULT 'TAX_20',
    "companyId" TEXT NOT NULL,

    CONSTRAINT "quote_rows_base_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quote_rows_values" (
    "id" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "totalET" DOUBLE PRECISION NOT NULL,
    "totalIT" DOUBLE PRECISION NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "type" "QuoteRowType" NOT NULL,

    CONSTRAINT "quote_rows_values_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_QuoteToQuoteRowBase" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_QuoteToQuoteRowBase_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_QuoteToQuoteRowBase_B_index" ON "_QuoteToQuoteRowBase"("B");

-- AddForeignKey
ALTER TABLE "quote_rows_base" ADD CONSTRAINT "quote_rows_base_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuoteToQuoteRowBase" ADD CONSTRAINT "_QuoteToQuoteRowBase_A_fkey" FOREIGN KEY ("A") REFERENCES "quotes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuoteToQuoteRowBase" ADD CONSTRAINT "_QuoteToQuoteRowBase_B_fkey" FOREIGN KEY ("B") REFERENCES "quote_rows_base"("id") ON DELETE CASCADE ON UPDATE CASCADE;
