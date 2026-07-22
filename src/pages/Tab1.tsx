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

  const [featuredGames, setFeaturedGames] = useState<any[]>([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true);
  const [featuredError, setFeaturedError] = useState<string | null>(null);
  const [topSellers, setTopSellers] = useState<any[]>([]);
  const [loadingTopSellers, setLoadingTopSellers] = useState(true);
  const [topSellersError, setTopSellersError] = useState<string | null>(null);
  const [nomeSteam, setNomeSteam] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('https://avatars.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg');

  useEffect(() => {
    if (!user) return;
    const buscarDadosPerfil = async () => {
      try {
        const snapshot = await get(ref(realtimeDb, `BancoDeDados/UIDs/${user.uid}`));
        if (snapshot.exists()) {
          const dados = snapshot.val();
          setNomeSteam(dados.nomeSteam || '');
          if (dados.avatarSteam) {
            setAvatarUrl(dados.avatarSteam);
          }
        }
      } catch (error) {
        console.error('Erro ao buscar dados do perfil:', error);
      }
    };
    buscarDadosPerfil();
  }, [user]);

  useEffect(() => {
    const carregarDestaquesSteam = async () => {
      try {
        const response = await fetch('https://corsproxy.io/?https://store.steampowered.com/api/featured/');
        const data = await response.json();
        const games = Array.isArray(data.featured_win) ? data.featured_win : [];
        setFeaturedGames(games);
      } catch (error) {
        console.error('Erro ao buscar destaques da Steam:', error);
        setFeaturedError('Não foi possível carregar os destaques da Steam.');
      } finally {
        setLoadingFeatured(false);
      }
    };

    const carregarTopSellers = async () => {
      try {
        const response = await fetch('https://corsproxy.io/?https://store.steampowered.com/api/featuredcategories?cc=br&l=brazilian');
        const data = await response.json();
        const sellers = data.top_sellers?.items ?? [];
        setTopSellers(Array.isArray(sellers) ? sellers : []);
      } catch (error) {
        console.error('Erro ao buscar mais vendidos da Steam:', error);
        setTopSellersError('Não foi possível carregar os mais vendidos do mês.');
      } finally {
        setLoadingTopSellers(false);
      }
    };

    carregarDestaquesSteam();
    carregarTopSellers();
  }, []);

  const ofertasEspeciais = featuredGames.filter((jogo) => jogo.discounted);

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar className="header-toolbar">
          <div className="header-container">
            <div className="profile-section">
              <IonAvatar className="user-avatar">
                <img src={avatarUrl} alt="Avatar" />
              </IonAvatar>
              
          

              {}
              <span className="welcome-text">
                Olá, {nomeSteam || 'Jogador'}
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
          <h2 className="shelf-title">Destaques da Steam</h2>
          {loadingFeatured ? (
            <p>Carregando destaques...</p>
          ) : featuredError ? (
            <p>{featuredError}</p>
          ) : (
            <Swiper slidesPerView={1.5} spaceBetween={16} className="gallery-swiper">
              {featuredGames.map((jogo: any) => (
                <SwiperSlide key={jogo.id} onClick={() => history.push(`/game/${jogo.id}`)}>
                  <img
                    src={jogo.header_image || `https://cdn.akamai.steamstatic.com/steam/apps/${jogo.id}/header.jpg`}
                    alt={jogo.name}
                    className="gallery-image"
                  />
                  <p className="game-title">{jogo.name}</p>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>

        {}
        <div className="shelf-container">
          <h2 className="shelf-title">Mais vendidos do mês</h2>
          {loadingTopSellers ? (
            <p>Carregando mais vendidos...</p>
          ) : topSellersError ? (
            <p>{topSellersError}</p>
          ) : topSellers.length > 0 ? (
            <Swiper slidesPerView={1.5} spaceBetween={16} className="gallery-swiper">
              {topSellers.map((jogo: any) => (
                <SwiperSlide key={jogo.id} onClick={() => history.push(`/game/${jogo.id}`)}>
                  <img
                    src={jogo.header_image || `https://cdn.akamai.steamstatic.com/steam/apps/${jogo.id}/header.jpg`}
                    alt={jogo.name}
                    className="gallery-image"
                  />
                  <p className="game-title">{jogo.name}</p>
                  {jogo.discounted && (
                    <span className="discount-tag">-{jogo.discount_percent}%</span>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <p>Nenhum mais vendido encontrado.</p>
          )}
        </div>

        {}
        <div className="shelf-container">
          <h2 className="shelf-title highlight-title">Ofertas Especiais</h2>
          {loadingFeatured ? (
            <p>Carregando ofertas...</p>
          ) : featuredError ? (
            <p>{featuredError}</p>
          ) : ofertasEspeciais.length > 0 ? (
            <Swiper slidesPerView={1.5} spaceBetween={16} className="gallery-swiper">
              {ofertasEspeciais.map((jogo: any) => (
                <SwiperSlide key={jogo.id} onClick={() => history.push(`/game/${jogo.id}`)}>
                  <div className="offer-card">
                    <span className="discount-tag">-{jogo.discount_percent}%</span>
                    <img
                      src={jogo.header_image || `https://cdn.akamai.steamstatic.com/steam/apps/${jogo.id}/header.jpg`}
                      alt={jogo.name}
                      className="gallery-image"
                    />
                  </div>
                  <p className="game-title">{jogo.name}</p>
                  <div className="price-container">
                    <span className="old-price">{jogo.original_price ? `R$ ${(jogo.original_price / 100).toFixed(2).replace('.', ',')}` : ''}</span>
                    <span className="new-price">{jogo.final_price ? `R$ ${(jogo.final_price / 100).toFixed(2).replace('.', ',')}` : ''}</span>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <p>Nenhuma oferta encontrada.</p>
          )}
        </div>

      </IonContent>
    </IonPage>
  );
};

export default Tab1;