/*
  Warnings:

  - You are about to drop the `Loophole` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ToolExecution` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Loophole` DROP FOREIGN KEY `Loophole_contractId_fkey`;

-- DropForeignKey
ALTER TABLE `ToolExecution` DROP FOREIGN KEY `ToolExecution_contractId_fkey`;

-- DropForeignKey
ALTER TABLE `ToolExecution` DROP FOREIGN KEY `ToolExecution_userId_fkey`;

-- AlterTable
ALTER TABLE `ChecklistItem` MODIFY `addedBy` ENUM('USER', 'USER_FILE_UPLOAD', 'TOOL', 'AI') NOT NULL DEFAULT 'TOOL';

-- AlterTable
ALTER TABLE `Message` MODIFY `sender` ENUM('USER', 'USER_FILE_UPLOAD', 'TOOL', 'AI') NOT NULL;

-- DropTable
DROP TABLE `Loophole`;

-- DropTable
DROP TABLE `ToolExecution`;
