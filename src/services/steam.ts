const API_KEY = import.meta.env.VITE_STEAM_API_KEY as string | undefined;

function assertKey() {
  if (!API_KEY) throw new Error('VITE_STEAM_API_KEY não está definida. Adicione-a em .env.local');
}

function buildUrl(path: string, params: Record<string, string | number | boolean> = {}) {
  assertKey();
  const url = new URL(`https://corsproxy.io/?https://api.steampowered.com/${path}`);
  url.searchParams.set('key', API_KEY!);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)));
  return url.toString();
}

export async function resolveVanityURL(vanityurl: string) {
  const url = buildUrl('ISteamUser/ResolveVanityURL/v1/', { vanityurl });
  const res = await fetch(url);
  const json = await res.json();
  if (json.response && json.response.success === 1) return json.response.steamid as string;
  throw new Error('Não foi possível resolver vanity URL');
}

export async function getPlayerSummaries(steamids: string) {
  const url = buildUrl('ISteamUser/GetPlayerSummaries/v2/', { steamids });
  const res = await fetch(url);
  const json = await res.json();
  return json.response?.players ?? [];
}

export async function getOwnedGames(steamid: string, includeAppInfo = true) {
  const url = buildUrl('IPlayerService/GetOwnedGames/v1/', {
    steamid,
    include_appinfo: includeAppInfo ? 1 : 0,
    include_played_free_games: 1,
  });
  const res = await fetch(url);
  const json = await res.json();
  return json.response ?? {};
}

export default {
  resolveVanityURL,
  getPlayerSummaries,
  getOwnedGames,
};
