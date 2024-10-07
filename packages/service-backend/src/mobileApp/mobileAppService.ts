import { Injectable } from '@nestjs/common';
import {
  GetLastBuildUrlResponse,
  WebHookMobileBuild,
  WebHookMobileBuildHeader,
} from './mobileApp.dto';
import { createHmac } from 'crypto';
import { join, resolve } from 'path';
import { createWriteStream, readdirSync } from 'fs';
import axios from 'axios';
import { BACKEND_PORT, EAS_BUILD_WEBHOOK_SECRET, FRONTEND_URL } from '../setup';
import _ from 'underscore';

function checkWebhookHash(expoSignature: string, body: WebHookMobileBuild) {
  const hmac = createHmac('sha1', EAS_BUILD_WEBHOOK_SECRET);
  hmac.update(JSON.stringify(body));

  return expoSignature === `sha1=${hmac.digest('hex')}`;
}

async function downloadFile(
  url: string,
  destinationPath: string,
): Promise<void> {
  const response = await axios.get(url, { responseType: 'stream' });
  const writer = createWriteStream(destinationPath);

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}

@Injectable()
export class MobileAppService {
  private publicFolder = resolve(process.cwd(), 'public', 'mobile_build');
  private backendURL = `${FRONTEND_URL}:${BACKEND_PORT}/public/mobile_build`;

  async handleNewBuild(
    headers: WebHookMobileBuildHeader,
    body: WebHookMobileBuild,
  ) {
    const expoSignature = headers['expo-signature'];

    if (!checkWebhookHash(expoSignature, body)) {
      throw new Error("Signatures didn't match!");
    } else if (body.artifacts?.buildUrl === undefined) {
      throw new Error('We need a build url');
    }

    if (
      body.status !== 'finished' ||
      body.metadata.buildProfile === 'development'
    )
      return;

    const filename = `${body.createdAt}-${body.id}.apk`;
    await downloadFile(
      body.artifacts.buildUrl,
      join(this.publicFolder, filename),
    );
  }

  async getLastBuild(): Promise<GetLastBuildUrlResponse> {
    const fileName = readdirSync(this.publicFolder).sort().at(-1);

    if (!fileName.endsWith('.apk')) {
      throw new Error('There is no apk available!');
    }
    return { url: `${this.backendURL}/${fileName}` };
  }
}
