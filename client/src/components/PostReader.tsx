import { useAuth0 } from "@auth0/auth0-react";
import { IonButton, IonButtons, IonCol, IonGrid, IonIcon, IonImg, IonItem, IonLabel, IonRow, IonText, IonTextarea, IonTitle, IonToolbar } from "@ionic/react"
import { logoFacebook, logoTwitter, logoWhatsapp, mailOpen } from "ionicons/icons";
import { useRef, useState } from "react";
import { POSTS_URL } from "../apiKeys";
import { axiosInstance } from "../axiosConf";
import { docFiles, imgFiles } from "../enums/data";
import { CATEGORIA, postVM } from "../interfaces/posts.interface";
import { booleanText, dateToStr, getCatergoryName, postToXLSX, reduceText, toCapitalizeCase } from "../utils/sharedFn";
import CommentCard from "./CommentCard";

interface PostReader {
    post: postVM,
    mode: 'complete' | 'public' | 'print'
}

export const PostReader: React.FC<PostReader> = (props: PostReader) => {
    const [ seeComments, setSeeComments ] = useState<boolean>(false);
    const [ enableCommentButton, setEnableCommentButton ] = useState<boolean>(false)
    const { user, isAuthenticated } = useAuth0();
    const comment = useRef<string>('');

    const setComment = (msg: string | undefined) => {
        if (!msg || !user?.email || !isAuthenticated) {
            if (enableCommentButton) setEnableCommentButton(false);
            comment.current = '';
            return;
        };
        comment.current = msg;
        if (!enableCommentButton) setEnableCommentButton(true);
    }

    const sendComment = async () => {
        if (!comment.current || !user?.email || !isAuthenticated) return;
        setEnableCommentButton(false);
        const newComment = {
            author: (`${user?.name}` || user?.nickname || 'Desconocido'),
            email: user?.email,
            msg: comment.current,
            postId: props.post._id
        }
        const resp =  await axiosInstance.post(`${POSTS_URL}/comments`, newComment)
        .catch((error) => {
            console.error(error);
        });
        if (resp && resp.status === 201) {
            setComment('');
        }
    }

    const getHeader = () => {
        return (
            <>
                <IonRow>
                    <IonCol size={"12"}>
                        <IonToolbar color={'primary'}>
                            <IonTitle className={"ion-text-center"} ><h1 className={'ion-text-wrap'}><b>{toCapitalizeCase(props.post.titulo)}</b></h1></IonTitle>
                            <IonTitle size={"small"} className={"ion-margin-bottom"}><b>Categoría:</b> {getCatergoryName(props.post.categoria)}</IonTitle>
                            <IonTitle size={"small"} className={"ion-margin-bottom"}><b>Fecha de carga:</b> {dateToStr(props.post.fechacreacion || props.post.createdAt)}</IonTitle>
                        </IonToolbar>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol size={"12"}>
                        <IonItem lines={"full"}  className={"ion-text-center"}  color={'primary'}><IonLabel  className="ion-text-wrap"><h2><b>Información general</b></h2></IonLabel></IonItem>
                    </IonCol>
                    <IonCol sizeMd={"4"} sizeSm={"12"} sizeXs={"12"}>
                        <IonItem lines={"none"}>
                            <IonLabel  className="ion-text-wrap"><b>Categoría:</b> {toCapitalizeCase(props.post?.categoria) || 'Desconocido'}</IonLabel>
                        </IonItem>
                        <IonItem lines={"none"}>
                            <IonLabel  className="ion-text-wrap"><b>Típo de humedal:</b> {toCapitalizeCase(props.post?.origen) || 'Desconocido'}</IonLabel>
                        </IonItem>
                    </IonCol>
                    <IonCol sizeMd={"4"} sizeSm={"12"} sizeXs={"12"}>
                        <IonItem lines={"none"}>
                            <IonLabel  className="ion-text-wrap"><b>Depto:</b> {toCapitalizeCase(props.post?.departamento) || 'Desconocido'}</IonLabel>
                        </IonItem>
                        <IonItem lines={"none"}>
                            <IonLabel  className="ion-text-wrap"><b>Zona:</b> {toCapitalizeCase(props.post?.zona) || 'Desconocida'}</IonLabel>
                        </IonItem>
                    </IonCol>
                    <IonCol sizeMd={"4"} sizeSm={"12"} sizeXs={"12"}>
                        <IonItem lines={"none"}>
                            <IonLabel  className="ion-text-wrap"><b>Lat:</b> {props.post?.coordenadas?.latitude || 'Desconocida'}</IonLabel>
                        </IonItem>
                        <IonItem lines={"none"}>
                            <IonLabel  className="ion-text-wrap"><b>Lon:</b> {props.post?.coordenadas?.longitude || 'Desconocida'}</IonLabel>
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow className={'ion-margin-vertical'}>
                    <IonCol size={"12"}>
                        <IonItem lines={"full"}  className={"ion-text-center"}  color={'primary'}><IonLabel  className="ion-text-wrap"><h2><b>Descripción</b></h2></IonLabel></IonItem>
                    </IonCol>
                    <IonCol size={"12"} className={'ion-padding'}>
                        <IonText className={'ion-padding ion-margin-vertical'} >{props?.post?.descripcion|| 'La publicación no incluye descripción.'}</IonText>
                    </IonCol>
                </IonRow>
            </>
        )
    }

    const getData = () => {
        if (!props.post || !props.post.datos) return null;
        if (props.post.categoria === CATEGORIA.humedal) {
            if(!props.post.datos?.humedal) return (
                <IonRow>
                    <IonCol size={"12"}>
                        <IonItem lines={"none"}><IonLabel  className="ion-text-wrap"><b>No posee Información adicional</b></IonLabel></IonItem>
                    </IonCol>
                </IonRow>
            )
            const data = props.post.datos.humedal;
            return (
                <IonRow>
                    <IonCol size={"12"}>
                        <IonItem lines={"full"}  className={"ion-text-center"}  color={'primary'}><IonLabel  className="ion-text-wrap"><h2><b>Información adicional</b></h2></IonLabel></IonItem>
                    </IonCol>
                    <IonCol size={"12"}>
                        <IonItem lines={"none"}><IonLabel  className="ion-text-wrap"><h2><b>Aspecto del agua</b></h2></IonLabel></IonItem>
                    </IonCol>
                    <IonCol sizeMd={"6"} sizeSm={"12"} sizeXs={"12"}>
                        <IonItem lines={"none"}><IonLabel  className="ion-text-wrap"><b>Presencia de flora: </b>{data?.flora?.map(item => `${item} `) || 'Desconocida'}</IonLabel></IonItem>
                    </IonCol>
                    <IonCol sizeMd={"6"} sizeSm={"12"} sizeXs={"12"}>
                        <IonItem lines={"none"}><IonLabel  className="ion-text-wrap"><b>Presencia de fauna: </b>{data?.fauna?.map(item => `${item} `) || 'Desconocida'}</IonLabel></IonItem>
                    </IonCol>
                    <IonCol sizeMd={"6"} sizeSm={"12"} sizeXs={"12"}>
                        <IonItem lines={"none"}><IonLabel  className="ion-text-wrap"><b>Color: </b>{data?.color || 'Desconocido'}</IonLabel></IonItem>
                    </IonCol>
                    <IonCol sizeMd={"6"} sizeSm={"12"} sizeXs={"12"}>
                        <IonItem lines={"none"}><IonLabel  className="ion-text-wrap"><b>Olor: </b>{booleanText(data?.olor) || 'Desconocido'}</IonLabel></IonItem>
                    </IonCol>
                    <IonCol size={"12"}>
                        <IonItem lines={"none"}><IonLabel className="ion-text-wrap"><b>Actividades desarrolladas en zonas aledañas:</b> {data?.aledaños || 'Desconocidas'}</IonLabel></IonItem>
                    </IonCol>
                    <IonCol size={"12"}>
                        <IonItem lines={"none"}><IonLabel  className="ion-text-wrap"><b>Estado de márgenes de ribera: </b>{data?.margen || 'Desconocido'}</IonLabel></IonItem>
                    </IonCol>
                    <IonCol sizeMd={"6"} sizeSm={"12"} sizeXs={"12"}>
                        <IonItem lines={"none"}><IonLabel  className="ion-text-wrap"><b>Morfología de la costa: </b>{data?.morfologia || 'Desconocida'}</IonLabel></IonItem>
                    </IonCol>
                </IonRow>
            )
        }
        if (props.post.categoria === CATEGORIA.amenaza) {
            if(!props.post.datos?.amenaza) return (
                <IonRow>
                    <IonCol size={"12"}>
                        <IonItem lines={"none"}><IonLabel  className="ion-text-wrap"><b>No posee Información adicional</b></IonLabel></IonItem>
                    </IonCol>
                </IonRow>
            )
            const data = props.post.datos.amenaza;
            return (
                <IonRow>
                    <IonCol size={"12"}>
                        <IonItem lines={"full"}  className={"ion-text-center"}  color={'primary'}><IonLabel  className="ion-text-wrap"><h2><b>Información adicional</b></h2></IonLabel></IonItem>
                    </IonCol>
                    <IonCol size={"12"}>
                        <IonItem lines={"none"}><IonLabel  className="ion-text-wrap"><b>Origen de la amenaza/impacto ambienta: </b>{data?.origen || 'Origen desconocido'}</IonLabel></IonItem>
                    </IonCol>
                    <IonCol size={"12"}>
                        <IonItem lines={"none"}><IonLabel  className="ion-text-wrap"><b>Fuente de generación: </b>{data?.fuente || 'Desconocida'}</IonLabel></IonItem>
                    </IonCol>
                    <IonCol size={"12"}>
                        <IonItem lines={"none"}><IonLabel  className="ion-text-wrap"><b>Típo de amenaza/impacto ambienta: </b>{data?.tipo || 'Desconocido'}</IonLabel></IonItem>
                    </IonCol>
                    <IonCol size={"12"}>
                        <IonItem lines={"none"}><IonLabel  className="ion-text-wrap"><h2><b>Presencia de elementos flotantes</b></h2></IonLabel></IonItem>
                    </IonCol>
                    <IonCol sizeMd={"4"} sizeSm={"12"} sizeXs={"12"}>
                        <IonItem lines={"none"}><IonLabel  className="ion-text-wrap"><b>Materia orgánica: </b>{booleanText(data?.materia) || 'Desconocido'}</IonLabel></IonItem>
                    </IonCol>
                    <IonCol sizeMd={"4"} sizeSm={"12"} sizeXs={"12"}>
                        <IonItem lines={"none"}><IonLabel  className="ion-text-wrap"><b>Espuma: </b>{booleanText(data?.espuma) || 'Desconocido'}</IonLabel></IonItem>
                    </IonCol>
                    <IonCol sizeMd={"4"} sizeSm={"12"} sizeXs={"12"}>
                        <IonItem lines={"none"}><IonLabel  className="ion-text-wrap"><b>Algas: </b>{booleanText(data?.algas) || 'Desconocido'}</IonLabel></IonItem>
                    </IonCol>
                    <IonCol size={"12"}>
                        <IonItem lines={"none"}><IonLabel  className="ion-text-wrap"><b>Descripción de materia: </b></IonLabel></IonItem>
                        <IonText>{data?.materiadescripcion || 'No posee descripción'}</IonText>
                    </IonCol>
                    <IonCol sizeMd={"6"} sizeSm={"12"} sizeXs={"12"}>
                        <IonItem lines={"none"}><IonLabel  className="ion-text-wrap"><b>Olor: </b>{booleanText(data?.olor) || 'Desconocido'}</IonLabel></IonItem>
                    </IonCol>
                    <IonCol size={"12"}>
                        <IonItem lines={"full"}  className={"ion-text-center"}  color={'primary'}><IonLabel  className="ion-text-wrap"><h2><b>Documentación que acredite amenaza/impacto ambiental</b></h2></IonLabel></IonItem>
                    </IonCol>
                    <IonCol size={"12"}>
                        <IonItem lines={"none"}><IonLabel  className="ion-text-wrap"><b>Análisis de muestras de agua: </b>{booleanText(data?.analisis) || 'No incluye'}</IonLabel></IonItem>
                    </IonCol>
                    <IonCol sizeMd={"6"} sizeSm={"12"} sizeXs={"12"}>
                        <IonItem lines={"none"}><IonLabel  className="ion-text-wrap"><b>Típo de análisis: </b>{data?.tipoanalises || 'Desconocido'}</IonLabel></IonItem>
                    </IonCol>
                    <IonCol sizeMd={"6"} sizeSm={"12"} sizeXs={"12"}>
                        <IonItem lines={"none"}><IonLabel  className="ion-text-wrap"><b>Resultados: </b>{data.resultadoanalises || 'Desconocido'}</IonLabel></IonItem>
                    </IonCol>
                    <IonCol sizeMd={"6"} sizeSm={"12"} sizeXs={"12"}>
                        <IonItem lines={"none"}><IonLabel  className="ion-text-wrap"><b>Estudios de impacto ambienta: </b>{booleanText(data?.estudioambiental) || 'No incluye'}</IonLabel></IonItem>
                    </IonCol>
                    <IonCol sizeMd={"6"} sizeSm={"12"} sizeXs={"12"}>
                        <IonItem lines={"none"}><IonLabel  className="ion-text-wrap"><b>Informe técnico ambiental: </b>{booleanText(data?.informetecnico) || 'No incluye'}</IonLabel></IonItem>
                    </IonCol>
                </IonRow>
            )
        }
        if (props.post.categoria === CATEGORIA.iniciativa) {
            if(!props.post.datos?.iniciativa) return (
                <IonRow>
                    <IonCol size={"12"}>
                        <IonItem lines={"none"}><IonLabel  className="ion-text-wrap"><b>No posee Información adicional</b></IonLabel></IonItem>
                    </IonCol>
                </IonRow>
            )
            const data = props.post.datos.iniciativa;
            return(
                <IonRow>
                    <IonCol size={"12"}>
                        <IonItem lines={"full"}  className={"ion-text-center"}  color={'primary'}><IonLabel  className="ion-text-wrap"><h2><b>Información adicional</b></h2></IonLabel></IonItem>
                    </IonCol>
                    <IonCol size={"12"}>
                        <IonItem lines={"none"}><IonLabel  className="ion-text-wrap"><b>Típo de iniciativa sustentable: </b>{data?.tipo || 'Desconocida'}</IonLabel></IonItem>
                    </IonCol>
                    <IonCol size={"12"}>
                        <IonItem lines={"none"}><IonLabel  className="ion-text-wrap"><b>Objetivo: </b>{data?.objetivo || 'Desconocido'}</IonLabel></IonItem>
                    </IonCol>
                    <IonCol size={"12"}>
                        <IonItem lines={"none"}><IonLabel  className="ion-text-wrap"><b>Participantes: </b>{data?.participantes || 'Desconocidos'}</IonLabel></IonItem>
                    </IonCol>
                    {/* <IonCol sizeMd={"6"} sizeSm={"12"} sizeXs={"12"}>
                        <IonItem lines={"none"}><IonLabel  className="ion-text-wrap"><b>Organizador: </b>{data?.organizator || 'Desconocido'}</IonLabel></IonItem>
                    </IonCol> */}
                </IonRow>
            )
        }
        if (props.post.categoria === CATEGORIA.arte) {
            if(!props.post.datos?.arte) return (
                <IonRow>
                    <IonCol size={"12"}>
                        <IonItem lines={"none"}><IonLabel  className="ion-text-wrap"><b>No posee Información adicional</b></IonLabel></IonItem>
                    </IonCol>
                </IonRow>
            )
            const data = props.post.datos.arte;
            return(
                <IonRow>
                    <IonCol size={"12"}>
                        <IonItem lines={"full"}  className={"ion-text-center"}  color={'primary'}><IonLabel  className="ion-text-wrap"><h2><b>Información adicional</b></h2></IonLabel></IonItem>
                    </IonCol>
                    <IonCol size={"12"}>
                        <IonItem lines={"none"}><IonLabel  className="ion-text-wrap"><b>Típo de expresión artística: </b>{data?.tipo || 'Desconocida'}</IonLabel></IonItem>
                    </IonCol>
                    <IonCol size={"12"}>
                        <IonItem lines={"none"}><IonLabel  className="ion-text-wrap"><b>Participantes: </b>{data?.participantes || 'Desconocida'}</IonLabel></IonItem>
                    </IonCol>
                </IonRow>
            )
        }
        if (props.post.categoria === CATEGORIA.investigacion) {
            if(!props.post.datos?.investigacion) return (
                <IonRow>
                    <IonCol size={"12"}>
                        <IonItem lines={"none"}><IonLabel  className="ion-text-wrap"><b>No posee Información adicional</b></IonLabel></IonItem>
                    </IonCol>
                </IonRow>
            )
            const data = props.post.datos?.investigacion;
            return(
                <IonRow>
                    <IonCol size={"12"}>
                        <IonItem lines={"full"}  className={"ion-text-center"}  color={'primary'}><IonLabel  className="ion-text-wrap"><h2><b>Información adicional</b></h2></IonLabel></IonItem>
                    </IonCol>
                    <IonCol size={"12"}>
                        <IonItem lines={"none"}><IonLabel  className="ion-text-wrap"><b>Instituciones participantes del proyecto: </b>{data?.participantes || 'Desconocido'}</IonLabel></IonItem>
                    </IonCol>
                    <IonCol sizeMd={"6"} sizeSm={"12"} sizeXs={"12"}>
                        <IonItem lines={"none"}><IonLabel  className="ion-text-wrap"><b>Estado actual del proyecto: </b>{data?.estado || 'Desconocidos'}</IonLabel></IonItem>
                    </IonCol>
                    <IonCol sizeMd={"6"} sizeSm={"12"} sizeXs={"12"}>
                        <IonItem lines={"none"}><IonLabel  className="ion-text-wrap"><b>Típo de resultados: </b>{data?.resultado || 'Desconocidos'}</IonLabel></IonItem>
                    </IonCol>
                    <IonCol size={"12"}>
                        <IonItem lines={"none"}><IonLabel  className="ion-text-wrap"><b>publicación/comunicación de resultados: </b>{data?.publicacion || 'No indica'}</IonLabel></IonItem>
                    </IonCol>
                </IonRow>
            )
        }
        return (
            <IonRow>
                <IonCol size={"12"}>
                    <IonItem lines={"none"}><IonLabel  className="ion-text-wrap"><b>Error al obtener los datos</b></IonLabel></IonItem>
                </IonCol>
            </IonRow>
        )
    }

    const getFiles = () => {
        if(!props.post || !props.post.files || !Array.isArray(props.post.files) || props.post?.files.length === 0) return null;
        const files = props.post.files.filter((item) => item.url)
        files.sort((a, b) => {
            if (imgFiles.includes(a.mimetype)) return 1
            if (a.mimetype > b.mimetype) return 1;
            if (a.mimetype < b.mimetype) return -1;
            return 0;
        });
        return (
            <IonRow className={'ion-margin-vertical'}>
                <IonCol size={"12"}>
                    <IonItem lines={"full"}  className={"ion-text-center"}  color={'primary'}><IonLabel  className="ion-text-wrap"><h2><b>Archivos</b></h2></IonLabel></IonItem>
                </IonCol>
                    {
                        files.map((item,i) => {
                            if (imgFiles.includes(item.mimetype)) return (
                                <IonCol sizeMd={"6"} sizeSm={"12"} sizeXs={"12"} className={'ion-padding'} key={`ionImg-${item.filename}-${i}`}>
                                    <IonImg src={item.url}></IonImg>
                                </IonCol>
                            );
                            if (docFiles.includes(item.mimetype)) {
                                return (
                                    <IonCol sizeMd={"4"} sizeSm={"4"} sizeXs={"4"} className={'ion-padding ion-justify-content-center ion-align-items-center ion-text-center'} key={`file-${item.filename}-${i}`}>
                                        <IonText>{item.name}</IonText>
                                        {
                                            item.mimetype.includes('pdf') ?
                                            <IonImg src={"/assets/icon/pdf.png"} onClick={() => window.open(`${item.url}`, '_blank')} key={`pdf-${item.filename}-${i}`} style={{height: '64px'}} />
                                            :
                                            <IonImg src={"/assets/icon/doc.png"} onClick={() => window.open(`${item.url}`, '_blank')} key={`doc-${item.filename}-${i}`} style={{height: '64px'}} />
                                        }
                                    </IonCol>
                                );
                            }
                            return null;
                        })
                    }
            </IonRow>
        )
    } 

    const getComments = () => {
        return (
            <IonRow className={'ion-margin-vertical'}>
                <IonCol size={"12"}>
                    <IonItem lines={"full"}  className={"ion-text-center"}  color={'primary'}><IonLabel  className="ion-text-wrap"><h2><b>Comentarios</b></h2></IonLabel></IonItem>
                </IonCol>
                    <IonCol size={"12"} className={'ion-margin-vertical'}>
                        {
                            isAuthenticated && user?.email ?
                            <>
                                <IonTextarea placeholder={"Deje su comentario"} onIonChange={(e) => setComment(e.detail.value ||    '')}/>
                                <IonButton color={"primary"} disabled={!enableCommentButton} onClick={sendComment}>Enviar</IonButton>
                            </>
                            :
                            <IonItem>
                                <IonLabel color={"warning"} className="ion-text-center">Debe iniciar sesion para dejar comentarios.</IonLabel>
                            </IonItem>
                        }
                    </IonCol>
                {
                    (Array.isArray(props.post.comments) && props.post.comments.length > 1) &&
                    <IonCol size={"12"} className={'ion-margin-vertical'}>
                        {
                            !seeComments ? 
                            <IonItem button detail onClick={() => setSeeComments(true)}>
                                <IonLabel  className="ion-text-wrap">Ver comentarios</IonLabel>
                            </IonItem>
                            : 
                            props.post.comments.map((item, i) => 
                                <CommentCard comment={item} key={`comment-${i}-auth-${item.author}}`}/>
                            )
                        }
                    </IonCol>
                }
            </IonRow>
        )
    };

    return(
        props.mode !== 'print' ?
        <IonGrid className={"scroll"} fixed>
            {
                getHeader()
            }
            {
                props.post.datos ?
                getData()
                : null
            }
            {
                Array.isArray(props?.post?.files) && props.post.files.length > 0 ?
                getFiles()
                :null
            }
            <IonRow className={'ion-margin-vertical'}>
                <IonCol size={"12"}>
                    <IonItem lines={"full"}  className={"ion-text-center"}  color={'primary'}><IonLabel  className="ion-text-wrap"><h2><b>Compartir</b></h2></IonLabel></IonItem>
                </IonCol>
                <IonCol size={"12"} className={'ion-padding'}>
                    <IonButtons className={'ion-justify-content-evenly'}>
                        <IonButton color={"primary"} fill={"outline"}  href={`https://facebook.com/sharer/sharer.php?u=${window.location.origin}/mapa/${props.post._id}`}  target="_blank" rel="noopener">
                            Facebook&nbsp;
                            <IonIcon icon={logoFacebook} ></IonIcon>
                        </IonButton>
                        <IonButton color={"secondary"} fill={"outline"}  href={`https://twitter.com/intent/tweet/?text=Publicación:%20${reduceText(props.post.titulo, 100)}%20en%20${window.location.origin}/mapa/${props.post._id}`} target="_blank" rel="noopener">
                            Twitter&nbsp;
                            <IonIcon icon={logoTwitter} ></IonIcon>
                        </IonButton>
                        <IonButton color={"success"} fill={"outline"}  href={`https://wa.me/?text=Publicación:%20${reduceText(props.post.titulo, 100)}%20Visitala%20en:%20${window.location.origin}/mapa/${props.post._id}`} target="_blank" rel="noopener">
                            Whatsapp&nbsp;
                            <IonIcon icon={logoWhatsapp} ></IonIcon>
                        </IonButton>
                        <IonButton color={"medium"} fill={"outline"}  href={`mailto:?subject=Publicación:%20${reduceText(props.post.titulo, 100)}&body=Visitala%20en:%20${window.location.origin}/mapa/${props.post._id}`} target="_blank" rel="noopener">
                            Mail&nbsp;
                            <IonIcon icon={mailOpen} ></IonIcon>
                        </IonButton>
                    </IonButtons>
                </IonCol>
            </IonRow>
            <IonRow className={'ion-margin-vertical'}>
                <IonCol size={"12"}>
                    <IonItem lines={"full"}  className={"ion-text-center"}  color={'primary'}><IonLabel  className="ion-text-wrap"><h2><b>Opciones</b></h2></IonLabel></IonItem>
                </IonCol>
                <IonCol size={"12"} className={'ion-padding'}>
                    <IonButtons className={'ion-justify-content-evenly'}>
                        <IonButton color={'success'} onClick={() => {if (props.post) postToXLSX([props.post])}} fill={'outline'}>
                            Descargar Excel
                        </IonButton>
                        <IonButton color={'danger'} href={`${window.location.origin}/print/${props.post._id}`} fill={'outline'} target="_blank" rel="noopener">
                            Imprimir / Descargar PDF
                        </IonButton>
                    </IonButtons>
                </IonCol>
            </IonRow>
            {
                getComments()
            }
        </IonGrid>
        :
        <IonGrid style={{width: '100%', height: '100%', overflow: 'visible'}} id='toPrint'>
            {
                getHeader()
            }
            {
                props.post.datos ?
                getData()
                : null
            }
        </IonGrid>
    )
}