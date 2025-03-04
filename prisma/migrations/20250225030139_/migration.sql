/*
  Warnings:

  - You are about to drop the column `categoria` on the `amontoadorelatado` table. All the data in the column will be lost.
  - You are about to drop the column `desc` on the `amontoadorelatado` table. All the data in the column will be lost.
  - You are about to drop the column `foto` on the `amontoadorelatado` table. All the data in the column will be lost.
  - You are about to drop the column `localidade` on the `amontoadorelatado` table. All the data in the column will be lost.
  - You are about to drop the column `prioridade` on the `amontoadorelatado` table. All the data in the column will be lost.
  - You are about to drop the column `quantidade` on the `amontoadorelatado` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `amontoadorelatado` table. All the data in the column will be lost.
  - You are about to drop the column `emailEmpresa` on the `empresa` table. All the data in the column will be lost.
  - You are about to drop the column `localActuacao` on the `empresa` table. All the data in the column will be lost.
  - You are about to drop the column `nomeEmpresa` on the `empresa` table. All the data in the column will be lost.
  - You are about to drop the column `tipoUser_id` on the `empresa` table. All the data in the column will be lost.
  - You are about to drop the column `id_user` on the `feedback` table. All the data in the column will be lost.
  - You are about to drop the column `tipo_feedack` on the `feedback` table. All the data in the column will be lost.
  - You are about to drop the column `id_user` on the `notificacao` table. All the data in the column will be lost.
  - You are about to drop the column `id_empresa` on the `pagamento` table. All the data in the column will be lost.
  - You are about to drop the column `metodo_pagamento` on the `pagamento` table. All the data in the column will be lost.
  - You are about to drop the column `status_pagamento` on the `pagamento` table. All the data in the column will be lost.
  - You are about to drop the column `id_user` on the `pontos` table. All the data in the column will be lost.
  - You are about to drop the `configuracao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `recompensa` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `resgate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `servico` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `Empresa` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `descricao` to the `AmontoadoRelatado` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Empresa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enderecoId` to the `Empresa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nif` to the `Empresa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `Empresa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipoEmpresa_id` to the `Empresa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `Empresa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Notificacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Pontos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `TipoUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `iban` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome_titular` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `configuracao` DROP FOREIGN KEY `Configuracao_id_user_fkey`;

-- DropForeignKey
ALTER TABLE `empresa` DROP FOREIGN KEY `Empresa_tipoUser_id_fkey`;

-- DropForeignKey
ALTER TABLE `feedback` DROP FOREIGN KEY `Feedback_id_user_fkey`;

-- DropForeignKey
ALTER TABLE `notificacao` DROP FOREIGN KEY `Notificacao_id_user_fkey`;

-- DropForeignKey
ALTER TABLE `pagamento` DROP FOREIGN KEY `Pagamento_id_empresa_fkey`;

-- DropForeignKey
ALTER TABLE `pontos` DROP FOREIGN KEY `Pontos_id_user_fkey`;

-- DropForeignKey
ALTER TABLE `resgate` DROP FOREIGN KEY `Resgate_recompensa_id_fkey`;

-- DropForeignKey
ALTER TABLE `resgate` DROP FOREIGN KEY `Resgate_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `servico` DROP FOREIGN KEY `Servico_id_empresa_fkey`;

-- DropIndex
DROP INDEX `Empresa_emailEmpresa_key` ON `empresa`;

-- DropIndex
DROP INDEX `Empresa_tipoUser_id_fkey` ON `empresa`;

-- DropIndex
DROP INDEX `Feedback_id_user_idx` ON `feedback`;

-- DropIndex
DROP INDEX `Notificacao_id_user_idx` ON `notificacao`;

-- DropIndex
DROP INDEX `Pagamento_id_empresa_idx` ON `pagamento`;

-- DropIndex
DROP INDEX `Pontos_id_user_idx` ON `pontos`;

-- AlterTable
ALTER TABLE `amontoadorelatado` DROP COLUMN `categoria`,
    DROP COLUMN `desc`,
    DROP COLUMN `foto`,
    DROP COLUMN `localidade`,
    DROP COLUMN `prioridade`,
    DROP COLUMN `quantidade`,
    DROP COLUMN `status`,
    ADD COLUMN `descricao` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `empresa` DROP COLUMN `emailEmpresa`,
    DROP COLUMN `localActuacao`,
    DROP COLUMN `nomeEmpresa`,
    DROP COLUMN `tipoUser_id`,
    ADD COLUMN `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `enderecoId` VARCHAR(191) NOT NULL,
    ADD COLUMN `nif` VARCHAR(191) NOT NULL,
    ADD COLUMN `nome` VARCHAR(191) NOT NULL,
    ADD COLUMN `tipoEmpresa_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `updateAt` DATETIME(3) NOT NULL,
    MODIFY `estadoEmpresa` ENUM('PRIVADO', 'PUBLICO', 'MISTAS') NOT NULL;

-- AlterTable
ALTER TABLE `feedback` DROP COLUMN `id_user`,
    DROP COLUMN `tipo_feedack`,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `notificacao` DROP COLUMN `id_user`,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `pagamento` DROP COLUMN `id_empresa`,
    DROP COLUMN `metodo_pagamento`,
    DROP COLUMN `status_pagamento`,
    ADD COLUMN `empresa_id` VARCHAR(191) NULL,
    ADD COLUMN `user_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `pontos` DROP COLUMN `id_user`,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `relatoriocoleta` MODIFY `statusColeta` ENUM('RETIRADO', 'NAO_RETIRADO', 'PENDENTE') NOT NULL DEFAULT 'NAO_RETIRADO';

-- AlterTable
ALTER TABLE `tipouser` ADD COLUMN `nome` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `iban` VARCHAR(191) NOT NULL,
    ADD COLUMN `nome_titular` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `configuracao`;

-- DropTable
DROP TABLE `recompensa`;

-- DropTable
DROP TABLE `resgate`;

-- DropTable
DROP TABLE `servico`;

-- CreateTable
CREATE TABLE `TipoEmpresa` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Endereco` (
    `id` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NOT NULL,
    `rua` VARCHAR(191) NOT NULL,
    `bairro` VARCHAR(191) NOT NULL,
    `provinciaId` VARCHAR(191) NOT NULL,
    `municipioId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Midia` (
    `id` VARCHAR(191) NOT NULL,
    `caminho` VARCHAR(191) NOT NULL,
    `tipoMidiaId` VARCHAR(191) NOT NULL,
    `amontoadoRelatadoId` VARCHAR(191) NULL,
    `pagamentoId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Provincia` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Municipio` (
    `id` VARCHAR(191) NOT NULL,
    `provinciaId` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comentario` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `amontoadoRelatadoId` VARCHAR(191) NOT NULL,
    `conteudo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Empresa_email_key` ON `Empresa`(`email`);

-- AddForeignKey
ALTER TABLE `Empresa` ADD CONSTRAINT `Empresa_enderecoId_fkey` FOREIGN KEY (`enderecoId`) REFERENCES `Endereco`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Empresa` ADD CONSTRAINT `Empresa_tipoEmpresa_id_fkey` FOREIGN KEY (`tipoEmpresa_id`) REFERENCES `TipoEmpresa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Endereco` ADD CONSTRAINT `Endereco_provinciaId_fkey` FOREIGN KEY (`provinciaId`) REFERENCES `Provincia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Endereco` ADD CONSTRAINT `Endereco_municipioId_fkey` FOREIGN KEY (`municipioId`) REFERENCES `Municipio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Midia` ADD CONSTRAINT `Midia_amontoadoRelatadoId_fkey` FOREIGN KEY (`amontoadoRelatadoId`) REFERENCES `AmontoadoRelatado`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Midia` ADD CONSTRAINT `Midia_pagamentoId_fkey` FOREIGN KEY (`pagamentoId`) REFERENCES `Pagamento`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Municipio` ADD CONSTRAINT `Municipio_provinciaId_fkey` FOREIGN KEY (`provinciaId`) REFERENCES `Provincia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notificacao` ADD CONSTRAINT `Notificacao_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Feedback` ADD CONSTRAINT `Feedback_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comentario` ADD CONSTRAINT `Comentario_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comentario` ADD CONSTRAINT `Comentario_amontoadoRelatadoId_fkey` FOREIGN KEY (`amontoadoRelatadoId`) REFERENCES `AmontoadoRelatado`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pagamento` ADD CONSTRAINT `Pagamento_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pagamento` ADD CONSTRAINT `Pagamento_empresa_id_fkey` FOREIGN KEY (`empresa_id`) REFERENCES `Empresa`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pontos` ADD CONSTRAINT `Pontos_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
