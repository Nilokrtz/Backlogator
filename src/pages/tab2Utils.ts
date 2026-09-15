export interface JogoPesquisa {
  appid: number;
  name: string;
  genres?: string[];
  price?: string;
  shortDescription?: string;
}

const GENRE_MAP: Record<string, string[]> = {
  todos: [],
  rpg: ['rpg', 'role-playing'],
  action: ['ação', 'acao', 'action', 'fps', 'tiro'],
  fps: ['fps', 'tiro', 'ação', 'acao', 'action', 'primeira pessoa', 'first-person shooter'],
  adventure: ['aventura', 'adventure'],
  indie: ['indie'],
  simulation: ['simulação', 'simulacao', 'simulation', 'simulador'],
  strategy: ['estratégia', 'estrategia', 'strategy'],
  moba: ['moba', 'estratégia', 'estrategia', 'ação', 'acao']
};

export function filterJogos(jogos: JogoPesquisa[], query: string, genero: string) {
  const termo = query.trim().toLowerCase();
  const generoKey = genero.trim().toLowerCase();

  return jogos.filter((jogo) => {
    const nomeOk = !termo || jogo.name.toLowerCase().includes(termo);
    if (generoKey === 'todos') return nomeOk;

    const synonyms = GENRE_MAP[generoKey] || [generoKey];
    const jogoGenres = (jogo.genres ?? []).map((g) => g.toLowerCase());

    const generoOk = synonyms.some((syn) =>
      jogoGenres.some((g) => g.includes(syn) || syn.includes(g)) ||
      (jogo.shortDescription && jogo.shortDescription.toLowerCase().includes(syn)) ||
      jogo.name.toLowerCase().includes(syn)
    );

    return nomeOk && (generoOk || !jogo.genres || jogo.genres.length === 0);
  });
}
