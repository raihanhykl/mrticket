/*
  Warnings:

  - Added the required column `end_date` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_time` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_time` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `events` ADD COLUMN `end_date` DATETIME(3) NOT NULL,
    ADD COLUMN `end_time` DATETIME(3) NOT NULL,
    ADD COLUMN `start_date` DATETIME(3) NOT NULL,
    ADD COLUMN `start_time` DATETIME(3) NOT NULL,
    MODIFY `event_desc` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `vouchers` MODIFY `start_date` DATETIME(3) NULL,
    MODIFY `end_date` DATETIME(3) NULL;
