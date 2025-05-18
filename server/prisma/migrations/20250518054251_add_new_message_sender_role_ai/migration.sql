-- AlterTable
ALTER TABLE `ChecklistItem` MODIFY `addedBy` ENUM('USER', 'TOOL', 'AI') NOT NULL DEFAULT 'TOOL';

-- AlterTable
ALTER TABLE `Loophole` MODIFY `flaggedBy` ENUM('USER', 'TOOL', 'AI') NOT NULL;

-- AlterTable
ALTER TABLE `Message` MODIFY `sender` ENUM('USER', 'TOOL', 'AI') NOT NULL;
