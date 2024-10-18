interface AppEnv {
  backendUrl: string;
}

export const EnvVar: AppEnv = {
  backendUrl: process.env.EXPO_PUBLIC_BACKEND_URL ?? 'Fail to load env var',
};
