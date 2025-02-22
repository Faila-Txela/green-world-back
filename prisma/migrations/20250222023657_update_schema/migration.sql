/*
  Warnings:

  - You are about to drop the `_empresatotipouser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `tipoUser_id` to the `Empresa` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_empresatotipouser` DROP FOREIGN KEY `_EmpresaToTipouser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_empresatotipouser` DROP FOREIGN KEY `_EmpresaToTipouser_B_fkey`;

-- AlterTable
ALTER TABLE `empresa` ADD COLUMN `tipoUser_id` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `_empresatotipouser`;

-- AddForeignKey
ALTER TABLE `Empresa` ADD CONSTRAINT `Empresa_tipoUser_id_fkey` FOREIGN KEY (`tipoUser_id`) REFERENCES `Tipouser`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
