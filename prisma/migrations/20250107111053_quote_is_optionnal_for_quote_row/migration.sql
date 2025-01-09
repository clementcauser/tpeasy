-- DropForeignKey
ALTER TABLE "quote_rows" DROP CONSTRAINT "quote_rows_quoteId_fkey";

-- AlterTable
ALTER TABLE "quote_rows" ALTER COLUMN "quoteId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "quote_rows" ADD CONSTRAINT "quote_rows_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "quotes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
