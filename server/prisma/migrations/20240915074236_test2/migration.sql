/*
  Warnings:

  - You are about to drop the column `staffMember` on the `OrdersSummary` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "OrdersSummary" DROP COLUMN "staffMember";

-- CreateIndex
CREATE UNIQUE INDEX "Product_name_key" ON "Product"("name");
