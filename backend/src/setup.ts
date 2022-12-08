import * as env from 'env-var';

export const SECRET_KEY: string = env.get('SECRET_KEY').required().asString();
export const BACKEND_PORT: number = env.get('BACKEND_PORT').required().asPortNumber();