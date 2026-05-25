import { useCallback } from 'react';
import steamService, { getPlayerSummaries, getOwnedGames, resolveVanityURL } from '../services/steam';

export function useSteam() {
  const getPlayer = useCallback(async (steamids: string) => {
    return await getPlayerSummaries(steamids);
  }, []);

  const getGames = useCallback(async (steamid: string) => {
    return await getOwnedGames(steamid);
  }, []);

  const resolve = useCallback(async (vanity: string) => {
    return await resolveVanityURL(vanity);
  }, []);

  return {
    getPlayer,
    getGames,
    resolve,
  };
}

export default useSteam;
