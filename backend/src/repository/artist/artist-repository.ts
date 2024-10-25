import { Injectable } from '@nestjs/common';
import { Artist, ArtistUser } from 'entities/artist';
import { PrismaService } from 'shared/prisma.service';
import {
  IArtistsRepository,
  IFormatCreateArtistDbData,
  IFormatUpsertArtistDbData,
} from './interfaces';

@Injectable()
export class ArtistsRepository implements IArtistsRepository {
  private db = null;

  constructor(prisma: PrismaService) {
    this.db = prisma.artist;
  }

  create(data: IFormatCreateArtistDbData): Promise<Artist> {
    return this.db.create({
      data,
    });
  }

  findByUserId(userId: string): Promise<Artist> {
    return this.db.findFirst({
      where: { userId },
    });
  }

  findById(id: string): Promise<Artist> {
    return this.db.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });
  }

  findByIdIncludeUser(id: string): Promise<ArtistUser> {
    return this.db.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });
  }

  findBySlug(slug: string): Promise<ArtistUser> {
    return this.db.findFirst({
      where: { slug },
      include: { user: true },
    });
  }

  findAllBySlug(slug: string): Promise<Artist[]> {
    return this.db.findMany({
      where: { slug },
      include: { user: true },
    });
  }

  findAll(): Promise<Artist[]> {
    return this.db.findMany({
      include: { user: true },
    });
  }

  upsert(data: IFormatUpsertArtistDbData): Promise<Artist> {
    return this.db.upsert({
      where: { id: data.id },
      update: data.data,
      create: {
        ...data.data,
        user: {
          connect: {
            id: data.userId,
          },
        },
      },
    });
  }
}
