import * as env from 'env-var';
import * as dotenv from 'dotenv';
dotenv.config({ path: './.env' });

export const SECRET_KEY: string = env.get('SECRET_KEY').required().asString();
export const BACKEND_PORT: number = env
  .get('BACKEND_PORT')
  .required()
  .asPortNumber();
