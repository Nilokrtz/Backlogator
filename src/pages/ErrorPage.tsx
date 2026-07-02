import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonButton,
  IonIcon
} from '@ionic/react';

import { 
  arrowBack,
  bug
} from 'ionicons/icons';

import './ErrorPage.css';

import { useHistory } from 'react-router-dom';

const GamePage: React.FC = () => {
  const history = useHistory();

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

      <IonContent fullscreen className="error-content">
        
        <IonIcon 
        icon={bug}
        className="error-icon"
        style={{ color: '#2dd36f' }}>
        </IonIcon>

        <h1 className="error-title">
          Algo deu errado
        </h1>

        <p className="error-message">
          Não foi possível concluir esta operação.
        </p>

      </IonContent>

    </IonPage>
  );
};

export default GamePage;