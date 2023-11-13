import {
  Logger,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import prisma from 'client';
import { Picture, Prisma } from '@prisma/client';
import axios from 'axios';

@Injectable()
export class PictureService {
  static isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (err) {
      return false;
    }
  }

  static async getBase64Image(imageUrl: string): Promise<string> {
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const base64ImageData = response.data.toString('base64');
    Logger.debug(base64ImageData);
    return base64ImageData;
  }

  static async postPicture(pictureData: string): Promise<string> {
    try {
      const picture: string | undefined =
        PictureService.isValidUrl(pictureData) === true
          ? await PictureService.getBase64Image(pictureData)
          : pictureData;

      const pictureDb = await prisma.picture.create({
        data: {
          picture: picture,
        },
      });

      if (!pictureDb) {
        Logger.error('Failed to create picture !');
        throw new NotFoundException('Failed to create picture !');
      }
      return pictureDb.id;
    } catch (error) {
      Logger.error(error);
      throw new ConflictException('Picture not created !');
    }
  }

  static async deletePicture(pictureId: string): Promise<string> {
    try {
      const pictureDb = await prisma.picture.delete({
        where: {
          id: pictureId,
        },
      });

      if (!pictureDb) {
        Logger.error('Picture does not exists !');
        throw new NotFoundException('Picture does not exists !');
      }

      return `Picture's ${pictureId} has been deleted.`;
    } catch (error) {
      Logger.error(error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new ConflictException('Picture already removed !');
      }
      throw new ConflictException('Picture not created !');
    }
  }

  static async getPicture(pictureId: string): Promise<string | undefined> {
    try {
      const pictureDb: Picture = await prisma.picture.findFirst({
        where: {
          id: pictureId,
        },
      });

      if (!pictureDb) {
        Logger.error('Picture does not exists !');
        throw new ConflictException('Picture does not exists !');
      }

      return pictureDb.picture;
    } catch (error) {
      Logger.error(error);
      throw new ConflictException('Picture not deleted !');
    }
  }

  static async updatePicture(
    pictureId: string,
    pictureData: string,
  ): Promise<string> {
    try {
      const pictureDb: Picture = await prisma.picture.update({
        where: {
          id: pictureId,
        },
        data: pictureData,
      });

      if (!pictureDb) {
        Logger.error('Picture does not exists !');
        throw new ConflictException('Picture does not exists !');
      }

      return `Picture with id ${pictureId} has been updated`;
    } catch (error) {
      Logger.error(error);
      throw new ConflictException('Picture not updated !');
    }
  }
}
