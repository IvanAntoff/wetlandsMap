import { IonCol, IonContent, IonGrid, IonHeader, IonModal, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { WetlandForm } from '../components/WetlandForm';

const Tab2: React.FC = () => {
    // TODO: Esto, luego, tiene que ser un useState
    const modalIsOpen = true

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
                        <IonCol>
                        {/* <IonModal isOpen={modalIsOpen} showBackdrop={true} cssClass={"postModal"} >
                            <WetlandForm 
                            categories={[
                                {name: "Documentar un humedal", value: "humedal"},
                                {name: "Amenazas o impactos antrópicos", value: "amenazas"},
                                {name: "Iniciativa sustentable", value: "iniciativas"},
                                {name: "Expresiones Artísticas", value: "arte"},
                                {name: "Proyectos de Investigación", value: "investigacion"},
                            ]} 
                            subcategories={[
                                
                            ]}/>
                        </IonModal> */}
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Tab2;
