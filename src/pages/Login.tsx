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
    IonCheckbox
 } from '@ionic/react';
import './Login.css';

function LoginPage() {
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
                        <IonInput id="usuario" type="email" label="Usuário" labelPlacement="floating"></IonInput>
                        </IonItem>

                        <IonItem>
                        <IonInput id="senha" type="password" label="Senha" labelPlacement="floating"></IonInput>
                        </IonItem>

                        <div className="remember-forgot">
                            <IonCheckbox id="lembrar">Lembrar minha senha</IonCheckbox>

                            <IonButton id="esqueci" color="dark" fill="clear" size="small">Esqueci minha senha</IonButton>
                        </div>
                        
                        <IonButton id="btnlogar" color="success" expand="block">Conecte-se</IonButton>

                        <IonButton id="btncadastrar" color="success" fill="clear" expand="block">Cadastre-se</IonButton>
                    </IonCardContent>
                </IonCard>
            </div>
        </div>

        </IonContent>
    </IonPage>
  );
}
export default LoginPage;