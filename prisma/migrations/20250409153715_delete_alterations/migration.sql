/*
  Warnings:

  - You are about to drop the `comentario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `comentario` DROP FOREIGN KEY `Comentario_amontoadoRelatadoId_fkey`;

-- DropForeignKey
ALTER TABLE `comentario` DROP FOREIGN KEY `Comentario_userId_fkey`;

-- DropTable
DROP TABLE `comentario`;
