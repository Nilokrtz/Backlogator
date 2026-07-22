import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar,
  IonButton,
  IonItem,
  IonInput,
  IonModal
} from '@ionic/react';

import { 
  Swiper, 
  SwiperSlide 
} from 'swiper/react';

import 'swiper/css';

import { useAuth } from '../contexts/AuthContext';

import { useHistory } from 'react-router-dom';

import './Tab3.css';
import { useState, useEffect } from 'react';
import { ref, get, update } from 'firebase/database';
import { realtimeDb } from '../firebase';

const Tab3: React.FC = () => {

  
  const { user, logout } = useAuth();
  const history = useHistory();

  const [steamConectada, setSteamConectada] = useState(false);
  const [linkSteam, setLinkSteam] = useState('');
  const [avatarSteam, setAvatarSteam] = useState('');
  const [nomeSteam, setNomeSteam] = useState('');
  const [jogos, setJogos] = useState<any[]>([]);
  const [perfilPrivado, setPerfilPrivado] = useState(false);
  const [modalConquistas, setModalConquistas] = useState(false);
  const [jogoAtual, setJogoAtual] = useState<any>(null);
  const [listaConquistas, setListaConquistas] = useState<any[]>([]);
  const [steamId, setSteamId] = useState('');

  useEffect(() => {
    if (!user) return;
    const carregarPerfilSteam = async () => {
      try {
        const snapshot = await get(ref(realtimeDb, `BancoDeDados/UIDs/${user.uid}`));
        if (snapshot.exists()) {
          const dados = snapshot.val();
          if (dados.steamId) {
            setSteamId(dados.steamId);
            setNomeSteam(dados.nomeSteam || '');
            setAvatarSteam(dados.avatarSteam || '');
            setSteamConectada(true);

            // Fetch player summary again to check if avatar or name changed
            const responseSum = await fetch(`https://corsproxy.io/?https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${import.meta.env.VITE_STEAM_API_KEY}&steamids=${dados.steamId}`);
            const dataSum = await responseSum.json();
            if (dataSum.response && dataSum.response.players && dataSum.response.players[0]) {
              const perfil = dataSum.response.players[0];
              setNomeSteam(perfil.personaname);
              setAvatarSteam(perfil.avatarfull);
              setPerfilPrivado(perfil.communityvisibilitystate !== 3);
              
              // Update database if changed
              if (perfil.personaname !== dados.nomeSteam || perfil.avatarfull !== dados.avatarSteam) {
                await update(ref(realtimeDb, `BancoDeDados/UIDs/${user.uid}`), {
                  nomeSteam: perfil.personaname,
                  avatarSteam: perfil.avatarfull
                });
              }
            }

            // Fetch the games from Steam API safely
            const responseJogos = await fetch(`https://corsproxy.io/?https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${import.meta.env.VITE_STEAM_API_KEY}&steamid=${dados.steamId}&include_appinfo=true&include_played_free_games=true`);
            const dataJogos = await responseJogos.json();
            const jogos = dataJogos.response?.games || [];
            const jogosOrdenados = [...jogos].sort((a: any, b: any) => b.playtime_forever - a.playtime_forever);
            setJogos(jogosOrdenados);
          }
        }
      } catch (error) {
        console.error('Erro ao carregar perfil Steam:', error);
      }
    };
    carregarPerfilSteam();
  }, [user]);
  

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
    setSteamId(steamIdFinal)

    const response = await fetch(`https://corsproxy.io/?https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${import.meta.env.VITE_STEAM_API_KEY}&steamids=${steamIdFinal}`)
    const data = await response.json()
    const perfil = data.response.players[0]
    console.log('visibilidade:', perfil.communityvisibilitystate)

    setNomeSteam(perfil.personaname)
    setAvatarSteam(perfil.avatarfull)
    setPerfilPrivado(perfil.communityvisibilitystate !== 3)
    setSteamConectada(true) 

    if (user) {
      await update(ref(realtimeDb, `BancoDeDados/UIDs/${user.uid}`), {
        steamId: steamIdFinal,
        nomeSteam: perfil.personaname,
        avatarSteam: perfil.avatarfull
      });
    }

    const responseJogos = await fetch(`https://corsproxy.io/?https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${import.meta.env.VITE_STEAM_API_KEY}&steamid=${steamIdFinal}&include_appinfo=true&include_played_free_games=true`)
    const dataJogos = await responseJogos.json()
    const jogos = dataJogos.response?.games || []
    const jogosOrdenados = [...jogos].sort((a: any, b: any) => b.playtime_forever - a.playtime_forever)
    setJogos(jogosOrdenados)
  }

const abrirConquistas = async (jogo: any) => {
    setJogoAtual(jogo)
    
    const responseUsuario = await fetch(`https://corsproxy.io/?https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v1/?key=${import.meta.env.VITE_STEAM_API_KEY}&steamid=${steamId}&appid=${jogo.appid}&l=brazilian`)
    const dataUsuario = await responseUsuario.json()
    const conquistasUsuario = dataUsuario.playerstats.achievements
 
    const responseSchema = await fetch(`https://corsproxy.io/?https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?key=${import.meta.env.VITE_STEAM_API_KEY}&appid=${jogo.appid}&l=brazilian`)
    const dataSchema = await responseSchema.json()
    const schemaConquistas = dataSchema.game.availableGameStats.achievements

    const conquistasCombinadas = conquistasUsuario.map((conquista: any) => {
        const detalhes = schemaConquistas.find((s: any) => s.name === conquista.apiname)
        return {
            nome: detalhes?.displayName,
            icone: conquista.achieved ? detalhes?.icon : detalhes?.icongray,
            desbloqueada: conquista.achieved === 1
        }
    })

    setListaConquistas(conquistasCombinadas)
    setModalConquistas(true)
}
  
  return (
    <IonPage>

      <IonHeader>

        <IonToolbar>

          <div className="title-container">

            <IonTitle>
              <span>Perfil</span>
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
                /** */
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
              onClick={() => abrirConquistas(jogo)}
              >
                <img src={`https://cdn.akamai.steamstatic.com/steam/apps/${jogo.appid}/header.jpg`} />
                <p style={{fontSize: '12px', textAlign: 'center'}}>{jogo.name}</p>
                <p style={{fontSize: '11px', textAlign: 'center'}}>{Math.round(jogo.playtime_forever / 60)}h</p>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      <IonModal isOpen={modalConquistas} onDidDismiss={() => setModalConquistas(false)}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{jogoAtual?.name}</IonTitle>
          <IonButton slot="end" fill="clear" onClick={() => setModalConquistas(false)}>
            Fechar
          </IonButton>
          <IonButton slot="end" color="success" fill="clear" onClick={() => {
            setModalConquistas(false)
            history.push(`/game/${jogoAtual?.appid}`)
          }}>
            Ver jogo
          </IonButton>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <h2 style={{padding: '16px'}}>Conquistas</h2>
        {listaConquistas.map((conquista, index) => (
          <div key={index} style={{display: 'flex', alignItems: 'center', padding: '8px 16px', gap: '12px'}}>
            <img src={conquista.icone} style={{width: '48px', height: '48px'}} />
            <p style={{
              margin: 0,
              color: conquista.desbloqueada ? 'white' : 'gray'
            }}>
              {conquista.nome}
            </p>
          </div>
        ))}

      </IonContent>
      </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;