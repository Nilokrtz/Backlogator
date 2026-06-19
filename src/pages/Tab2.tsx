import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar,
  IonButton,
  IonSearchbar
} from '@ionic/react';

import { 
  Swiper, 
  SwiperSlide 
} from 'swiper/react';

import 'swiper/css';

import { useAuth } from '../contexts/AuthContext';

import { useHistory } from 'react-router-dom';

import { useState } from 'react';

import './Tab2.css';

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
    name: 'Counter-Strike 2'
  },
  {
    appid: 570,
    name: 'Dota 2'
  },
  {
    appid: 105600,
    name: 'Terraria'
  },
  {
    appid: 413150,
    name: 'Stardew Valley'
  },
  {
    appid: 620,
    name: 'Portal 2'
  },
  {
    appid: 440,
    name: 'Team Fortress 2'
  },
  {
    appid: 271590,
    name: 'Grand Theft Auto V'
  },
  {
    appid: 1174180,
    name: 'Red Dead Redemption 2'
  }
];

  const [query, setQuery] = useState('');
  const [jogos, setJogos] = useState(jogosMockup);

  const handleSearch = (texto: string) => {
  setQuery(texto);

  const resultados = jogosMockup.filter((jogo) =>
    jogo.name.toLowerCase().includes(texto.toLowerCase())
  );

  setJogos(resultados);
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

        <Swiper 
        slidesPerView={1.3}
        spaceBetween={12}
        className="gallery-swiper"
        >
          {jogos.map((jogo) => (
            <SwiperSlide
              key={jogo.appid}
              onClick={() => history.push(`/game/${jogo.appid}`)}
            >
              <img
                src={`https://cdn.akamai.steamstatic.com/steam/apps/${jogo.appid}/header.jpg`}
                alt={jogo.name}
                className="gallery-image"
              />

              <p>{jogo.name}</p>
            </SwiperSlide>
          ))}
        </Swiper>

      </IonContent>
    </IonPage>
  );
};

export default Tab2;