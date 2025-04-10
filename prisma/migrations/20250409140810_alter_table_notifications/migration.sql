-- DropForeignKey
ALTER TABLE `notificacao` DROP FOREIGN KEY `Notificacao_userId_fkey`;

-- DropIndex
DROP INDEX `Notificacao_userId_fkey` ON `notificacao`;

-- AlterTable
ALTER TABLE `notificacao` ADD COLUMN `empresaId` VARCHAR(191) NULL,
    MODIFY `userId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Notificacao` ADD CONSTRAINT `Notificacao_empresaId_fkey` FOREIGN KEY (`empresaId`) REFERENCES `Empresa`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notificacao` ADD CONSTRAINT `Notificacao_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
