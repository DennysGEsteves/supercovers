/*
  Warnings:

  - A unique constraint covering the columns `[videoId]` on the table `VideoTag` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `VideoTag_videoId_key` ON `VideoTag`(`videoId`);
