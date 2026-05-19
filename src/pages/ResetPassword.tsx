import {
  IonPage,
  IonContent,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonInput,
  IonItem,
  IonButton,
  IonLoading,
  IonAlert
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Login.css';

const ResetPasswordPage: React.FC = () => {
  const history = useHistory();
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleReset = async () => {
    if (!email) {
      setAlertMessage('Por favor, insira seu e-mail.');
      setShowAlert(true);
      return;
    }

    setLoading(true);
    try {
      await resetPassword(email);
      setAlertMessage('E-mail de redefinição enviado. Verifique sua caixa de entrada.');
      setShowAlert(true);
    } catch (error: any) {
      let message = 'Erro ao enviar e-mail de redefinição.';
      if (error.code === 'auth/user-not-found') {
        message = 'Usuário não encontrado.';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Email inválido.';
      }
      setAlertMessage(message);
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonContent className="login-content">
        <div className="container">
          <div className="box">
            <IonCard>
              <IonCardHeader>
                <IonCardTitle color="success">Redefinir senha</IonCardTitle>
              </IonCardHeader>

              <IonCardContent>
                <IonItem>
                  <IonInput
                    id="emailReset"
                    type="email"
                    label="E-mail"
                    labelPlacement="floating"
                    value={email}
                    onIonChange={(e) => setEmail(e.detail.value!)}
                  ></IonInput>
                </IonItem>

                <IonButton color="success" expand="block" onClick={handleReset} disabled={loading}>
                  {loading ? 'Enviando...' : 'Enviar link de redefinição'}
                </IonButton>

                <IonButton color="dark" fill="clear" expand="block" onClick={() => history.push('/login')}>
                  Voltar ao login
                </IonButton>

              </IonCardContent>
            </IonCard>
          </div>
        </div>

        <IonLoading isOpen={loading} message="Enviando e-mail..." />
        <IonAlert isOpen={showAlert} onDidDismiss={() => setShowAlert(false)} header="Informação" message={alertMessage} buttons={['OK']} />
      </IonContent>
    </IonPage>
  );
};

export default ResetPasswordPage;
