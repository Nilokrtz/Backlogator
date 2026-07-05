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

import { useMemo, useState } from 'react';

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

  const jogosMockup = [
  {
    appid: 730,
    name: 'Counter-Strike 2',
    genres: ['Action', 'FPS']
  },
  {
    appid: 570,
    name: 'Dota 2',
    genres: ['MOBA', 'Strategy']
  },
  {
    appid: 105600,
    name: 'Terraria',
    genres: ['Adventure', 'Indie']
  },
  {
    appid: 413150,
    name: 'Stardew Valley',
    genres: ['Simulation', 'RPG']
  },
  {
    appid: 620,
    name: 'Portal 2',
    genres: ['Puzzle', 'Action']
  },
  {
    appid: 440,
    name: 'Team Fortress 2',
    genres: ['Action', 'FPS']
  },
  {
    appid: 271590,
    name: 'Grand Theft Auto V',
    genres: ['Action', 'Adventure']
  },
  {
    appid: 1174180,
    name: 'Red Dead Redemption 2',
    genres: ['Action', 'Adventure']
  }
];

  const [query, setQuery] = useState('');
  const [generoSelecionado, setGeneroSelecionado] = useState('Todos');
  const generos = ['Todos', 'RPG', 'Action', 'FPS', 'Adventure'];

  const jogosFiltrados = useMemo(() => filterJogos(jogosMockup, query, generoSelecionado), [query, generoSelecionado]);

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
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>

      </IonContent>
    </IonPage>
  );
};

export default Tab2;