/*
  Warnings:

  - Added the required column `bairro` to the `AmontoadoRelatado` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `amontoadorelatado` ADD COLUMN `bairro` VARCHAR(191) NOT NULL;
