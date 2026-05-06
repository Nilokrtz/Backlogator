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
import './Register.css';

function RegisterPage() {
  const history = useHistory();
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword || !birthDate) {
      setAlertMessage('Por favor, preencha todos os campos.');
      setShowAlert(true);
      return;
    }

    if (password !== confirmPassword) {
      setAlertMessage('As senhas não coincidem.');
      setShowAlert(true);
      return;
    }

    if (password.length < 6) {
      setAlertMessage('A senha deve ter pelo menos 6 caracteres.');
      setShowAlert(true);
      return;
    }

    setLoading(true);
    try {
      await register(email, password);
      setAlertMessage('Conta criada com sucesso! Você será redirecionado para o login.');
      setShowAlert(true);
      // Redirecionar para login após um breve delay
      setTimeout(() => {
        history.push('/login');
      }, 2000);
    } catch (error: any) {
      let message = 'Erro ao criar conta.';
      if (error.code === 'auth/email-already-in-use') {
        message = 'Este email já está sendo usado.';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Email inválido.';
      } else if (error.code === 'auth/weak-password') {
        message = 'Senha muito fraca.';
      }
      setAlertMessage(message);
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };
  return (
    <IonPage>
        <IonContent className="register-content">

        <div className="container">
            <div className="box">
                    <IonCard>
                    <IonCardHeader>
                        <IonCardTitle color="success">Backlogator</IonCardTitle>
                    </IonCardHeader>

                    <IonCardContent>
                        <IonItem>
                        <IonInput
                          id="dataNascimento"
                          type="date"
                          label="Data de Nascimento"
                          labelPlacement="floating"
                          value={birthDate}
                          onIonChange={(e) => setBirthDate(e.detail.value!)}
                        ></IonInput>
                        </IonItem>

                        <IonItem>
                        <IonInput
                          id="usuario"
                          type="email"
                          label="E-mail"
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

                        <IonItem>
                        <IonInput
                          id="confirmarSenha"
                          type="password"
                          label="Confirmar Senha"
                          labelPlacement="floating"
                          value={confirmPassword}
                          onIonChange={(e) => setConfirmPassword(e.detail.value!)}
                        ></IonInput>
                        </IonItem>

                        <div className="remember-forgot">
                            <IonCheckbox id="lembrar">Lembrar minha senha</IonCheckbox>

                            <IonButton id="esqueci" color="dark" fill="clear" size="small">Esqueci minha senha</IonButton>
                        </div>

                        <IonButton id="btncadastrar" color="success" expand="block" onClick={handleRegister} disabled={loading}>
                          {loading ? 'Cadastrando...' : 'Cadastre-se'}
                        </IonButton>

                        <IonLoading isOpen={loading} message="Criando conta..." />
                        <IonAlert
                          isOpen={showAlert}
                          onDidDismiss={() => setShowAlert(false)}
                          header="Aviso"
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
export default RegisterPage;