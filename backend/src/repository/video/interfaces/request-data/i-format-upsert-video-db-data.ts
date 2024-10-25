export type IFormatUpsertVideoDBData = {
  id: string | null;
  data: {
    coverId: string;
    videoTagId: string;
    platformId: string;
    platform: string;
    artistId: string;
  };
};
