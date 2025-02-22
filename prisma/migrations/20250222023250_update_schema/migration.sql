/*
  Warnings:

  - You are about to drop the column `tipoUser` on the `tipouser` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `tipouser` DROP COLUMN `tipoUser`;

-- CreateTable
CREATE TABLE `_EmpresaToTipouser` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_EmpresaToTipouser_AB_unique`(`A`, `B`),
    INDEX `_EmpresaToTipouser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_EmpresaToTipouser` ADD CONSTRAINT `_EmpresaToTipouser_A_fkey` FOREIGN KEY (`A`) REFERENCES `Empresa`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EmpresaToTipouser` ADD CONSTRAINT `_EmpresaToTipouser_B_fkey` FOREIGN KEY (`B`) REFERENCES `Tipouser`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- RedefineIndex
CREATE INDEX `Users_tipoUser_id_idx` ON `Users`(`tipoUser_id`);
DROP INDEX `Users_tipoUser_id_fkey` ON `users`;
