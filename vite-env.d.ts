interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_API_URL_IMAGE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
