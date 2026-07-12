import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonToolbar,
  IonAvatar,
  IonIcon
} from '@ionic/react';
import { logOutOutline } from 'ionicons/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useAuth } from '../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import './Tab1.css';
import { useEffect, useState } from 'react';
import { get, ref } from 'firebase/database';
import { realtimeDb } from '../firebase';

const Tab1: React.FC = () => {
  const { user, logout } = useAuth();
  const history = useHistory();

  const handleLogout = async () => {
    try {
      await logout();
      history.push('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const [recomendados] = useState([
    { appid: 1091500, name: 'Cyberpunk 2077' },
    { appid: 1174180, name: 'Red Dead Redemption 2' },
    { appid: 289070, name: 'Civilization VI' },
  ]);

  const [ofertas] = useState([
    { appid: 322330, name: 'Don\'t Starve Together', precoOriginal: 'R$ 32,99', precoDesconto: 'R$ 11,21', desconto: '-66%' },
    { appid: 292030, name: 'The Witcher 3', precoOriginal: 'R$ 129,99', precoDesconto: 'R$ 32,49', desconto: '-75%' },
    { appid: 1086940, name: 'Baldur\'s Gate 3', precoOriginal: 'R$ 199,99', precoDesconto: 'R$ 159,99', desconto: '-20%' },
  ]);

  const [maisVendidos] = useState([
    { appid: 730, name: 'Counter-Strike 2' },
    { appid: 105600, name: 'Terraria' },
    { appid: 271590, name: 'GTA V' },
  ]);

  const [gratuitos] = useState([
    { appid: 570, name: 'Dota 2' },
    { appid: 440, name: 'Team Fortress 2' },
    { appid: 1172470, name: 'Apex Legends' },
  ]);

  const [nomeUsuario, setNomeUsuario] = useState('');

    useEffect(() => {
    if (!user) return 
    const buscarNome = async () => {
        const snapshot = await get(ref(realtimeDb, `BancoDeDados/UIDs/${user!.uid}`))
        if (snapshot.exists()) {
            setNomeUsuario(snapshot.val().nomeUsuario)
        }
    }
    buscarNome()
}, [user])

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar className="header-toolbar">
          <div className="header-container">
            <div className="profile-section">
              <IonAvatar className="user-avatar">
                <img src="https://avatars.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg" alt="Avatar" />
              </IonAvatar>
              
          

              {}
              <span className="welcome-text">
                Olá, {nomeUsuario || 'Jogador'}
              </span>
            </div>
            
            <IonIcon 
              icon={logOutOutline} 
              className="logout-icon" 
              onClick={handleLogout}
            />
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="dark-content">
        
        {}
        <div className="shelf-container">
          <h2 className="shelf-title">Recomendado para você</h2>
          <Swiper slidesPerView={1.5} spaceBetween={16} className="gallery-swiper">
            {recomendados.map((jogo) => (
              <SwiperSlide key={jogo.appid} onClick={() => history.push(`/game/${jogo.appid}`)}>
                <img src={`https://cdn.akamai.steamstatic.com/steam/apps/${jogo.appid}/header.jpg`} alt={jogo.name} className="gallery-image" />
                <p className="game-title">{jogo.name}</p>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {}
        <div className="shelf-container">
          <h2 className="shelf-title highlight-title">Ofertas Especiais</h2>
          <Swiper slidesPerView={1.5} spaceBetween={16} className="gallery-swiper">
            {ofertas.map((jogo) => (
              <SwiperSlide key={jogo.appid} onClick={() => history.push(`/game/${jogo.appid}`)}>
                <div className="offer-card">
                  <span className="discount-tag">{jogo.desconto}</span>
                  <img src={`https://cdn.akamai.steamstatic.com/steam/apps/${jogo.appid}/header.jpg`} alt={jogo.name} className="gallery-image" />
                </div>
                <p className="game-title">{jogo.name}</p>
                <div className="price-container">
                  <span className="old-price">{jogo.precoOriginal}</span>
                  <span className="new-price">{jogo.precoDesconto}</span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {}
        <div className="shelf-container">
          <h2 className="shelf-title">Mais Vendidos</h2>
          <Swiper slidesPerView={1.5} spaceBetween={16} className="gallery-swiper">
            {maisVendidos.map((jogo) => (
              <SwiperSlide key={jogo.appid} onClick={() => history.push(`/game/${jogo.appid}`)}>
                <img src={`https://cdn.akamai.steamstatic.com/steam/apps/${jogo.appid}/header.jpg`} alt={jogo.name} className="gallery-image" />
                <p className="game-title">{jogo.name}</p>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {}
        <div className="shelf-container" style={{ marginBottom: '30px' }}>
          <h2 className="shelf-title">Gratuitos em Alta</h2>
          <Swiper slidesPerView={1.5} spaceBetween={16} className="gallery-swiper">
            {gratuitos.map((jogo) => (
              <SwiperSlide key={jogo.appid} onClick={() => history.push(`/game/${jogo.appid}`)}>
                <img src={`https://cdn.akamai.steamstatic.com/steam/apps/${jogo.appid}/header.jpg`} alt={jogo.name} className="gallery-image" />
                <p className="game-title">{jogo.name}</p>
                <p className="free-tag">Gratuito para Jogar</p>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default Tab1;