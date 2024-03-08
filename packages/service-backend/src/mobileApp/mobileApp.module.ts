import { Module } from '@nestjs/common';
import { MobileAppController } from './mobileApp.controller';
import { MobileAppService } from './mobileAppService';

@Module({
  controllers: [MobileAppController],
  providers: [MobileAppService],
})
export class MobileAppModule {}
