import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar,
  IonIcon,
  IonButton,
  IonItem,
  IonInput
} from '@ionic/react';

import { 
  person 
} from 'ionicons/icons';

import { 
  Swiper, 
  SwiperSlide 
} from 'swiper/react';

import 'swiper/css';

import { useAuth } from '../contexts/AuthContext';

import { useHistory } from 'react-router-dom';

import './Tab3.css';
import { useState } from 'react';

const Tab3: React.FC = () => {

  
  const { logout } = useAuth();
  const history = useHistory();

  const [steamConectada, setSteamConectada] = useState(false);
  const [linkSteam, setLinkSteam] = useState('');
  const [avatarSteam, setAvatarSteam] = useState('');
  const [nomeSteam, setNomeSteam] = useState('');
  const [jogos, setJogos] = useState<any[]>([]);
  const [perfilPrivado, setPerfilPrivado] = useState(false);
  

  const handleLogout = async () => {
    try {
      await logout();
      history.push('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };  

  const conectarSteam = async () => {
    const linkSteamLimpo = linkSteam.replace(/\/$/, '')
    const linkID = linkSteamLimpo.split("/")
    const id = linkID[linkID.length - 1]
    
  let steamIdFinal = ''

    if (/^\d+$/.test(id)) {
        steamIdFinal = id
    } else {
        const response = await fetch(`https://corsproxy.io/?https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/?key=${import.meta.env.VITE_STEAM_API_KEY}&vanityurl=${id}`)
        const data = await response.json()
        steamIdFinal = data.response.steamid
    }

const response = await fetch(`https://corsproxy.io/?https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${import.meta.env.VITE_STEAM_API_KEY}&steamids=${steamIdFinal}`)
    const data = await response.json()
    const perfil = data.response.players[0]
    console.log('visibilidade:', perfil.communityvisibilitystate)

    setNomeSteam(perfil.personaname)
    setAvatarSteam(perfil.avatarfull)
    setPerfilPrivado(perfil.communityvisibilitystate !== 3)
    setSteamConectada(true) 

    

const responseJogos = await fetch(`https://corsproxy.io/?https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${import.meta.env.VITE_STEAM_API_KEY}&steamid=${steamIdFinal}&include_appinfo=true&include_played_free_games=true`)
const dataJogos = await responseJogos.json()
const jogos = dataJogos.response.games
const jogosOrdenados = jogos.sort((a: any, b: any) => b.playtime_forever - a.playtime_forever)
setJogos(jogosOrdenados)

}
  
  return (
    <IonPage>

      <IonHeader>

        <IonToolbar>

        <IonTitle>

          <div className="title-container">

            <IonIcon icon={person}/>

            <span>Perfil</span>

          </div>

        </IonTitle>

        <IonButton 
        className="logout-button"
        slot="end" 
        color="success" 
        onClick={handleLogout}>
          Sair
        </IonButton>          

        </IonToolbar>

      </IonHeader>

      <IonContent fullscreen>

        <IonHeader collapse="condense">

          <IonToolbar>

            <IonTitle size="large">Perfil</IonTitle>

          </IonToolbar>

        </IonHeader>

        <IonContent>

         {!steamConectada ? (
            <div>
              <p>Conecte sua conta da Steam para ver sua biblioteca!</p>
              <p style={{fontSize: '12px'}}>Cole o link do seu perfil Steam. Para encontrá-lo, acesse steamcommunity.com, clique no seu nome e copie a URL.</p>
              <IonItem>
                <IonInput
                  label="Link do perfil Steam"
                  labelPlacement="floating"
                  value={linkSteam}
                  onIonInput={(e) => setLinkSteam(e.detail.value!)}
                />
              </IonItem>
              <IonButton color="success" expand="block" onClick={conectarSteam}>
                Conectar com a Steam
              </IonButton>
            </div>
          ) : (
            <div>
              <div className="profile-header">
                <img src={avatarSteam} className="avatar" />
                <h1>{nomeSteam}</h1>

                {perfilPrivado && (
    <p style={{
        textAlign: 'center',
        color: 'orange',
        fontSize: '12px',
        padding: '8px'
    }}>
        Este perfil é privado. Algumas informações podem não estar disponíveis.
    </p>
)}

                <div className="stats">
                  <div>
                    <strong>{jogos.length}</strong>{" "}
                    <span>Jogos</span>
                  </div>
                  <div>
                    <strong>{Math.round(jogos.reduce((total, j) => total + j.playtime_forever, 0) / 60)}</strong>{" "}
                    <span>Horas</span>
                  </div>
                </div>
              </div>

              <h2 className="section-title">Biblioteca</h2>
              <Swiper spaceBetween={10} slidesPerView={2.2}>
                {jogos.map((jogo) => (
                  <SwiperSlide 
                  key={jogo.appid}
                  onClick={() => history.push(`/game/${jogo.appid}`)}
                  >
                    <img src={`https://cdn.akamai.steamstatic.com/steam/apps/${jogo.appid}/header.jpg`} />
                    <p style={{fontSize: '12px', textAlign: 'center'}}>{jogo.name}</p>
                    <p style={{fontSize: '11px', textAlign: 'center'}}>{Math.round(jogo.playtime_forever / 60)}h</p>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
          {}
          <h2 className="section-title">Gêneros Favoritos</h2>
          <div className="stats-container">
            <div className="genre-item">
              <div className="genre-info"><span>RPG</span><span>45%</span></div>
              <div className="bar"><div className="fill" style={{width:'45%'}}></div></div>
            </div>
            <div className="genre-item">
              <div className="genre-info"><span>FPS</span><span>25%</span></div>
              <div className="bar"><div className="fill" style={{width:'25%'}}></div></div>
            </div>
          </div>
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;