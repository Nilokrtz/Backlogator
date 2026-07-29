import {
  IonContent,
  IonPage,
  IonButton,
  IonIcon,
  IonCard,
  IonCardContent
} from '@ionic/react';

import {
  arrowBack,
  bug,
  refresh,
  helpCircle
} from 'ionicons/icons';

import './ErrorPage.css';

import { useHistory, useLocation } from 'react-router-dom';

interface ErrorPageProps {
  resetError?: () => void;
  type?: '404' | 'generic';
  title?: string;
  message?: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ resetError, type, title, message }) => {
  const history = useHistory();
  const location = useLocation<any>();
  
  const state = location.state || {};
  const errorType = type || state.type || (location.pathname === '/404' ? '404' : 'generic');
  
  const displayTitle = title || state.title || (errorType === '404' ? 'Página Não Encontrada' : 'Algo deu errado');
  const displayMessage = message || state.message || (errorType === '404' 
    ? 'A página que você está procurando não existe, foi removida ou está temporariamente indisponível.' 
    : 'Não foi possível concluir esta operação.');

  const handleHome = () => {
    if (resetError) {
      resetError();
    }
    history.replace('/home');
  };

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <IonPage>
      <IonContent fullscreen className="error-content">
        <div className="error-container">
          <div className="error-box">
            <IonCard className="error-card">
              <IonCardContent className="error-card-content">
                <IonIcon
                  icon={errorType === '404' ? helpCircle : bug}
                  className="error-icon"
                  style={{ color: errorType === '404' ? '#ffc409' : '#eb445a' }}
                />

                <h1 className="error-title">
                  {displayTitle}
                </h1>

                <p className="error-message">
                  {displayMessage}
                </p>

                <div className="error-buttons-container">
                  <IonButton
                    className="error-button"
                    color="success"
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
                    className="error-button-outline"
                    color="success"
                    onClick={handleReload}
                  >
                    <IonIcon
                      slot="start"
                      icon={refresh}
                    />
                    Recarregar
                  </IonButton>
                </div>
              </IonCardContent>
            </IonCard>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ErrorPage;