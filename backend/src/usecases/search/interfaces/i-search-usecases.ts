import { ArtistSongParamDTO } from 'apis/search/dto';
import { SearchByTagsDTO } from 'apis/search/dto/search-by-tag-dto';
import { ArtistNameParamDTO } from 'apis/video/dto';
import { CoverArtist } from 'entities/cover';
import { User } from 'entities/user';
import { Video } from 'entities/video';

export abstract class ISearchUseCases {
  abstract searchProviderCoverSongs(dto: ArtistNameParamDTO): Promise<string[]>;
  abstract searchProviderCoverArtists(artistName: string): Promise<string[]>;
  abstract searchSuperArtistsByMatchName(artistName: string): Promise<User[]>;
  abstract searchCoverArtistsByName(name: string): Promise<CoverArtist>;
  abstract searchCoverSongsByName(dto: ArtistSongParamDTO): Promise<Video[]>;
  abstract searchVideosByTags(dto: SearchByTagsDTO): Promise<Video[]>;
}
