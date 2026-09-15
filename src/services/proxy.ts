/**
 * Retorna a URL através do proxy para evitar problemas de CORS com a Steam.
 * Em desenvolvimento local (Vite), utiliza o middleware interno (/corsproxy/?...).
 * Em produção/preview, utiliza proxy de contingência.
 */
export function getProxyUrl(url: string): string {
  if (import.meta.env.DEV) {
    return `/corsproxy/?${url}`;
  }
  return `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`;
}
