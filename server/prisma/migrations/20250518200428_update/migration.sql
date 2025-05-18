/*
  Warnings:

  - You are about to drop the `ChecklistItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `ChecklistItem` DROP FOREIGN KEY `ChecklistItem_contractId_fkey`;

-- DropTable
DROP TABLE `ChecklistItem`;
