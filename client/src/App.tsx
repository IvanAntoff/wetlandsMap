import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { home, mapOutline, newspaperOutline } from 'ionicons/icons';
import Map from './pages/Map';
import Home from './pages/Home';
import Control from './pages/Control';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './theme/customizations.css'

import { useAuth0 } from "@auth0/auth0-react";
import { wetlandusers } from './apiKeys';

const App: React.FC = () => {
  const { user, isAuthenticated } = useAuth0();
	const useremail = user?.email;

  return (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
        <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/mapa">
            <Map />
          </Route>
          <Route path="/control">
            <Control />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="">
            <Home />
          </Route>
          <Route exact >
            <Home />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom" color={'primary'}>
          <IonTabButton tab="Home" href="/home">
            <IonIcon icon={home} />
            <IonLabel>Inicio</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Map" href="/mapa">
            <IonIcon icon={mapOutline} />
            <IonLabel>Mapa</IonLabel>
          </IonTabButton>
          {
              !isAuthenticated || !useremail || !wetlandusers.includes(useremail)? null :
            <IonTabButton tab="Control" href="/control">
              <IonIcon icon={newspaperOutline} />
              <IonLabel>Gestion de publicaciones</IonLabel>
            </IonTabButton>
          }
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
  )
};

export default App;
