import { get } from 'env-var';
import { config } from 'dotenv';
config({ path: './.env' });

export const SECRET_KEY: string = get('SECRET_KEY').required().asString();
export const BACKEND_PORT: number = get('BACKEND_PORT')
  .required()
  .asPortNumber();
