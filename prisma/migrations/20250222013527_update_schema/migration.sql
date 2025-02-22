-- CreateTable
CREATE TABLE `Users` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `tipoUser_id` VARCHAR(191) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Users_email_key`(`email`),
    INDEX `Users_tipoUser_id_fkey`(`tipoUser_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tipouser` (
    `id` VARCHAR(191) NOT NULL,
    `tipoUser` ENUM('Empresa de Recolha', 'Cidadão Comum') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Empresa` (
    `id` VARCHAR(191) NOT NULL,
    `nomeEmpresa` VARCHAR(191) NOT NULL,
    `emailEmpresa` VARCHAR(191) NOT NULL,
    `estadoEmpresa` ENUM('PRIVADO', 'PUBLICO') NOT NULL,

    UNIQUE INDEX `Empresa_emailEmpresa_key`(`emailEmpresa`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AmontoadoRelatado` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `desc` VARCHAR(191) NOT NULL,
    `foto` VARCHAR(191) NOT NULL,
    `latitude` DECIMAL(65, 30) NOT NULL,
    `longitude` DECIMAL(65, 30) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `quantidade` ENUM('PEQUENO', 'MEDIO', 'GRANDE') NOT NULL,
    `localidade` ENUM('LUANDA', 'CAZENGA', 'MUSSULO', 'MUTAMBA', 'ICOLO_E_BENGO', 'MAIANGA', 'VIANA', 'SAMBA', 'CACUACO', 'BELAS', 'RANGEL', 'QUICAMA', 'CALUMBO', 'CAMAMA', 'HOJI_YA_HENDA') NOT NULL,
    `categoria` ENUM('ORGANICO', 'RECICLAVEL', 'PERIGOSO', 'ELECTRONICO', 'OUTROS') NOT NULL,
    `prioridade` ENUM('BAIXA', 'MEDIA', 'ALTA') NOT NULL,
    `status` ENUM('RESOLVIDO', 'PENDENTE') NOT NULL,

    INDEX `AmontoadoRelatado_user_id_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notificacao` (
    `id` VARCHAR(191) NOT NULL,
    `id_user` VARCHAR(191) NOT NULL,
    `titulo` VARCHAR(191) NOT NULL,
    `mensagem` VARCHAR(191) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    INDEX `Notificacao_id_user_idx`(`id_user`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Feedback` (
    `id` VARCHAR(191) NOT NULL,
    `id_user` VARCHAR(191) NOT NULL,
    `feedback` VARCHAR(191) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `tipo_feedack` ENUM('SUGESTAO', 'RECLAMACAO', 'ELOGIO') NOT NULL,

    INDEX `Feedback_id_user_idx`(`id_user`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RelatorioColeta` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `amontoado_id` VARCHAR(191) NOT NULL,
    `dataColeta` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `statusColeta` ENUM('RETIRADO', 'NAO_RETIRADO', 'PENDENTE') NOT NULL,

    INDEX `RelatorioColeta_amontoado_id_idx`(`amontoado_id`),
    INDEX `RelatorioColeta_user_id_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pagamento` (
    `id` VARCHAR(191) NOT NULL,
    `id_empresa` VARCHAR(191) NOT NULL,
    `valor` DECIMAL(65, 30) NOT NULL,
    `metodo_pagamento` ENUM('VISA', 'TRASNFERENCIA_BANCARIA') NOT NULL,
    `status_pagamento` ENUM('PAGO', 'NAO_PAGO') NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `upadateAt` DATETIME(3) NOT NULL,

    INDEX `Pagamento_id_empresa_idx`(`id_empresa`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pontos` (
    `id` VARCHAR(191) NOT NULL,
    `id_user` VARCHAR(191) NOT NULL,
    `pontos` INTEGER NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `upadateAt` DATETIME(3) NOT NULL,

    INDEX `Pontos_id_user_idx`(`id_user`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Resgate` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `recompensa_id` VARCHAR(191) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `upadateAt` DATETIME(3) NOT NULL,

    INDEX `Resgate_user_id_idx`(`user_id`),
    INDEX `Resgate_recompensa_id_idx`(`recompensa_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Recompensa` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `pontosNecessarios` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Configuracao` (
    `id` VARCHAR(191) NOT NULL,
    `acao` VARCHAR(191) NOT NULL,
    `data_acao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `id_user` VARCHAR(191) NOT NULL,

    INDEX `Configuracao_id_user_idx`(`id_user`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_tipoUser_id_fkey` FOREIGN KEY (`tipoUser_id`) REFERENCES `Tipouser`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AmontoadoRelatado` ADD CONSTRAINT `AmontoadoRelatado_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notificacao` ADD CONSTRAINT `Notificacao_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Feedback` ADD CONSTRAINT `Feedback_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RelatorioColeta` ADD CONSTRAINT `RelatorioColeta_amontoado_id_fkey` FOREIGN KEY (`amontoado_id`) REFERENCES `AmontoadoRelatado`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RelatorioColeta` ADD CONSTRAINT `RelatorioColeta_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pagamento` ADD CONSTRAINT `Pagamento_id_empresa_fkey` FOREIGN KEY (`id_empresa`) REFERENCES `Empresa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pontos` ADD CONSTRAINT `Pontos_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Resgate` ADD CONSTRAINT `Resgate_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Resgate` ADD CONSTRAINT `Resgate_recompensa_id_fkey` FOREIGN KEY (`recompensa_id`) REFERENCES `Recompensa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Configuracao` ADD CONSTRAINT `Configuracao_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
