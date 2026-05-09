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
    IonCheckbox,
    IonLoading,
    IonAlert
 } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Login.css';

function LoginPage() {
  const history = useHistory();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const irParaCadastro = () => {
    history.push('/register');
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setAlertMessage('Por favor, preencha todos os campos.');
      setShowAlert(true);
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      history.push('/tabs');
    } catch (error: any) {
      let message = 'Erro ao fazer login.';
      if (error.code === 'auth/user-not-found') {
        message = 'Usuário não encontrado.';
      } else if (error.code === 'auth/wrong-password') {
        message = 'Senha incorreta.';
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
                        <IonCardTitle color="success">Backlogator</IonCardTitle>
                    </IonCardHeader>

                    <IonCardContent>
                        <IonItem>
                        <IonInput
                          id="usuario"
                          type="email"
                          label="Usuário"
                          labelPlacement="floating"
                          value={email}
                          onIonChange={(e) => setEmail(e.detail.value!)}
                        ></IonInput>
                        </IonItem>

                        <IonItem>
                        <IonInput
                          id="senha"
                          type="password"
                          label="Senha"
                          labelPlacement="floating"
                          value={password}
                          onIonChange={(e) => setPassword(e.detail.value!)}
                        ></IonInput>
                        </IonItem>

                        <div className="remember-forgot">
                            <IonCheckbox id="lembrar">Lembrar minha senha</IonCheckbox>

                            <IonButton id="esqueci" color="dark" fill="clear" size="small">Esqueci minha senha</IonButton>
                        </div>

                        <IonButton id="btnlogar" color="success" expand="block" onClick={handleLogin} disabled={loading}>
                          {loading ? 'Conectando...' : 'Conecte-se'}
                        </IonButton>

                        <IonButton id="btncadastrar" color="success" fill="clear" expand="block" onClick={irParaCadastro}>Cadastre-se</IonButton>

                        <IonLoading isOpen={loading} message="Fazendo login..." />
                        <IonAlert
                          isOpen={showAlert}
                          onDidDismiss={() => setShowAlert(false)}
                          header="Erro"
                          message={alertMessage}
                          buttons={['OK']}
                        />
                    </IonCardContent>
                </IonCard>
            </div>
        </div>

        </IonContent>
    </IonPage>
  );
}
export default LoginPage;