import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar,
  IonIcon,
  IonButton
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

const Tab3: React.FC = () => {
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

          <div className="profile-header">

            <img 
              src="resources/will.png"
              className="avatar"
            />

            <h1>William LGZ</h1>

            <div className="stats">

              <div>

                <strong>413</strong>

                {" "}

                <span>Jogos</span>

              </div>

              <div>

                <strong>138</strong>

                {" "}

                <span>Amigos</span>

              </div>

              <div>

                <strong>173</strong>

                {" "}

                <span>Conquistas</span>

              </div>

            </div>

          </div>

          <h2 className="section-title">Biblioteca</h2>

          <Swiper
            spaceBetween={10}
            slidesPerView={2.2}
          >

            <SwiperSlide>
              <img src="https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1245620/header.jpg" />
            </SwiperSlide>

            <SwiperSlide>
              <img src="https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1174180/header.jpg" />
            </SwiperSlide>

            <SwiperSlide>
              <img src="https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/271590/header.jpg" />
            </SwiperSlide>

          </Swiper>

          <h2 className="section-title">Lista de Desejos</h2>

          <Swiper
            spaceBetween={10}
            slidesPerView={2.2}
          >

            <SwiperSlide>
              <img src="https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1245620/header.jpg" />
            </SwiperSlide>

            <SwiperSlide>
              <img src="https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1174180/header.jpg" />
            </SwiperSlide>

            <SwiperSlide>
              <img src="https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/271590/header.jpg" />
            </SwiperSlide>

          </Swiper>

          <h2 className="section-title">
            Gêneros Favoritos
          </h2>

          <div className="stats-container">

            <div className="genre-item">

              <div className="genre-info">
                <span>RPG</span>
                <span>45%</span>
              </div>

              <div className="bar">
                <div className="fill" style={{width:'45%'}}></div>
              </div>

            </div>

            <div className="genre-item">

              <div className="genre-info">
                <span>FPS</span>
                <span>25%</span>
              </div>

              <div className="bar">
                <div className="fill" style={{width:'25%'}}></div>
              </div>

            </div>

            <div className="genre-item">

              <div className="genre-info">
                <span>Indie</span>
                <span>15%</span>
              </div>

              <div className="bar">
                <div className="fill" style={{width:'15%'}}></div>
              </div>

            </div>

            <div className="genre-item">

              <div className="genre-info">
                <span>Soulslike</span>
                <span>10%</span>
              </div>

              <div className="bar">
                <div className="fill" style={{width:'10%'}}></div>
              </div>

            </div>

            <div className="genre-item">

              <div className="genre-info">
                <span>Roguelike</span>
                <span>5%</span>
              </div>

              <div className="bar">
                <div className="fill" style={{width:'5%'}}></div>
              </div>

            </div>

          </div>

          <h2 className="section-title">
            Jogos por Ano
          </h2>

          <div className="year-stats">

            <div className="year-row">

              <span>2026</span>

              <div className="year-bar">
                <div className="year-fill" style={{width:'100%'}}></div>
              </div>

              <span>20</span>

            </div>

            <div className="year-row">

              <span>2025</span>

              <div className="year-bar">
                <div className="year-fill" style={{width:'80%'}}></div>
              </div>

              <span>16</span>

            </div>

            <div className="year-row">

              <span>2024</span>

              <div className="year-bar">
                <div className="year-fill" style={{width:'60%'}}></div>
              </div>

              <span>12</span>

            </div>

            <div className="year-row">

              <span>2023</span>

              <div className="year-bar">
                <div className="year-fill" style={{width:'40%'}}></div>
              </div>

              <span>8</span>

            </div>

            <div className="year-row">

              <span>2022</span>

              <div className="year-bar">
                <div className="year-fill" style={{width:'20%'}}></div>
              </div>

              <span>4</span>

            </div>

          </div>

        </IonContent>

      </IonContent>
      
    </IonPage>
  );
};

export default Tab3;
