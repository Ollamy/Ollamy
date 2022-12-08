import { Injectable } from '@nestjs/common';
import { readFile } from 'fs';

@Injectable()
export class AppService {
  healthCheck(): string {
    return 'OK';
  }
}
