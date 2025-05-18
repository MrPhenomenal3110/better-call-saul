/*
  Warnings:

  - You are about to drop the column `content` on the `Contract` table. All the data in the column will be lost.
  - You are about to drop the `ContractSection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Question` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Source` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `collectionName` to the `Contract` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ContractSection` DROP FOREIGN KEY `ContractSection_contractId_fkey`;

-- DropForeignKey
ALTER TABLE `Question` DROP FOREIGN KEY `Question_contractId_fkey`;

-- DropForeignKey
ALTER TABLE `Question` DROP FOREIGN KEY `Question_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Source` DROP FOREIGN KEY `Source_questionId_fkey`;

-- AlterTable
ALTER TABLE `Contract` DROP COLUMN `content`,
    ADD COLUMN `collectionName` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `ContractSection`;

-- DropTable
DROP TABLE `Question`;

-- DropTable
DROP TABLE `Source`;
