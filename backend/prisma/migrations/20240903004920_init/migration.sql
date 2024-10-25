-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `emailVerified` DATETIME(3) NULL,
    `password` VARCHAR(191) NULL,
    `isJudge` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Artist` (
    `id` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `about` TEXT NULL,
    `introVideo` VARCHAR(191) NULL,
    `facebook` VARCHAR(191) NULL,
    `instagram` VARCHAR(191) NULL,
    `twitter` VARCHAR(191) NULL,
    `website` VARCHAR(191) NULL,
    `level` VARCHAR(191) NOT NULL DEFAULT 'amateur',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `Artist_slug_key`(`slug`),
    UNIQUE INDEX `Artist_userId_key`(`userId`),
    INDEX `Artist_slug_userId_idx`(`slug`, `userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ArtistView` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `artistId` VARCHAR(191) NOT NULL,
    `ip` VARCHAR(191) NOT NULL,

    INDEX `ArtistView_artistId_idx`(`artistId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Video` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `platformId` VARCHAR(191) NOT NULL,
    `platform` VARCHAR(191) NOT NULL,
    `artistId` VARCHAR(191) NOT NULL,
    `coverId` VARCHAR(191) NOT NULL,
    `deletedAt` DATETIME(3) NULL,
    `videoTagId` VARCHAR(191) NULL,

    INDEX `Video_coverId_idx`(`coverId`),
    INDEX `Video_artistId_idx`(`artistId`),
    UNIQUE INDEX `Video_artistId_platform_platformId_key`(`artistId`, `platform`, `platformId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VideoTag` (
    `id` VARCHAR(191) NOT NULL,
    `songStyle` VARCHAR(191) NOT NULL,
    `instrumentalOrVocal` VARCHAR(191) NOT NULL,
    `typeInstruments` VARCHAR(191) NOT NULL,
    `formation` VARCHAR(191) NOT NULL,
    `videoId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CoverArtist` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `imgUrl` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `CoverArtist_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CoverSong` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `coverArtistId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `CoverSong_coverArtistId_name_key`(`coverArtistId`, `name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cover` (
    `id` VARCHAR(191) NOT NULL,
    `coverArtistId` VARCHAR(191) NOT NULL,
    `coverSongId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Cover_coverArtistId_coverSongId_key`(`coverArtistId`, `coverSongId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VideoView` (
    `id` VARCHAR(191) NOT NULL,
    `ip` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `videoId` VARCHAR(191) NOT NULL,
    `artistId` VARCHAR(191) NOT NULL,
    `coverArtistName` VARCHAR(191) NOT NULL,
    `coverSongName` VARCHAR(191) NOT NULL,
    `songStyle` VARCHAR(191) NOT NULL,

    INDEX `VideoView_songStyle_idx`(`songStyle`),
    INDEX `VideoView_coverArtistName_idx`(`coverArtistName`),
    INDEX `VideoView_coverSongName_idx`(`coverSongName`),
    INDEX `VideoView_artistId_idx`(`artistId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FeaturedVideo` (
    `id` VARCHAR(191) NOT NULL,
    `videoId` VARCHAR(191) NOT NULL,
    `position` INTEGER NOT NULL DEFAULT 1,

    UNIQUE INDEX `FeaturedVideo_videoId_key`(`videoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Favorite` (
    `id` VARCHAR(191) NOT NULL,
    `videoId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `position` INTEGER NOT NULL,

    INDEX `Favorite_videoId_userId_idx`(`videoId`, `userId`),
    INDEX `Favorite_userId_idx`(`userId`),
    UNIQUE INDEX `Favorite_userId_videoId_key`(`userId`, `videoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Playlist` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlaylistVideo` (
    `id` VARCHAR(191) NOT NULL,
    `videoId` VARCHAR(191) NOT NULL,
    `playlistId` VARCHAR(191) NOT NULL,
    `position` INTEGER NOT NULL,

    INDEX `PlaylistVideo_videoId_playlistId_idx`(`videoId`, `playlistId`),
    INDEX `PlaylistVideo_playlistId_idx`(`playlistId`),
    UNIQUE INDEX `PlaylistVideo_playlistId_videoId_key`(`playlistId`, `videoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Artist` ADD CONSTRAINT `Artist_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArtistView` ADD CONSTRAINT `ArtistView_artistId_fkey` FOREIGN KEY (`artistId`) REFERENCES `Artist`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Video` ADD CONSTRAINT `Video_artistId_fkey` FOREIGN KEY (`artistId`) REFERENCES `Artist`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Video` ADD CONSTRAINT `Video_videoTagId_fkey` FOREIGN KEY (`videoTagId`) REFERENCES `VideoTag`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Video` ADD CONSTRAINT `Video_coverId_fkey` FOREIGN KEY (`coverId`) REFERENCES `Cover`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CoverSong` ADD CONSTRAINT `CoverSong_coverArtistId_fkey` FOREIGN KEY (`coverArtistId`) REFERENCES `CoverArtist`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cover` ADD CONSTRAINT `Cover_coverArtistId_fkey` FOREIGN KEY (`coverArtistId`) REFERENCES `CoverArtist`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cover` ADD CONSTRAINT `Cover_coverSongId_fkey` FOREIGN KEY (`coverSongId`) REFERENCES `CoverSong`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VideoView` ADD CONSTRAINT `VideoView_videoId_fkey` FOREIGN KEY (`videoId`) REFERENCES `Video`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FeaturedVideo` ADD CONSTRAINT `FeaturedVideo_videoId_fkey` FOREIGN KEY (`videoId`) REFERENCES `Video`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favorite` ADD CONSTRAINT `Favorite_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favorite` ADD CONSTRAINT `Favorite_videoId_fkey` FOREIGN KEY (`videoId`) REFERENCES `Video`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Playlist` ADD CONSTRAINT `Playlist_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlaylistVideo` ADD CONSTRAINT `PlaylistVideo_videoId_fkey` FOREIGN KEY (`videoId`) REFERENCES `Video`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlaylistVideo` ADD CONSTRAINT `PlaylistVideo_playlistId_fkey` FOREIGN KEY (`playlistId`) REFERENCES `Playlist`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
