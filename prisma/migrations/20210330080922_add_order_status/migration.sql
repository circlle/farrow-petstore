-- AlterTable
ALTER TABLE `Order` ADD COLUMN     `status` ENUM('NEW', 'CONFIRMED', 'DELETED') NOT NULL DEFAULT 'NEW';
