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
  url: string;
}
