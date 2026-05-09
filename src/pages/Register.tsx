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
import './Register.css';
import { ref, set } from 'firebase/database';
import { realtimeDb } from '../firebase';

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
      const user = await register(email, password);
      const uid = user.uid
      await set(ref(realtimeDb, `BancoDeDados/Cadastros/${user.uid}`), {
        email: email,
        dataNascimento: birthDate,
        totalJogos: 0,
        tempoTotal: 0,
        dataCadastro: new Date().toISOString().split('T')[0]
    })
      setAlertMessage('Conta criada com sucesso! Por gentileza, verifique seu e-mail. KATCHAU!');
      setShowAlert(true);
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
                          onIonInput={(e) => setBirthDate(e.detail.value!)}
                        ></IonInput>
                        </IonItem>

                        <IonItem>
                        <IonInput
                          id="usuario"
                          type="email"
                          label="E-mail"
                          labelPlacement="floating"
                          value={email}
                          onIonInput={(e) => setEmail(e.detail.value!)}
                        ></IonInput>
                        </IonItem>

                        <IonItem>
                        <IonInput
                          id="senha"
                          type="password"
                          label="Senha"
                          labelPlacement="floating"
                          value={password}
                          onIonInput={(e) => setPassword(e.detail.value!)}
                        ></IonInput>
                        </IonItem>

                        <IonItem>
                        <IonInput
                          id="confirmarSenha"
                          type="password"
                          label="Confirmar Senha"
                          labelPlacement="floating"
                          value={confirmPassword}
                          onIonInput={(e) => setConfirmPassword(e.detail.value!)}
                        ></IonInput>
                        </IonItem>

                        <IonButton id="btncadastrar" color="success" expand="block" onClick={handleRegister} disabled={loading}>
                          {loading ? 'Cadastrando...' : 'Cadastre-se'}
                        </IonButton>
                    </IonCardContent>
                </IonCard>
            </div>
        </div>

        <IonLoading isOpen={loading} message="Criando conta..." />

        <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => {
          setShowAlert(false);
          if (alertMessage.includes('sucesso')) {
            history.push('/login');
            }
          }
        }
        header="Aviso"
        message={alertMessage}
        buttons={['OK']}
        />
        
        </IonContent>
    </IonPage>
  );
}
export default RegisterPage;