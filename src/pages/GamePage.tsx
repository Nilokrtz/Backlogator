import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonChip,
  IonLabel,
  IonButton,
  IonIcon
} from '@ionic/react';

import { 
  Swiper, 
  SwiperSlide 
} from 'swiper/react';

import { 
  arrowBack,
} from 'ionicons/icons';

import 'swiper/css';

import './GamePage.css';

import { useHistory } from 'react-router-dom';

import { useParams } from 'react-router-dom';

const GamePage: React.FC = () => {
  const history = useHistory();

  const { appid } = useParams<{ appid: string }>();

  const game = {
    name: 'ELDEN RING',

    releaseDate: '24 Feb, 2022',

    developers: [
      'FromSoftware, Inc.'
    ],

    publishers: [
      'Bandai Namco Entertainment'
    ],

    genres: [
      'Action',
      'RPG'
    ],

    categories: [
      'Single-player',
      'Online PvP',
      'Online Co-op'
    ],

    shortDescription:
      'Rise, Tarnished, and become the Elden Lord.',

    detailedDescription:
      'The Golden Order has been broken. Explore the Lands Between, face powerful enemies and discover the secrets hidden throughout this vast open world.',

    headerImage:
      'https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg',

    screenshots: [
      'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/ss_943bf6fe62352757d9070c1d33e50b92fe8539f1.1920x1080.jpg?t=1767883716',
      'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/ss_dcdac9e4b26ac0ee5248bfd2967d764fd00cdb42.1920x1080.jpg?t=1767883716',
      'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/ss_3c41384a24d86dddd58a8f61db77f9dc0bfda8b5.1920x1080.jpg?t=1767883716620/ss_3.jpg',
      'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/ss_e0316c76f8197405c1312d072b84331dd735d60b.1920x1080.jpg?t=1767883716'
    ]
  };

  return (
    <IonPage>

      <IonHeader>

        <IonToolbar>
          <IonButton
            slot="start"
            fill="clear"
            onClick={() => history.goBack()}
          >
            <IonIcon icon={arrowBack} 
            style={{ color: '#2dd36f' }}
            />
          </IonButton>

        </IonToolbar>

      </IonHeader>

      <IonContent fullscreen>

        <img
          src={game.headerImage}
          alt={game.name}
          className="game-banner"
        />

        <div className="game-info">

          <h1>{game.name}</h1>

          <p className="game-release">
            Lançamento: {game.releaseDate}
          </p>

          <div className="game-section">

            <h3>Desenvolvedora</h3>

            <p>
              {game.developers.join(', ')}
            </p>

          </div>

          <div className="game-section">

            <h3>Publicadora</h3>

            <p>
              {game.publishers.join(', ')}
            </p>

          </div>

          <div className="game-section">

            <h3>Categorias</h3>

            <div className="chips-container">

              {game.categories.map((category) => (
                <IonChip key={category}>
                  <IonLabel>{category}</IonLabel>
                </IonChip>
              ))}

            </div>

          </div>

          <div className="game-section">

            <h3>Gêneros</h3>

            <div className="chips-container">

              {game.genres.map((genre) => (
                <IonChip key={genre}>
                  <IonLabel>{genre}</IonLabel>
                </IonChip>
              ))}

            </div>

          </div>

        </div>

        <h2 className="section-title">
          Galeria
        </h2>

        <Swiper
          slidesPerView={1.1}
          spaceBetween={12}
          className="gallery-swiper"
        >

          {game.screenshots.map((image, index) => (

            <SwiperSlide key={index}>

              <img
                src={image}
                alt={`Screenshot ${index + 1}`}
                className="gallery-image"
              />

            </SwiperSlide>

          ))}

        </Swiper>

        <div className="description-container">

          <h2>Sobre o jogo</h2>

          <p className="short-description">
            {game.shortDescription}
          </p>

          <p>
            {game.detailedDescription}
          </p>

        </div>

      </IonContent>

    </IonPage>
  );
};

export default GamePage;