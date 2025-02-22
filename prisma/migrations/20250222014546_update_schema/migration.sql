/*
  Warnings:

  - Added the required column `localActuacao` to the `Empresa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `empresa` ADD COLUMN `localActuacao` ENUM('LUANDA', 'CAZENGA', 'MUSSULO', 'MUTAMBA', 'ICOLO_E_BENGO', 'MAIANGA', 'VIANA', 'SAMBA', 'CACUACO', 'BELAS', 'RANGEL', 'QUICAMA', 'CALUMBO', 'CAMAMA', 'HOJI_YA_HENDA') NOT NULL;
