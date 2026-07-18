import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar,
  IonButton,
  IonSearchbar,
  IonGrid,
  IonRow,
  IonCol,
  IonChip,
  IonLabel
} from '@ionic/react';

import { useAuth } from '../contexts/AuthContext';

import { useHistory } from 'react-router-dom';

import { useEffect, useMemo, useState } from 'react';

import './Tab2.css';
import { filterJogos } from './tab2Utils';

const Tab2: React.FC = () => {
  const { logout } = useAuth();
  const history = useHistory();

  const handleLogout = async () => {
    try {
      await logout();
      history.push('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const [jogosSteam, setJogosSteam] = useState<any[]>([]);
  const [query, setQuery] = useState('');
  const [generoSelecionado, setGeneroSelecionado] = useState('Todos');
  const [loading, setLoading] = useState(false);
  const generos = ['Todos', 'RPG', 'Action', 'FPS', 'Adventure', 'Indie', 'Simulation', 'Strategy', 'MOBA'];

  useEffect(() => {
    const termo = query.trim();
    if (!termo) {
      setJogosSteam([]);
      setLoading(false);
      return;
    }

    const buscarJogosSteam = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://corsproxy.io/?https://store.steampowered.com/search/?term=${encodeURIComponent(termo)}&supportedlang=brazilian&ndl=1`
        );
        const html = await response.text();

        const regex = /data-ds-appid="(\d+)"[^>]*>.*?<span class="title">([^<]+)<\/span>/gs;
        const matches = [...html.matchAll(regex)];

        const appids = matches.map((match) => Number(match[1])).slice(0, 12);

        const detalhesPorApp = await Promise.all(
          appids.map(async (appid) => {
            try {
              const responseDetalhes = await fetch(
                `https://corsproxy.io/?https://store.steampowered.com/api/appdetails?appids=${appid}&l=brazilian`
              );
              const dataDetalhes = await responseDetalhes.json();
              const appData = dataDetalhes?.[appid]?.data;

              if (!appData) return null;

              return {
                appid,
                name: appData.name || '',
                genres: appData.genres?.map((g: any) => g.description) ?? [],
                shortDescription: appData.short_description || '',
                price: appData.price_overview
                  ? `R$ ${(appData.price_overview.final / 100).toFixed(2).replace('.', ',')}`
                  : 'Grátis',
              };
            } catch {
              return null;
            }
          })
        );

        const jogos = detalhesPorApp.filter(Boolean);

        setJogosSteam(jogos);
      } catch (error) {
        console.error('Erro ao buscar jogos da Steam:', error);
        setJogosSteam([]);
      } finally {
        setLoading(false);
      }
    };

    const timeout = window.setTimeout(buscarJogosSteam, 400);
    return () => window.clearTimeout(timeout);
  }, [query]);

  const jogosFiltrados = useMemo(() => filterJogos(jogosSteam, query, generoSelecionado), [jogosSteam, query, generoSelecionado]);

  const handleSearch = (texto: string) => {
    setQuery(texto);
  };
  
  return (
    <IonPage>

      <IonHeader>

        <IonToolbar>

          <div className="title-container">

            <IonTitle>
              <span>Pesquisa</span>
            </IonTitle>

            <IonButton 
            className="logout-button"
            slot="end" 
            color="success" 
            onClick={handleLogout}>
              Sair
            </IonButton>    

          </div>      

        </IonToolbar>

      </IonHeader>

      <IonContent fullscreen>

        <IonSearchbar
        className="search-bar"
        placeholder="Pesquisar..."
        searchIcon={""}
        value={query}
        onIonInput={(e) => handleSearch(e.detail.value ?? '')}
        ></IonSearchbar>

        <div className="genre-filter-row">
          {generos.map((genero) => (
            <IonChip
              key={genero}
              color={generoSelecionado === genero ? 'success' : 'medium'}
              onClick={() => setGeneroSelecionado(genero)}
            >
              <IonLabel>{genero}</IonLabel>
            </IonChip>
          ))}
        </div>

        <IonGrid>
          {loading ? (
            <p style={{ padding: '16px' }}>Buscando jogos na Steam...</p>
          ) : jogosFiltrados.length === 0 ? (
            <p style={{ padding: '16px' }}>Nenhum jogo encontrado para a busca atual.</p>
          ) : (
            <IonRow>
              {jogosFiltrados.map((jogo) => (
                <IonCol
                  size="12"
                  sizeMd="6"
                  key={jogo.appid}
                  onClick={() => history.push(`/game/${jogo.appid}`)}
                >
                  <img
                    src={`https://cdn.akamai.steamstatic.com/steam/apps/${jogo.appid}/header.jpg`}
                    alt={jogo.name}
                    className="gallery-image"
                  />
                  <p>{jogo.name}</p>
                  {jogo.price && <p style={{ fontSize: '12px', color: '#2dd36f' }}>{jogo.price}</p>}
                  {jogo.shortDescription && (
                    <p style={{ fontSize: '11px', color: '#cfd4da' }}>
                      {jogo.shortDescription.slice(0, 90)}{jogo.shortDescription.length > 90 ? '...' : ''}
                    </p>
                  )}
                </IonCol>
              ))}
            </IonRow>
          )}
        </IonGrid>

      </IonContent>
    </IonPage>
  );
};

export default Tab2;