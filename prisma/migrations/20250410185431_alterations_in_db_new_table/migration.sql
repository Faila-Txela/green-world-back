/*
  Warnings:

  - You are about to drop the `midia` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `midia` DROP FOREIGN KEY `Midia_amontoadoRelatadoId_fkey`;

-- DropForeignKey
ALTER TABLE `midia` DROP FOREIGN KEY `Midia_pagamentoId_fkey`;

-- DropTable
DROP TABLE `midia`;

-- CreateTable
CREATE TABLE `AnaliseImagem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `imageUrl` VARCHAR(191) NOT NULL,
    `tipoMidiaId` VARCHAR(191) NOT NULL,
    `labels` JSON NOT NULL,
    `analysisDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` VARCHAR(191) NOT NULL DEFAULT 'pending',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `amontoadoRelatadoId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AnaliseImagem` ADD CONSTRAINT `AnaliseImagem_amontoadoRelatadoId_fkey` FOREIGN KEY (`amontoadoRelatadoId`) REFERENCES `AmontoadoRelatado`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
