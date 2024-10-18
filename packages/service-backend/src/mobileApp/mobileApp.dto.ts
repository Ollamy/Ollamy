import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class WebHookMobileBuild {
  id: string;
  appId: string;
  platform: 'android' | 'ios';
  status: 'finished' | 'error';
  artifacts?: {
    buildUrl: string;
    applicationArchiveUrl: string;
  };
  metadata: {
    appName: string;
    buildProfile: 'production' | 'development';
  };
  createdAt: string;
}

export class WebHookMobileBuildHeader {
  'expo-signature': string;
}

export class GetLastBuildUrlResponse {
  @ApiProperty()
  @IsString()
  url: string;
}
