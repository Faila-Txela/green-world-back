/*
  Warnings:

  - Added the required column `prioridade` to the `AmontoadoRelatado` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `amontoadorelatado` ADD COLUMN `prioridade` ENUM('BAIXA', 'ALTA') NOT NULL;
