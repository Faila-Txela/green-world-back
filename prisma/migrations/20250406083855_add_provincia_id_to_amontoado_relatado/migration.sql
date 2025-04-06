/*
  Warnings:

  - Added the required column `municipioId` to the `AmontoadoRelatado` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provinciaId` to the `AmontoadoRelatado` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `amontoadorelatado` ADD COLUMN `municipioId` VARCHAR(191) NOT NULL,
    ADD COLUMN `provinciaId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `AmontoadoRelatado` ADD CONSTRAINT `AmontoadoRelatado_provinciaId_fkey` FOREIGN KEY (`provinciaId`) REFERENCES `Provincia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AmontoadoRelatado` ADD CONSTRAINT `AmontoadoRelatado_municipioId_fkey` FOREIGN KEY (`municipioId`) REFERENCES `Municipio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
