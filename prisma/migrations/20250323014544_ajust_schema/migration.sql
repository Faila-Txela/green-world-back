/*
  Warnings:

  - You are about to drop the column `createAt` on the `empresa` table. All the data in the column will be lost.
  - You are about to drop the column `estadoEmpresa` on the `empresa` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `empresa` table. All the data in the column will be lost.
  - Added the required column `senha` to the `Empresa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Empresa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `empresa` DROP COLUMN `createAt`,
    DROP COLUMN `estadoEmpresa`,
    DROP COLUMN `updateAt`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `senha` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `Contactos` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `mensagem` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `upadateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Contactos` ADD CONSTRAINT `Contactos_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
