import { setGlobalOptions } from "firebase-functions";
import { onCall } from "firebase-functions/v2/https";
import axios from "axios";

setGlobalOptions({ maxInstances: 10 });

const STEAM_API_KEY = "1B3A58A79C6E63A1999307614F1AA8A8";

// Busca dados do perfil
export const getPlayerSummaries = onCall(async (request) => {
    const { steamid } = request.data;
    const response = await axios.get(
        `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${STEAM_API_KEY}&steamids=${steamid}`
    );
    return response.data.response.players[0];
});

// Busca jogos da biblioteca
export const getOwnedGames = onCall(async (request) => {
    const { steamid } = request.data;
    const response = await axios.get(
        `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${STEAM_API_KEY}&steamid=${steamid}&include_appinfo=true&include_played_free_games=true`
    );
    return response.data.response;
});

// Converte vanity URL em SteamID
export const resolveVanityURL = onCall(async (request) => {
    const { vanityurl } = request.data;
    const response = await axios.get(
        `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/?key=${STEAM_API_KEY}&vanityurl=${vanityurl}`
    );
    return response.data.response;
});