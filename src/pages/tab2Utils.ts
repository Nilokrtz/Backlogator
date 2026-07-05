export interface JogoPesquisa {
  appid: number;
  name: string;
  genres?: string[];
}

export function filterJogos(jogos: JogoPesquisa[], query: string, genero: string) {
  const termo = query.trim().toLowerCase();
  const generoSelecionado = genero.toLowerCase();

  return jogos.filter((jogo) => {
    const nomeOk = !termo || jogo.name.toLowerCase().includes(termo);
    const generoOk = generoSelecionado === 'todos' ||
      (jogo.genres ?? []).some((genre) => genre.toLowerCase() === generoSelecionado);

    return nomeOk && generoOk;
  });
}
