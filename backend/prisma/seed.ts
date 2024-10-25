/* eslint-disable no-console */
/* eslint-disable max-depth */
/* eslint-disable no-await-in-loop */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
import { PrismaClient } from '@prisma/client';
import { seedData, SeedDataArtist, SeedDataSong } from './seedData';

let prisma: any;

try {
  prisma = new PrismaClient();
} catch (error) {
  console.log(error);
}

async function main() {
  async function login() {
    console.log('login started');
    await prisma.user.upsert({
      where: {
        email: 'dennysteves@hotmail.com',
      },
      create: {
        name: 'Dennys Esteves',
        email: 'dennysteves@hotmail.com',
        password:
          '$2b$10$HyJ9zEoiIMY8Yd5YIS4hUu4nUdYsHKXwA0m6zLMeF9U4GoZJhaGpO',
      },
      update: {},
    });
    console.log('login ended');
  }

  async function massData() {
    async function upsertUser(artist: SeedDataArtist) {
      let data = await prisma.user.findFirst({
        where: {
          name: artist.name,
        },
      });

      if (!data) {
        data = await prisma.user.create({
          data: {
            name: artist.name,
          },
        });
      }

      artist.userId = data.id;

      return artist;
    }

    async function upsertArtist(artist: SeedDataArtist) {
      let data = await prisma.artist.findFirst({
        where: {
          slug: artist.slug,
        },
      });

      if (!data) {
        data = await prisma.artist.create({
          data: {
            slug: artist.slug,
            userId: artist.userId,
          },
        });
      }

      artist.id = data.id;

      return artist;
    }

    async function upsertSongCover(song: SeedDataSong) {
      const coverArtist = await prisma.coverArtist.upsert({
        where: {
          name: song.cover.coverArtist,
        },
        create: {
          name: song.cover.coverArtist,
        },
        update: {},
      });

      const coverSong = await prisma.coverSong.upsert({
        where: {
          coverArtistId_name: {
            name: song.cover.coverSong,
            coverArtistId: coverArtist.id,
          },
        },
        create: {
          name: song.cover.coverSong,
          coverArtistId: coverArtist.id,
        },
        update: {},
      });

      const data = await prisma.cover.upsert({
        where: {
          coverArtistId_coverSongId: {
            coverArtistId: coverArtist.id,
            coverSongId: coverSong.id,
          },
        },
        create: {
          coverArtistId: coverArtist.id,
          coverSongId: coverSong.id,
        },
        update: {},
      });

      song.cover.id = data.id;

      return song;
    }

    async function upsertSongVideo(song: SeedDataSong, artist: SeedDataArtist) {
      const data = await prisma.video.upsert({
        where: {
          artistId_platform_platformId: {
            artistId: artist.id,
            platformId: song.platformId,
            platform: 'youtube',
          },
        },
        create: {
          artistId: artist.id,
          platformId: song.platformId,
          platform: 'youtube',
          coverId: song.cover.id,
        },
        update: {},
      });

      song.videoId = data.id;

      return song;
    }

    async function upsertSongVideoTag(song: SeedDataSong) {
      const data = await prisma.videoTag.upsert({
        where: {
          videoId: song.videoId,
        },
        create: {
          songStyle: song.tags.songStyle,
          instrumentalOrVocal: song.tags.instrumentalOrVocal,
          typeInstruments: song.tags.typeInstruments,
          formation: song.tags.formation,
          videoId: song.videoId,
        },
        update: {},
      });

      song.tags.id = data.id;

      await prisma.video.update({
        where: {
          id: song.videoId,
        },
        data: {
          videoTagId: data.id,
        },
      });
    }

    async function upsertSongVideoViews(
      song: SeedDataSong,
      artist: SeedDataArtist,
    ) {
      await prisma.videoView.deleteMany({
        where: {
          videoId: song.videoId,
        },
      });

      const promise = [];
      for (let index = 0; index < song.views; index++) {
        promise.push(
          prisma.videoView.create({
            data: {
              ip: '::1',
              videoId: song.videoId,
              artistId: artist.id,
              coverArtistName: song.cover.coverArtist,
              coverSongName: song.cover.coverSong,
              songStyle: song.tags.songStyle,
            },
          }),
        );
      }

      await Promise.all(promise);
    }

    const featureVideosList: string[] = [];

    for (let i = 0; i < seedData.length; i++) {
      const data = seedData[i];
      data.artist = await upsertUser(data.artist);
      data.artist = await upsertArtist(data.artist);

      for (let x = 0; x < data.songs.length; x++) {
        let song = data.songs[x];
        song = await upsertSongCover(song);
        song = await upsertSongVideo(song, data.artist);
        await upsertSongVideoTag(song);
        await upsertSongVideoViews(song, data.artist);

        if (song.isFeatureVideo) {
          featureVideosList.push(song.videoId);
        }
      }
    }

    return featureVideosList;
  }

  async function featureVideos(featureVideosList: string[]) {
    await prisma.featuredVideo.deleteMany({
      where: {},
    });

    for (let i = 0; i < featureVideosList.length; i++) {
      const videoId = featureVideosList[i];

      await prisma.featuredVideo.create({
        data: {
          videoId,
          position: i,
        },
      });
    }
  }

  console.log('seed started');

  await login();
  const featureVideosList = await massData();
  await featureVideos(featureVideosList);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
