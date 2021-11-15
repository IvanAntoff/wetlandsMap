import { useAuth0 } from '@auth0/auth0-react';
import { IonCol, IonContent, IonGrid, IonItem, IonPage, IonRow, IonText, IonTitle, IonImg, IonThumbnail } from '@ionic/react';
import { Header } from '../components/Header';

const Tab2: React.FC = () => {
    const { user } = useAuth0();

    const getImagesList = () => {
        const imageNumber = 14;
        const files: string[] = [];
        for (let i = 1; i <= imageNumber; i++) {
            files.push(`img_ (${i})`);
        }
        return (
            <IonRow className={'background-color-primary ion-padding-vertical'}>
                {
                    files.map((file) => 
                        <IonCol size={'4'} className={'ion-justify-content-evenly'}>
                            <IonItem color={'primary'} lines={'none'}>
                                <IonImg src={`/assets/imgs/home/pictures/${file}.jpg`} style={{maxHeight: '250px'}} key={`img-${file}`}/>
                            </IonItem>
                        </IonCol>
                    )
                }
            </IonRow>
        )
    }

    const queEsHumedalesDigitales = () => {
        return (
            <IonRow className={'ion-justify-content-center ion-align-items-center '}>
                <IonCol className={'ion-nowrap ion-justify-content-center ion-align-items-center ion-margin-vertical'} size={'8'}>
                    <div color="light" className={'ion-nowrap ion-justify-content-evenly ion-align-items-center ion-text-center'} style={{width: '100%', display: 'flex'}}>
                        <IonThumbnail>
                            <IonImg src="/assets/imgs/home/5.png" />
                        </IonThumbnail>
                        <IonThumbnail>
                            <IonImg src="/assets/imgs/home/2.png" />
                        </IonThumbnail>
                        <IonText color="primary">
                            <h1>¿Qué es Humedales Digitales?</h1>
                        </IonText>
                        <IonThumbnail>
                            <IonImg src="/assets/imgs/home/4.png"/>
                        </IonThumbnail>
                        <IonThumbnail>
                            <IonImg src="/assets/imgs/home/1.png" />
                        </IonThumbnail>
                    </div>
                    <IonItem color="light" lines={'none'} className={'ion-margin-horizontal'}>
                        <IonText color="primary">
                            <h6>Humedales Digitales es un proyecto que busca sistematizar información sobre los humedales de la cuenca del río Gualeguaychú (Entre Ríos, Argentina) a través de un sitio digital interactivo.</h6>
                            <h6>Este sitio web, invita a ciudadanos/as, académicos/as y tomadores de decisiones, a participar incorporando información socioambiental de la cuenca, en un mapa colaborativo. </h6>
                            <h6>Esta iniciativa se fundamenta en las metodologías de la participación ciudadana y la democratización de la ciencia, creando herramientas que permitan apoyar y fortalecer la participación de las comunidades locales y el involucramiento de los diferentes actores, propiciando el diálogo de saberes y la participación activa que hacen al conocimiento y a la gestión sustentable de nuestros valiosos ecosistemas.</h6>
                            <h6>El proyecto es una iniciativa del Laboratorio de Indicadores Biológicos y Gestión Ambiental de Calidad de Agua de la FCyT-UADER, con sede en Gualeguaychú.</h6>
                        </IonText>
                    </IonItem>
                </IonCol>
            </IonRow>
        )
    }

    
    const quienesSomos = () => {
        return (
            <IonRow className={'ion-margin-vertical'}>
                <IonCol size={'6'}>
                    <IonItem color="transparent" lines={'none'}>
                        <IonImg src="/assets/imgs/home/ibga-big.png" />
                    </IonItem>
                </IonCol>
                <IonCol size={'6'}>
                    <IonItem color="transparent" lines={'inset'}>
                        <IonTitle color="primary"><b>¿Quiénes Somos?</b></IonTitle>
                    </IonItem>
                    <IonItem color="transparent" lines={'none'} className={'ion-margin-horizontal'}>
                        <IonText color="primary">
                            <h6>El Laboratorio de Indicadores Biológicos y Gestión Ambiental de Calidad de Agua (IBGA), con sede en la ciudad de Gualeguaychú, fue creado mediante la resolución 0248/15 del Consejo Directivo de la Facultad de Ciencia y Tecnología de la Universidad Autónoma de Entre Ríos, designándose como director interino al Mg. Ricardo Ariel Juárez, en la actualidad quien lo dirige es la Lic. Irene Aguer.</h6>
                            <h6>Este espacio está destinado a la investigación, la docencia y la extensión. Surgió de la necesidad de evaluar el estado de conservación regional de los cuerpos de agua superficiales, tanto para la preservación de su integridad, su biodiversidad, como para sus potenciales usos y la gestión ambiental, reconociendo el trabajo del grupo de investigación que ya se encontraba realizando estas tareas en los cursos de agua y arroyos de la provincia de Entre Ríos.</h6>
                        </IonText>
                    </IonItem>
                </IonCol>
            </IonRow>
        )
    }
    const instituciones = () => {
        return (
            <IonRow>
                <IonCol className={'ion-margin-vertical'} size={'6'}>
                    <IonItem color="light" lines={'inset'}>
                        <IonTitle color="primary"><b>Instituciones Participantes del Proyecto</b></IonTitle>
                    </IonItem>
                    <IonItem color="transparent" className={'ion-margin-horizontal'} lines={'none'}>
                        <IonText color="primary">
                            <h6>Laboratorio de Indicadores Biológicos y Gestión Ambiental de Calidad de Agua (Laboratorio IBGA). Facultad de Ciencia y Tecnología. Universidad Autónoma de Entre Ríos.</h6>
                            <h6>Licenciatura en Sistemas de la Información. Facultad de Ciencia y Tecnología, Sede Concepción del Uruguay. Universidad Autónoma de Entre Ríos.</h6>
                            <h6>Profesorado de Química. Cátedras Química Biológica y Química Industrial. Instituto de Enseñanza Superior “Prof. M. Inés Elizalde”. </h6>
                            <h6>Fundación Pétersen.</h6>
                        </IonText>
                    </IonItem>
                </IonCol>
                <IonCol className={'ion-justify-content-center ion-align-items-center ion-margin-vertical'}>
                    <IonItem color={'transparent'} lines={'none'} >
                        <IonImg src="/assets/imgs/home/logo_fcyt.png" />
                    </IonItem>
                    <IonItem color={'transparent'} lines={'none'} >
                        <IonImg src="/assets/imgs/home/ibga_y_ifdc.png" />
                    </IonItem>
                    <IonItem color={'transparent'} lines={'none'} >
                        <IonImg src="/assets/imgs/home/logo_fbersa.png"/>
                    </IonItem>
                </IonCol>
            </IonRow>
        )
    }

    const comoParticipar = () => {
        return(
            <IonRow className={'background-color-primary ion-margin-vertical'}>
                <IonCol size={'6'}>
                    <IonItem color="primary" lines={'inset'}>
                        <IonTitle><b>¿Cómo Participar?</b></IonTitle>
                    </IonItem>
                    <IonItem color="primary" lines={'none'} className={'ion-margin-horizontal'}>
                        <IonText color="light">
                            <h6><b>Paso 1: </b>Ingresa a la pestaña "Mapa"</h6>
                            <h6><b>Paso 2: </b>Presiona el boton "+" ubicado en la esquina inferior derecha de la pantalla.</h6>
                            <h6><b>Paso 3: </b>Selecciona el sitio a cargar en el mapa.</h6>
                            <h6><b>Paso 4: </b>Si es el indicado, selecciona la opcion confirmar y completa los datos</h6>
                        </IonText>
                    </IonItem>
                </IonCol>
            </IonRow>
        )
    }

    const agradecimientos = () => {
        return (
            <IonRow className={'ion-align-items-center ion-margin-vertical'}>
                <IonCol className={'ion-margin-vertical'}>
                    <IonItem color="light" lines={'inset'}>
                            <IonTitle color="primary"><b>Agradecimientos</b></IonTitle>
                    </IonItem>
                    <IonItem color="transparent" className={'ion-margin-horizontal'} lines={'none'}>
                        <IonText color="primary">
                            <h6>Agradecemos especialmente a la <b>Fundación Banco de Entre Ríos</b> por financiar este proyecto, mediante el <b>Programa Iniciativas Sustentables 2020</b>.</h6>
                        </IonText>
                    </IonItem>
                </IonCol>
                <IonCol size={'4'} className={'ion-justify-content-center ion-align-items-center ion-margin-vertical'}>
                    <IonItem color={'transparent'} lines={'none'}>
                        <IonImg src="/assets/imgs/home/logo_fbersa.png" />
                    </IonItem>
                </IonCol>
            </IonRow>
        )
    }

    const socialMedia = () => {
        return (
            <IonRow className={'background-color-primary'}>
                <IonCol size={'6'}>
                    <IonItem color="primary" lines={'inset'}>
                        <IonTitle>Contacto - Redes Sociales</IonTitle>
                    </IonItem>
                    <IonItem color="primary" lines={'none'} className={'ion-margin-horizontal'}>
                        <IonText color="light">
                        <h6>Proximamente estaran disponibles todos la informacion sobre nuestras redes.</h6>
                        </IonText>
                    </IonItem>
                </IonCol>
            </IonRow>
        )
    }
    return (
        <IonPage>
            <Header login={{includeLogin: true, user: user}}/>
            <IonContent fullscreen color="light">
                <IonGrid className={'ion-no-margin ion-no-padding'}>
                    { queEsHumedalesDigitales() }
                    { getImagesList() }
                    { quienesSomos() }
                    { comoParticipar() }
                    { instituciones() }
                    { socialMedia() }
                    { agradecimientos() }
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Tab2;