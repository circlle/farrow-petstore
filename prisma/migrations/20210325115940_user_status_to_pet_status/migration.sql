/*
  Warnings:

  - You are about to drop the column `status` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Pet` ADD COLUMN     `status` ENUM('AVAILABLE', 'PENDING', 'SOLD') NOT NULL DEFAULT 'AVAILABLE';

-- AlterTable
ALTER TABLE `User` DROP COLUMN `status`;
