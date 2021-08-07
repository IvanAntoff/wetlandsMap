import { IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { WetlandForm } from '../components/WetlandForm';

const Tab2: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                <IonTitle>Carga de datos</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                <IonToolbar>
                    <IonTitle size="large">Carga de datos</IonTitle>
                </IonToolbar>
                </IonHeader>
                <IonGrid>
                    <IonRow>
                        <WetlandForm categories={[]} subcategories={[]} size={"8"}/>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Tab2;
