import { Body, Controller, Post, Headers, Get } from '@nestjs/common';
import {
  GetLastBuildUrlResponse,
  WebHookMobileBuild,
  WebHookMobileBuildHeader,
} from './mobileApp.dto';
import { MobileAppService } from './mobileAppService';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('MobileApp')
@Controller('mobileApp')
export class MobileAppController {
  constructor(private readonly mobileAppService: MobileAppService) {}

  @Post('webhook/new_build')
  async registerSection(
    @Headers() headers: WebHookMobileBuildHeader,
    @Body() body: WebHookMobileBuild,
  ): Promise<void> {
    return this.mobileAppService.handleNewBuild(headers, body);
  }

  @Get('last_build_url')
  async getLastBuildUrl(): Promise<GetLastBuildUrlResponse> {
    return this.mobileAppService.getLastBuild();
  }
}
