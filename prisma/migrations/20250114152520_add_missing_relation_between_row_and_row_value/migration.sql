-- AlterTable
ALTER TABLE "quote_rows_values" ADD COLUMN     "rowId" TEXT;

-- AddForeignKey
ALTER TABLE "quote_rows_values" ADD CONSTRAINT "quote_rows_values_rowId_fkey" FOREIGN KEY ("rowId") REFERENCES "quote_rows_base"("id") ON DELETE SET NULL ON UPDATE CASCADE;
