/*
  Warnings:

  - Added the required column `address` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `brand` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `color` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageBottom` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageLeft` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageRight` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageTop` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `material` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order` ADD COLUMN `address` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `product` ADD COLUMN `brand` VARCHAR(191) NOT NULL,
    ADD COLUMN `color` VARCHAR(191) NOT NULL,
    ADD COLUMN `imageBottom` VARCHAR(191) NOT NULL,
    ADD COLUMN `imageLeft` VARCHAR(191) NOT NULL,
    ADD COLUMN `imageRight` VARCHAR(191) NOT NULL,
    ADD COLUMN `imageTop` VARCHAR(191) NOT NULL,
    ADD COLUMN `material` VARCHAR(191) NOT NULL,
    ADD COLUMN `type` VARCHAR(191) NOT NULL;
