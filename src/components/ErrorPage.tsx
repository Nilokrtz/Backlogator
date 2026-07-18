import {
  IonContent,
  IonPage,
  IonButton,
  IonIcon
} from '@ionic/react';

import {
  arrowBack,
  bug,
  refresh
} from 'ionicons/icons';

import './ErrorPage.css';

import { useHistory } from 'react-router-dom';

interface ErrorPageProps {
  resetError: () => void;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ resetError }) => {
  const history = useHistory();

  const handleHome = () => {
    resetError();
    history.replace('/home');
  };

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <IonPage>

      <IonContent fullscreen className="error-content">

        <IonIcon
          icon={bug}
          className="error-icon"
          style={{ color: '#2dd36f' }}
        />

        <h1 className="error-title">
          Algo deu errado
        </h1>

        <p className="error-message">
          Não foi possível concluir esta operação.
        </p>


        <IonButton
          className="error-button"
          onClick={handleHome}
        >
          <IonIcon
            slot="start"
            icon={arrowBack}
          />

          Voltar para Home
        </IonButton>


        <IonButton
          fill="outline"
          className="error-button"
          onClick={handleReload}
        >
          <IonIcon
            slot="start"
            icon={refresh}
          />

          Recarregar página
        </IonButton>


      </IonContent>

    </IonPage>
  );
};

export default ErrorPage;