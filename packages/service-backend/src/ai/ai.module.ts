import { Module } from '@nestjs/common';
import { AiService } from 'ai/ai.service';
import { AiController } from 'ai/ai.controller';

@Module({
  imports: [],
  providers: [AiService],
  controllers: [AiController],
})
export class AiModule { }
