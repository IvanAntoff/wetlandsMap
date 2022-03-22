import { useAuth0 } from '@auth0/auth0-react';
import { IonCol, IonContent, IonGrid, IonItem, IonPage, IonRow, IonText, IonTitle, IonImg, IonThumbnail, IonSlides, IonSlide, IonLabel } from '@ionic/react';
import { Header } from '../components/Header';
import { useHistory } from 'react-router';
import { ImageModal } from '../components/ImageModal';

const Tab2: React.FC = () => {
    const { user } = useAuth0();
    const history = useHistory();

    const getImagesList = () => {
        const imageNumber = 17;
        const files: string[] = [];
        for (let i = 1; i <= imageNumber; i++) {
            files.push(`img_ (${i})`);
        }
        const sliderOpts = {
            autoplay: {
                delay: 3500,
            },
            loop: true,
            spaceBetween: 0,
            speed: 30,
            threshold: 0,
            shortSwipes: true
             
        }
        return (
            <IonRow className={'background-color-primary ion-padding-vertical ion-justify-content-center'}>
                <IonCol sizeMd={"6"} sizeSm={"12"} sizeXs={"12"} className={'ion-justify-content-evenly'}>
                    <IonSlides pager={true} options={sliderOpts}>
                        {
                            files.map((file, i) =>
                                <IonSlide key={`IonSlide-${i}-name-${file}`}>
                                    <ImageModal src={`/assets/imgs/home/pictures/${file}.jpg`} key={`img-${file}`} />
                                </IonSlide>
                            )
                        }
                    </IonSlides>
                </IonCol>
            </IonRow>
        )
    }

    const queEsHumedalesDigitales = () => {
        return (
            <IonRow className={'ion-justify-content-center ion-align-items-center '}>
                <IonCol className={'ion-nowrap ion-justify-content-center ion-align-items-center ion-margin-vertical'} sizeMd={"8"} sizeSm={"12"} sizeXs={"12"} >
                    <div color="light" className={'ion-nowrap ion-justify-content-evenly ion-align-items-center ion-text-center'} style={{ width: '100%', display: 'flex' }}>
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
                            <IonImg src="/assets/imgs/home/4.png" />
                        </IonThumbnail>
                        <IonThumbnail>
                            <IonImg src="/assets/imgs/home/1.png" />
                        </IonThumbnail>
                    </div>
                    <IonItem color="light" lines={'none'} className={'ion-margin-horizontal'}>
                        <IonText color="primary">
                            <h6>
                                Humedales Digitales es un proyecto que busca sistematizar información sobre los humedales de la cuenca del río Gualeguaychú (Entre Ríos, Argentina) a través de un sitio digital interactivo.
                                Este sitio web, invita a ciudadanos/as, académicos/as y tomadores de decisiones, a participar incorporando información socioambiental de la cuenca, en un mapa colaborativo.
                                Esta iniciativa se fundamenta en las metodologías de la participación ciudadana y la democratización de la ciencia, creando herramientas que permitan apoyar y fortalecer la participación de las comunidades locales y el involucramiento de los diferentes actores, propiciando el diálogo de saberes y la participación activa que hacen al conocimiento y a la gestión sustentable de nuestros valiosos ecosistemas.
                                El proyecto es una iniciativa del Laboratorio de Indicadores Biológicos y Gestión Ambiental de Calidad de Agua de la FCyT-UADER (Laboratorio IBGA), con sede en Gualeguaychú.
                            </h6>
                        </IonText>
                    </IonItem>
                </IonCol>
            </IonRow>
        )
    }


    const quienesSomos = (backgroundColor: 'none' | 'primary') => {
        const color = {
            item: backgroundColor === 'primary' ? 'primary' : 'transparent',
            text: backgroundColor === 'primary' ? 'light' : 'primary',
            bg: backgroundColor === 'primary' ? 'background-color-primary' : null
        }
        return (
            <IonRow className={`${color.bg} ion-margin-vertical`}>
                <IonCol sizeMd={"6"} sizeSm={"12"} sizeXs={"12"}>
                    <IonItem color={color.item} lines={'none'}>
                        <IonImg src="/assets/imgs/home/ibga-big.png" />
                    </IonItem>
                </IonCol>
                <IonCol sizeMd={"6"} sizeSm={"12"} sizeXs={"12"}>
                    <IonItem color={color.item} lines={'inset'}>
                        <IonTitle color={color.text}><b>¿Quiénes Somos?</b></IonTitle>
                    </IonItem>
                    <IonItem color={color.item} lines={'none'} className={'ion-margin-horizontal'}>
                        <IonText color={color.text}>
                            <h6>
                                El Laboratorio de Indicadores Biológicos y Gestión Ambiental de Calidad de Agua (IBGA), con sede en la ciudad de Gualeguaychú, fue creado mediante la resolución 0248/15 del Consejo Directivo de la Facultad de Ciencia y Tecnología de la Universidad Autónoma de Entre Ríos. 
                            </h6>
                            <h6>
                                Este espacio está destinado a la investigación, la docencia y la extensión. Surgió de la necesidad de evaluar el estado de conservación regional de los cuerpos de agua superficiales de la provincia de Entre Ríos, tanto para la preservación de su integridad y biodiversidad, como para sus potenciales usos y la gestión ambiental.
                            </h6>
                        </IonText>
                    </IonItem>
                </IonCol>
            </IonRow>
        )
    }
    
    const instituciones = (backgroundColor: 'none' | 'primary') => {
        const color = {
            item: backgroundColor === 'primary' ? 'primary' : 'transparent',
            text: backgroundColor === 'primary' ? 'light' : 'primary',
            bg: backgroundColor === 'primary' ? 'background-color-primary' : null
        }
        return (
            <IonRow className={`${color.bg} ion-margin-vertical`}>
                <IonCol className={'ion-margin-vertical'} sizeMd={"6"} sizeSm={"12"} sizeXs={"12"}>
                    <IonItem color={color.item} lines={'inset'}>
                        <IonTitle color={color.text} ><b>Instituciones Participantes del Proyecto</b></IonTitle>
                    </IonItem>
                    <IonItem color={color.item} className={'ion-margin-horizontal'} lines={'none'}>
                        <IonText color={color.text}>
                            <h6>
                                Laboratorio de Indicadores Biológicos y Gestión Ambiental de Calidad de Agua (Laboratorio IBGA). Facultad de Ciencia y Tecnología. Universidad Autónoma de Entre Ríos.
                            </h6>
                            <h6>
                                Licenciatura en Sistemas de la Información. Facultad de Ciencia y Tecnología, Sede Concepción del Uruguay. Universidad Autónoma de Entre Ríos.
                            </h6>
                            <h6>
                                Profesorado de Química. Cátedras Química Biológica y Química Industrial. Instituto de formación docente continua “María Inés Elizalde”- IES.
                            </h6>
                            <h6>
                                Fundación Banco de Entre Ríos.
                            </h6>
                        </IonText>
                    </IonItem>
                </IonCol>
                <IonCol className={'ion-justify-content-center ion-align-items-center ion-margin-vertical'}>
                    <IonItem color={color.item} lines={'none'} >
                        <IonImg src="/assets/imgs/home/logo_fcyt.png" />
                    </IonItem>
                    <IonItem color={color.item} lines={'none'} >
                        <IonImg src="/assets/imgs/home/ibga_y_ifdc.png" />
                    </IonItem>
                    <IonItem color={color.item} lines={'none'} >
                        <IonImg src="/assets/imgs/home/logo_fbersa.png" />
                    </IonItem>
                </IonCol>
            </IonRow>
        )
    }

    const conoceMas = (backgroundColor: 'none' | 'primary') => {
        const color = {
            item: backgroundColor === 'primary' ? 'primary' : 'transparent',
            text: backgroundColor === 'primary' ? 'light' : 'primary',
            bg: backgroundColor === 'primary' ? 'background-color-primary' : null
        }
        const slideOpts = {
            initialSlide: 0,
            autoplay: {
                delay: 3500,
            },
            loop: true,
            spaceBetween: 0,
            speed: 30,
            threshold: 0,
            shortSwipes: true

        }
        return (
            <IonRow className={`${color.bg} ion-margin-vertical ion-justify-content-center ion-text-center`}>
                <IonCol sizeMd={"8"} sizeSm={"12"} sizeXs={"12"}>
                    <IonItem color={color.item} lines={'inset'} className={'ion-text-center'}>
                        <IonTitle color={color.text}><b>Conoce más sobre el mapa digital interactivo:</b></IonTitle>
                    </IonItem>
                    <IonSlides pager={true} options={slideOpts}>
                        <IonSlide>
                            <IonItem color={color.item} lines={'none'} className={'ion-margin-horizontal'}>
                                <IonImg src={"/assets/imgs/home/conocemas/1.jpg"} />
                            </IonItem>
                        </IonSlide>
                        <IonSlide>
                            <IonItem color={color.item} lines={'none'} className={'ion-margin-horizontal'}>
                                <IonImg src={"/assets/imgs/home/conocemas/2.jpg"} />
                            </IonItem>
                        </IonSlide>
                        <IonSlide>
                            <IonItem color={color.item} lines={'none'} className={'ion-margin-horizontal'}>
                                <IonImg src={"/assets/imgs/home/conocemas/3.jpg"} />
                            </IonItem>
                        </IonSlide>
                    </IonSlides>
                </IonCol>
            </IonRow>
        )
    }

    const comoParticipar = (backgroundColor: 'none' | 'primary') => {
        const color = {
            item: backgroundColor === 'primary' ? 'primary' : 'transparent',
            text: backgroundColor === 'primary' ? 'light' : 'primary',
            bg: backgroundColor === 'primary' ? 'background-color-primary' : null
        }
        return (
            <IonRow className={`${color.bg} ion-margin-vertical`} id={'ayuda'}>
                <IonCol sizeMd={"6"} sizeSm={"12"} sizeXs={"12"}>
                    <IonItem color={color.item} lines={'inset'}>
                        <IonTitle color={color.text}><b>¿Cómo Participar?</b></IonTitle>
                    </IonItem>
                    <IonItem color={color.item} lines={'none'} className={'ion-margin-horizontal'}>
                        <IonText color={color.text}>
                            <h6><b>Paso 1: </b>Ingresa a la pestaña "Mapa"</h6>
                            <h6><b>Paso 2: </b>Presiona el boton "+" ubicado en la esquina inferior derecha de la pantalla.</h6>
                            <h6><b>Paso 3: </b>Selecciona el sitio a cargar en el mapa.</h6>
                            <h6><b>Paso 4: </b>Si es el indicado, selecciona la opcion confirmar y completa los datos</h6>
                            <h6><b>Para mayor información sobre cómo utilizar este mapa digital interactivo, te recomendamos que consultes:</b></h6>
                            <ul>
                                <li>
                                    <b><a href="https://drive.google.com/drive/folders/1IWxJIhpnZBWw_wwFQbgSmzlUUcnFQHd3?usp=sharing">Manual de uso.</a></b>
                                </li>
                                <br />  
                                <li>
                                    <b><a href="https://drive.google.com/drive/folders/1IWxJIhpnZBWw_wwFQbgSmzlUUcnFQHd3?usp=sharing">Video tutorial.</a></b>
                                </li>
                            </ul>
                        </IonText>
                    </IonItem>
                </IonCol>
            </IonRow>
        )
    }

    const agradecimientos = (backgroundColor: 'none' | 'primary') => {
        const color = {
            item: backgroundColor === 'primary' ? 'primary' : 'transparent',
            text: backgroundColor === 'primary' ? 'light' : 'primary',
            bg: backgroundColor === 'primary' ? 'background-color-primary' : null
        }
        return (
            <IonRow className={`ion-align-items-center ion-margin-vertical ${color.bg}`}>
                <IonCol sizeMd={"6"} sizeSm={"12"} sizeXs={"12"} className={'ion-margin-vertical'} >
                    <IonItem color={color.item} lines={'inset'}>
                        <IonTitle color={color.text}><b>Agradecimientos</b></IonTitle>
                    </IonItem>
                    <IonItem color={color.item} className={'ion-margin-horizontal'} lines={'none'}>
                        <IonText color={color.text}>
                            <h6>Agradecemos especialmente a la <b>Fundación Banco de Entre Ríos</b> por financiar este proyecto, mediante el <b>Programa Iniciativas Sustentables 2020</b>.</h6>
                        </IonText>
                    </IonItem>
                </IonCol>
                <IonCol sizeMd={"6"} sizeSm={"12"} sizeXs={"12"} className={'ion-justify-content-center ion-align-items-center ion-margin-vertical'}>
                    <IonItem color={color.item} lines={'none'}>
                        <IonImg src="/assets/imgs/home/logo_fbersa.png" />
                    </IonItem>
                </IonCol>
            </IonRow>
        )
    }

    const socialMedia = (backgroundColor: 'none' | 'primary') => {
        const color = {
            item: backgroundColor === 'primary' ? 'primary' : 'transparent',
            text: backgroundColor === 'primary' ? 'light' : 'primary',
            bg: backgroundColor === 'primary' ? 'background-color-primary' : null
        }
        return (
            <IonRow className={`${color.bg} ion-margin-vertical`} >
                <IonCol sizeMd={"6"} sizeSm={"12"} sizeXs={"12"}>
                    <IonItem lines={'inset'} color={color.item}>
                        <IonTitle color={color.text}><b>Contacto - Redes Sociales</b></IonTitle>
                    </IonItem>
                    <IonItem lines={'none'} className={'ion-margin-horizontal'} color={color.item}>
                        <IonText color={color.text}>
                            <ul>
                                <li><b>Nuestra web: </b><a href={'https://laboratorioibga.webnode.com/'} target={'_blank'} style={{color: `var(--ion-color-${color.text})`}}>laboratorioibga.webnode.com</a></li>
                                <li><b>Nuestro Facebook: </b><a href={'https://www.facebook.com/IBGA01/'} target={'_blank'} style={{color: `var(--ion-color-${color.text})`}}>@IBGA01</a></li>
                                <li><b>Nuestro Instagram: </b><a href={'https://www.instagram.com/laboratorio.ibga/'} target={'_blank'} style={{color: `var(--ion-color-${color.text})`}}>@laboratorio.ibga</a></li>
                                <li><b>Nuestro Correo: </b><a href={'mailto: fcyt_laboratorioibga@uader.edu.ar'} target={'_blank'} style={{color: `var(--ion-color-${color.text})`}}>fcyt_laboratorioibga@uader.edu.ar</a></li>
                            </ul>
                        </IonText>
                    </IonItem>
                </IonCol>
            </IonRow>
        )
    }

    const publicaciones = (backgroundColor: 'none' | 'primary') => {
        const color = {
            item: backgroundColor === 'primary' ? 'primary' : 'transparent',
            text: backgroundColor === 'primary' ? 'light' : 'primary',
            bg: backgroundColor === 'primary' ? 'background-color-primary' : null
        }
        return (
            <IonRow className={`ion-align-items-center ion-margin-vertical ${color.bg}`}>
                <IonCol sizeMd={"6"} sizeSm={"12"} sizeXs={"12"} className={'ion-margin-vertical'} >
                    <IonItem color={color.item} lines={'inset'}>
                        <IonTitle color={color.text}><b>Agradecimientos</b></IonTitle>
                    </IonItem>
                    <IonItem color={color.item} className={'ion-margin-horizontal'} lines={'none'}>
                        <IonText color={color.text}>
                            <h6>Agradecemos especialmente a la <b>Fundación Banco de Entre Ríos</b> por financiar este proyecto, mediante el <b>Programa Iniciativas Sustentables 2020</b>.</h6>
                        </IonText>
                    </IonItem>
                </IonCol>
                <IonCol sizeMd={"6"} sizeSm={"12"} sizeXs={"12"} className={'ion-justify-content-center ion-align-items-center ion-margin-vertical'}>
                    <IonItem color={color.item} lines={'none'}>
                        <IonImg src="/assets/imgs/home/logo_fbersa.png" />
                    </IonItem>
                </IonCol>
            </IonRow>
        )
    }

    const videos = (backgroundColor: 'none' | 'primary') => {
        const color = {
            item: backgroundColor === 'primary' ? 'primary' : 'transparent',
            text: backgroundColor === 'primary' ? 'light' : 'primary',
            bg: backgroundColor === 'primary' ? 'background-color-primary' : null
        }
        return (
            <IonRow className={`ion-align-items-center ion-justify-content-evenly ion-margin-vertical ${color.bg}`}>
                <IonCol sizeMd={"12"} sizeSm={"12"} sizeXs={"12"} className={'ion-margin-vertical'} >
                    <IonItem color={color.item} className={'ion-margin-horizontal'} lines={'none'}>
                        <IonLabel color={color.text} className={'ion-justify-content-center ion-text-center'}>
                            <b>Video Humedales Digitales</b>
                        </IonLabel>
                    </IonItem>
                </IonCol>
                <IonCol sizeMd={"3"} sizeSm={"12"} sizeXs={"12"} className={'ion-margin-vertical'} >
                    <IonItem color={color.item} lines={'inset'}>
                        <iframe  height={400} src="https://www.youtube.com/embed/k7OQygXN_FU" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
                    </IonItem>
                </IonCol>
                <IonCol sizeMd={"3"} sizeSm={"12"} sizeXs={"12"} className={'ion-margin-vertical'} >
                    <IonItem color={color.item} lines={'inset'}>
                    <iframe height="400" src="https://www.youtube.com/embed/7FSB0JOC2H4" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe>                    </IonItem>
                </IonCol>
                <IonCol sizeMd={"3"} sizeSm={"12"} sizeXs={"12"} className={'ion-margin-vertical'} >
                    <IonItem color={color.item} lines={'inset'}>
                    <iframe height="400" src="https://www.youtube.com/embed/BWKqmzk9LBw" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>                    </IonItem>
                </IonCol>
            </IonRow>
        )
    }

    return (
        <IonPage>
            <Header login={{ includeLogin: true, user: user }} buttons={[{title: "Ayuda", onClick: () => {document.getElementById("ayuda")?.scrollIntoView(true)}}, {title: "Añadir punto", onClick: () => history.push('/mapa')}]}/>
            <IonContent color="light">
                <IonGrid className={'ion-no-margin ion-no-padding'}>
                    {queEsHumedalesDigitales()}
                    {getImagesList()}
                    {quienesSomos('none')}
                    {videos('primary')}
                    {/* {publicaciones('none')} */}
                    {conoceMas('none')}
                    {comoParticipar('primary')}
                    {instituciones('none')}
                    {agradecimientos('primary')}
                    {socialMedia('none')}
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Tab2;