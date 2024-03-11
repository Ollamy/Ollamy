import { Module } from '@nestjs/common';
import { PictureService } from 'picture/picture.service';

@Module({
  imports: [],
  providers: [PictureService],
})
export class PictureModule {}
