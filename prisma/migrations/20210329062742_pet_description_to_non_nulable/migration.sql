/*
  Warnings:

  - Made the column `description` on table `Pet` required. The migration will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Pet` MODIFY `description` VARCHAR(191) NOT NULL;
