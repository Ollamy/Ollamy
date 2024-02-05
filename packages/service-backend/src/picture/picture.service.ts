import {
  Logger,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import prisma from 'client';
import { Picture } from '@prisma/client';
import axios from 'axios';
import { resolve, join } from 'path';
import { writeFile } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import { extension } from 'mime-types';
import { BACKEND_PORT, FRONTEND_URL } from 'setup';


@Injectable()
export class PictureService {
  static publicFolder = resolve(process.cwd(), 'public');
  static backendURL = `${FRONTEND_URL}:${BACKEND_PORT}/public`;

  static isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (err) {
      return false;
    }
  }

  static async getBase64Image(imageUrl: string): Promise<{ data: string, type: string }> {
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const base64ImageData = response.data.toString('base64');
    const ext = extension(response.headers['content-type']) || 'png';

    return {
      data: base64ImageData,
      type: ext
    };
  }

  static async postPicture(pictureData: string): Promise<string> {
    try {
      const raw =
        PictureService.isValidUrl(pictureData) === true
          ? await PictureService.getBase64Image(pictureData)
          : { data: pictureData, type: 'png' };

      const filename = `${uuidv4()}.${raw.type}`;
      const picturePath = join(this.publicFolder, filename);
      await writeFile(picturePath, raw.data, 'base64')

      const pictureDb = await prisma.picture.create({
        data: {
          filename: filename,
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

      return `${this.backendURL}/${pictureDb.filename}`;
    } catch (error) {
      Logger.error(error);
      throw new ConflictException('Picture not deleted !');
    }
  }
}
