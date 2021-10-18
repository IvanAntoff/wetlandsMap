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
import { mapOutline, newspaperOutline } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';

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
          <Route exact path="/tab1">
            <Tab1 />
          </Route>
          {/* <Route exact path="/tab2">
            <Tab2 />
          </Route> */}
          <Route path="/tab3">
            <Tab3 />
          </Route>
          <Route exact path="/">
            <Tab1 />
          </Route>
          <Route exact path="">
            <Tab1 />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom" color={'primary'}>
          {/* <IonTabButton tab="tab2" href="/tab2">
            <IonIcon icon={ellipse} />
            <IonLabel>Carga de datos</IonLabel>
          </IonTabButton> */}
          <IonTabButton tab="tab1" href="/tab1">
            <IonIcon icon={mapOutline} />
            <IonLabel>Mapa</IonLabel>
          </IonTabButton>
          {
              !isAuthenticated || !useremail || !wetlandusers.includes(useremail)? null :
            <IonTabButton tab="tab3" href="/tab3">
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
