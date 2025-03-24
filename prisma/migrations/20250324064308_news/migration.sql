/*
  Warnings:

  - Added the required column `site` to the `Empresa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `empresa` ADD COLUMN `site` VARCHAR(191) NOT NULL;
