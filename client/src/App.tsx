import { Route } from 'react-router-dom';
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
import { chatboxEllipsesOutline, checkboxOutline, documentAttachOutline, home, mapOutline } from 'ionicons/icons';
import Map from './pages/Map';
import Home from './pages/Home';

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
import Reports from './pages/Reports';
import ControlPosts from './pages/ControlPosts';
import ControlComments from './pages/ControlComments';

const App: React.FC = () => {
  const { user, isAuthenticated } = useAuth0();
	const useremail = user?.email;

  const isAuthorized = () => {
    if (!isAuthenticated || !useremail || !wetlandusers.includes(useremail)) return false;
    return true;
  }
  return (
  <IonApp>
    <IonReactRouter>
      <IonTabs >
        <IonRouterOutlet>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/mapa/:postid"
            render={(props) => {
              return props.match.params.postid ? <Map postid={props.match.params.postid} /> : <Map/>;
            }}
          />
          <Route exact path="/mapa">
            <Map />
          </Route>
          <Route path="/control">
            <ControlPosts />
          </Route>
          <Route path="/comments">
            <ControlComments />
          </Route>
          <Route path="/reports">
            <Reports />
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
        <IonTabBar slot="bottom" color={'primary'} style={{overflowX: 'auto'}}>
          <IonTabButton tab="Home" href="/home">
            <IonIcon icon={home} />
            <IonLabel>Inicio</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Map" href="/mapa">
            <IonIcon icon={mapOutline} />
            <IonLabel>Mapa</IonLabel>
          </IonTabButton>
          {
            isAuthorized() &&
            <IonTabButton tab="Control" href="/control">
              <IonIcon icon={checkboxOutline} />
              <IonLabel>Publicaciones</IonLabel>
            </IonTabButton>
          }
          {
            isAuthorized() &&
            <IonTabButton tab="Comentarios" href="/comments">
              <IonIcon icon={chatboxEllipsesOutline} />
              <IonLabel>Comentarios</IonLabel>
            </IonTabButton>
          }
          {
            isAuthorized() &&
            <IonTabButton tab="Reports" href="/reports">
              <IonIcon icon={documentAttachOutline} />
              <IonLabel>Reportes</IonLabel>
            </IonTabButton>
          }
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
  )
};

export default App;
