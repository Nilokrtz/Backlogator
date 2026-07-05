import { describe, expect, it } from 'vitest';
import { filterJogos } from './tab2Utils';

const jogos = [
  {
    appid: 1245620,
    name: 'ELDEN RING',
    genres: ['Action', 'RPG']
  },
  {
    appid: 570,
    name: 'Dota 2',
    genres: ['MOBA', 'Action']
  },
  {
    appid: 1086940,
    name: 'Baldur\'s Gate 3',
    genres: ['RPG', 'Strategy']
  }
];

describe('filterJogos', () => {
  it('filtra jogos pelo gênero selecionado', () => {
    const resultado = filterJogos(jogos, '', 'RPG');
    expect(resultado).toHaveLength(2);
    expect(resultado[0]).toEqual(expect.objectContaining({ name: 'ELDEN RING' }));
  });

  it('filtra também pela pesquisa textual', () => {
    const resultado = filterJogos(jogos, 'elden', 'Todos');
    expect(resultado).toHaveLength(1);
    expect(resultado[0]).toEqual(expect.objectContaining({ name: 'ELDEN RING' }));
  });
});
