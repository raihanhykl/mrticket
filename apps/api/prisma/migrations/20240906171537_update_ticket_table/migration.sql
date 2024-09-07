-- AlterTable
ALTER TABLE `tickets` MODIFY `discount_price` INTEGER NULL,
    MODIFY `disc_start_date` DATETIME(3) NULL,
    MODIFY `disc_end_date` DATETIME(3) NULL;

-- CreateTable
CREATE TABLE `Cart` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quantity` INTEGER NOT NULL,
    `userId` INTEGER NULL,
    `ticketId` INTEGER NULL,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_ticketId_fkey` FOREIGN KEY (`ticketId`) REFERENCES `tickets`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
