import { Injectable } from '@nestjs/common';
import { Artist } from 'entities/artist';
import { IStoreImagesProvider } from 'providers/store-images';
import { User } from 'entities/user';
import {
  CreateArtistFromAdminDTO,
  UpdateArtistFromAdminDTO,
} from 'apis/admin/dto';
import { IUserService } from 'services/user';
import { IArtistService } from 'services/artist';
import { UpsertMeArtistDTO } from 'apis/artist/dto';
import { IVideoViewService } from 'services/video-view/interfaces/i-video-view-service';
import { IArtistsUseCases } from './interfaces';

@Injectable()
export default class ArtistsUseCases implements IArtistsUseCases {
  constructor(
    private artistsService: IArtistService,
    private usersService: IUserService,
    private videoViewService: IVideoViewService,
    private storeImagesProvider: IStoreImagesProvider,
  ) {}

  async createArtistFromAdmin(dto: CreateArtistFromAdminDTO): Promise<Artist> {
    const user = User.fromCreateArtistFromAdminDTO(dto);
    const userCreated = await this.usersService.create(user);
    const artist = Artist.fromCreateArtistFromAdminDTO(dto, userCreated);
    return this.artistsService.create(artist);
  }

  async updateArtistFromAdmin(dto: UpdateArtistFromAdminDTO): Promise<Artist> {
    const artist = await this.artistsService.findById(dto.id);
    const updatedArtist = Artist.fromUpdateArtistFromAdminDTO(dto, artist);
    const updatedUser = User.fromUpdateArtistFromAdminDTO(dto, artist.user);
    await this.usersService.update(updatedUser);
    return this.artistsService.upsert(updatedArtist);
  }

  async upsertMeArtist(params: {
    dto: UpsertMeArtistDTO;
    artist: Artist;
    user: User;
  }): Promise<Artist> {
    const { dto, artist, user } = params;
    const { topImg, ...dtoData } = dto;

    const upsertedArtist = Artist.fromUpsertMeArtistDTO(dtoData, artist, user);

    if (topImg) {
      this.storeImagesProvider.storeArtistTopImg(upsertedArtist.id, topImg);
    }

    return this.artistsService.upsert(upsertedArtist);
  }

  async findBySlug(slug: string): Promise<Artist> {
    const artist = await this.artistsService.findBySlug(slug);
    if (artist) {
      artist.views = await this.videoViewService.getArtistTotalViews(artist.id);
    }
    return artist;
  }

  findById(artistId: string): Promise<Artist> {
    return this.artistsService.findById(artistId);
  }

  async getArtistTopImg(slug: string): Promise<string> {
    const { id } = await this.artistsService.findBySlug(slug);
    return this.storeImagesProvider.getArtistTopImg(id);
  }

  findAll(): Promise<Artist[]> {
    return this.artistsService.findAll();
  }
}
