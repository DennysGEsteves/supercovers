type ArtistLevel = 'amateur' | 'professional' | 'superstar';

export type ArtistReadDTO = {
  id: string;
  slug?: string;
  about?: string;
  introVideo?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  website?: string;
  level?: ArtistLevel;
  name?: string;
};
