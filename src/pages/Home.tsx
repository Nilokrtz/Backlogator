import {
    IonPage,
    IonContent,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonButton,
    IonAvatar,
 } from '@ionic/react';
import './Home.css';
import { useHistory } from 'react-router-dom';

function HomePage() {
  const history = useHistory();

  const irParaCadastro = () => {
    history.push('/register');
  };

  const irParaLogin = () => {
    history.push('/login');
  };

  return (
    <IonPage>

        <IonContent 
        className="home-content">

          <div className="container">

            <div className="box">

              <IonCard className="welcome-card">

                <IonCardHeader className="card-header-centered">

                  <IonAvatar 
                  className="logo-backlogator">
                  <img alt="Logo do Backlogator" src="resources/logo-backlogator.png" />
                  </IonAvatar>
                  
                  <IonCardTitle
                  color="success">
                    Backlogator
                  </IonCardTitle>

                  <IonCardSubtitle>
                    Transforme sua biblioteca de jogos em uma competição com os amigos.
                  </IonCardSubtitle>

                </IonCardHeader>

                <IonCardContent className="card-buttons">

                  <IonButton 
                  id="btnlogar"
                  color="success"
                  onClick={irParaLogin}>
                    Login
                  </IonButton>

                  <IonButton 
                  id="btncadastrar"
                  color="success"
                  onClick={irParaCadastro}>
                    Cadastro
                  </IonButton>

                </IonCardContent>

              </IonCard>


            </div>

          </div>

        </IonContent>

    </IonPage>
  );
}
export default HomePage;