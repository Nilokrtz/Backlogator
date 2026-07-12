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
import { useState, useEffect } from 'react';


const GamePage: React.FC = () => {

  const history = useHistory();
  const { appid } = useParams<{ appid: string }>();
  const [nomeJogo, setNomeJogo] = useState('');
  const [descricaoCurta, setDescricaoCurta] = useState('');
  const [descricaoLonga, setDescricaoLonga] = useState('');
  const [generos, setGeneros] =useState<any[]>([]);
  const [imagemHeader, setImagemHeader] = useState('');
  const [fotoScreenshot, setFotoScreenshot] = useState<any[]>([]);
  const [categorias, setCategorias] = useState<any[]>([]);
  const [conquistas, setConquistas] = useState('');
  const [dataLancamento, setDataLancamento] = useState('');
  const [desenvolvedores, setDesenvolvedores] = useState<any[]>([]);
  const [publicadoras, setPublicadoras] = useState<any[]>([]);


    useEffect(() => {
    const buscarDados = async () => {
        const response = await fetch(`https://corsproxy.io/?https://store.steampowered.com/api/appdetails?appids=${appid}&l=brazilian`)
        const data = await response.json()
        const gameData = data[appid].data

        setNomeJogo(gameData.name)
        setDescricaoCurta(gameData.short_description)
        setDescricaoLonga(gameData.detailed_description)
        setGeneros(gameData.genres)
        setImagemHeader(gameData.header_image)
        setFotoScreenshot(gameData.screenshots)
        setCategorias(gameData.categories)
        setConquistas(gameData.achievements?.total ?? '0')
        setDataLancamento(gameData.release_date.date)
        setDesenvolvedores(gameData.developers)
        setPublicadoras(gameData.publishers)

      }
    buscarDados(
      )
}, [appid])

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
          src={imagemHeader}
          alt={nomeJogo}
          className="game-banner"
        />

        <div className="game-info">

          <h1>{nomeJogo}</h1>

          <p className="game-release">
            Lançamento: {dataLancamento}
          </p>

          <div className="game-section">
            <h3>Conquistas</h3>
            <p>{conquistas} conquistas totais</p>
          </div>

          <div className="game-section">

            <h3>Desenvolvedora</h3>

            <p>
              {desenvolvedores.join(', ')}
            </p>

          </div>

          <div className="game-section">

            <h3>Publicadora</h3>

            <p>
              {publicadoras.join(', ')}
            </p>

          </div>

          <div className="game-section">

            <h3>Categorias</h3>

            <div className="chips-container">

              {categorias.map((cat) => (
                <IonChip key={cat.id}>
                  <IonLabel>{cat.description}</IonLabel>
                </IonChip>
              ))}

            </div>

          </div>

          <div className="game-section">

            <h3>Gêneros</h3>

            <div className="chips-container">

              {generos.map((gen) => (
                <IonChip key={gen.id}>
                  <IonLabel>{gen.description}</IonLabel>
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

          {fotoScreenshot.map((image, index) => (

            <SwiperSlide key={index}>

              <img
                src={image.path_full}
                alt={`Screenshot ${index + 1}`}
                className="gallery-image"
              />

            </SwiperSlide>

          ))}

        </Swiper>

        <div 
          className="short-description"
          dangerouslySetInnerHTML={{ __html: descricaoCurta }}
        />

        <div dangerouslySetInnerHTML={{ __html: descricaoLonga }} />

      </IonContent>

    </IonPage>
  );
};

export default GamePage;