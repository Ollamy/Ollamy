/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PUBLIC_BACKEND_URL: string;
}

interface ImportMetaDto {
  readonly env: ImportMetaEnv;
}

export const ImportedMeta: ImportMetaDto = {
  env: {
    VITE_PUBLIC_BACKEND_URL: import.meta.env.VITE_PUBLIC_BACKEND_URL,
  },
};
