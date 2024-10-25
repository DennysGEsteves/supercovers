export type SeedDataArtist = {
  name: string;
  slug: string;
  id?: string;
  userId?: string;
};

export type SeedDataSong = {
  videoId?: string;
  platformId: string;
  cover: {
    coverArtist: string;
    coverSong: string;
    id?: string;
  };
  tags: {
    songStyle: string;
    instrumentalOrVocal: string;
    typeInstruments: string;
    formation: string;
    id?: string;
  };
  views: number;
  isFeatureVideo?: boolean;
};

// const example =  {
//   artist: {
//     name: 'Boyce Avenue',
//     slug: 'boyce-avenue',
//   } as SeedDataArtist,
//   songs: [
//     {
//       cover: {
//         coverArtist: 'Justin Timberlake',
//         coverSong: 'Mirrors',
//       },
//       platformId: 'fvEZUbzqqyM',
//       tags: {
//         songStyle: 'pop',
//         instrumentalOrVocal: 'vocal',
//         typeInstruments: 'acustico',
//         formation: 'banda',
//       },
//       views: 100,
//       isFeatureVideo: true,
//     },
//   ] as SeedDataSong[],
// }

export const seedData = [
  {
    artist: {
      name: 'Boyce Avenue',
      slug: 'boyce-avenue',
    } as SeedDataArtist,
    songs: [
      {
        cover: {
          coverArtist: 'Justin Timberlake',
          coverSong: 'Mirrors',
        },
        platformId: 'fvEZUbzqqyM',
        tags: {
          songStyle: 'pop',
          instrumentalOrVocal: 'vocal',
          typeInstruments: 'acustico',
          formation: 'banda',
        },
        views: 100,
        isFeatureVideo: true,
      },
      {
        cover: {
          coverArtist: 'Sia',
          coverSong: 'Unstoppable',
        },
        platformId: '5gIRfnDEWjk',
        tags: {
          songStyle: 'pop',
          instrumentalOrVocal: 'vocal',
          typeInstruments: 'acustico',
          formation: 'dupla',
        },
        views: 300,
        isFeatureVideo: true,
      },
    ] as SeedDataSong[],
  },
  {
    artist: {
      name: 'Cloud9 EvCover',
      slug: 'cloud-9',
    } as SeedDataArtist,
    songs: [
      {
        cover: {
          coverArtist: 'Evanescence',
          coverSong: 'The Change',
        },
        platformId: 'aKzWASpJYnU',
        tags: {
          songStyle: 'rock',
          instrumentalOrVocal: 'vocal',
          typeInstruments: 'acustico',
          formation: 'dupla',
        },
        views: 27,
      },
      {
        cover: {
          coverArtist: 'Evanescence',
          coverSong: 'Going Under',
        },
        platformId: 'W2AAwSUwZL4',
        tags: {
          songStyle: 'rock',
          instrumentalOrVocal: 'vocal',
          typeInstruments: 'acustico',
          formation: 'dupla',
        },
        views: 77,
        isFeatureVideo: true,
      },
    ] as SeedDataSong[],
  },
  {
    artist: {
      name: 'First To Eleven',
      slug: 'first-to-eleven',
    } as SeedDataArtist,
    songs: [
      {
        cover: {
          coverArtist: 'Justin Timberlake',
          coverSong: 'Cry Me A River',
        },
        platformId: 'rvhO1oDeXRQ',
        tags: {
          songStyle: 'pop',
          instrumentalOrVocal: 'vocal',
          typeInstruments: 'acustico',
          formation: 'banda',
        },
        views: 215,
        isFeatureVideo: true,
      },
    ] as SeedDataSong[],
  },
  {
    artist: {
      name: 'Adam Pearce',
      slug: 'adam-pearce',
    } as SeedDataArtist,
    songs: [
      {
        cover: {
          coverArtist: 'Pearl Jam',
          coverSong: 'Even Flow',
        },
        platformId: '6SM7uPzI0k4',
        tags: {
          songStyle: 'rock',
          instrumentalOrVocal: 'vocal',
          typeInstruments: 'acustico',
          formation: 'solo',
        },
        views: 66,
      },
      {
        cover: {
          coverArtist: 'Aerosmith',
          coverSong: 'Dream On',
        },
        platformId: 'FBUFKAya9kE',
        tags: {
          songStyle: 'rock',
          instrumentalOrVocal: 'vocal',
          typeInstruments: 'acustico',
          formation: 'banda',
        },
        views: 150,
        isFeatureVideo: true,
      },
    ] as SeedDataSong[],
  },
  {
    artist: {
      name: 'House of Billy Gaga Studios',
      slug: 'house-of-billy-gaga-studios',
    } as SeedDataArtist,
    songs: [
      {
        cover: {
          coverArtist: 'Paramore',
          coverSong: 'Last Hope',
        },
        platformId: 'QL5BZrJT5jA',
        tags: {
          songStyle: 'pop',
          instrumentalOrVocal: 'vocal',
          typeInstruments: 'convencional',
          formation: 'banda',
        },
        views: 26,
        isFeatureVideo: true,
      },
      {
        cover: {
          coverArtist: 'Paramore',
          coverSong: "Ain't It Fun",
        },
        platformId: 'MbwH_LZ6Um0',
        tags: {
          songStyle: 'pop',
          instrumentalOrVocal: 'vocal',
          typeInstruments: 'convencional',
          formation: 'banda',
        },
        views: 94,
        isFeatureVideo: true,
      },
    ] as SeedDataSong[],
  },
  {
    artist: {
      name: 'Obadiah Parker',
      slug: 'obadiah-parker',
    } as SeedDataArtist,
    songs: [
      {
        cover: {
          coverArtist: 'Sia',
          coverSong: 'Chandelier',
        },
        platformId: 'mEu0Pasqn6Q',
        tags: {
          songStyle: 'pop',
          instrumentalOrVocal: 'vocal',
          typeInstruments: 'acustico',
          formation: 'solo',
        },
        views: 26,
      },
      {
        cover: {
          coverArtist: 'Outkast',
          coverSong: 'Hey Ya',
        },
        platformId: 'c745E7T_Wvg',
        tags: {
          songStyle: 'pop',
          instrumentalOrVocal: 'vocal',
          typeInstruments: 'acustico',
          formation: 'solo',
        },
        views: 122,
        isFeatureVideo: true,
      },
    ] as SeedDataSong[],
  },
  {
    artist: {
      name: 'Dakota Rhodes',
      slug: 'dakota-rhodes',
    } as SeedDataArtist,
    songs: [
      {
        cover: {
          coverArtist: 'Paramore',
          coverSong: 'Misery Business',
        },
        platformId: 'mrRPAmf-yb0',
        tags: {
          songStyle: 'rock',
          instrumentalOrVocal: 'vocal',
          typeInstruments: 'acustico',
          formation: 'solo',
        },
        views: 81,
      },
      {
        cover: {
          coverArtist: 'Shania Twain',
          coverSong: "You're Still The One",
        },
        platformId: 'W5kJZ3y8ZkQ',
        tags: {
          songStyle: 'pop',
          instrumentalOrVocal: 'vocal',
          typeInstruments: 'acustico',
          formation: 'solo',
        },
        views: 55,
      },
    ] as SeedDataSong[],
  },
];
