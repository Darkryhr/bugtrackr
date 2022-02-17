/*
  Warnings:

  - Made the column `priority` on table `Bug` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Bug" ALTER COLUMN "priority" SET NOT NULL;
