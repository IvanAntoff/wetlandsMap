import { useAuth0 } from "@auth0/auth0-react";
import { IonButton, IonButtons, IonCol, IonGrid, IonIcon, IonImg, IonItem, IonLabel, IonRow, IonText, IonTextarea, IonTitle, IonToolbar } from "@ionic/react"
import { logoFacebook, logoTwitter, logoWhatsapp, mailOpen } from "ionicons/icons";
import { useRef, useState } from "react";
import { POSTS_URL } from "../apiKeys";
import { axiosInstance } from "../axiosConf";
import { imgFiles } from "../enums/data";
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
            console.log(error);
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
                            <IonTitle size={"small"} className={"ion-margin-bottom"}><b>Categoria:</b> {getCatergoryName(props.post.categoria)}</IonTitle>
                            <IonTitle size={"small"} className={"ion-margin-bottom"}><b>Fecha de carga:</b> {dateToStr(props.post.fechacreacion || props.post.createdAt)}</IonTitle>
                        </IonToolbar>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol size={"12"}>
                        <IonItem lines={"full"}  className={"ion-text-center"}  color={'primary'}><IonLabel  className="ion-text-wrap"><h2><b>Informacion general</b></h2></IonLabel></IonItem>
                    </IonCol>
                    <IonCol sizeMd={"4"} sizeSm={"12"} sizeXs={"12"}>
                        <IonItem lines={"none"}>
                            <IonLabel  className="ion-text-wrap"><b>Tipo:</b> {toCapitalizeCase(props.post?.categoria) || 'Desconocido'}</IonLabel>
                        </IonItem>
                        <IonItem lines={"none"}>
                            <IonLabel  className="ion-text-wrap"><b>Origen:</b> {toCapitalizeCase(props.post?.origen) || 'Desconocido'}</IonLabel>
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
                        <IonItem lines={"full"}  className={"ion-text-center"}  color={'primary'}><IonLabel  className="ion-text-wrap"><h2><b>Descripcion</b></h2></IonLabel></IonItem>
                    </IonCol>
                    <IonCol size={"12"} className={'ion-padding'}>
                        <IonText className={'ion-padding ion-margin-vertical'} >{props?.post?.descripcion|| 'La publicacion no incluye descripcion.'}</IonText>
                    </IonCol>
                </IonRow>
            </>
        )
    }

    const getData = () => {
        if (!props.post || !props.post.datos) return null;
        if (props.post.categoria === CATEGORIA.humedal && props.post.datos?.humedal) {
            const data = props.post.datos.humedal;
            return (
                <IonRow>
                    <IonCol size={"12"}>
                        <IonItem lines={"full"}  className={"ion-text-center"}  color={'primary'}><IonLabel  className="ion-text-wrap"><h2><b>Informacion adicional</b></h2></IonLabel></IonItem>
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
        if (props.post.categoria === CATEGORIA.amenaza && props.post.datos?.amenaza) {
            const data = props.post.datos.amenaza;
            return (
                <IonRow>
                    <IonCol size={"12"}>
                        <IonItem lines={"full"}  className={"ion-text-center"}  color={'primary'}><IonLabel  className="ion-text-wrap"><h2><b>Informacion adicional</b></h2></IonLabel></IonItem>
                    </IonCol>
                    <IonCol size={"12"}>
                        <IonItem lines={"none"}><IonLabel  className="ion-text-wrap"><b>Origen de la amenaza/impacto ambienta: </b>{data?.origen || 'Origen desconocido'}</IonLabel></IonItem>
                    </IonCol>
                    <IonCol size={"12"}>
                        <IonItem lines={"none"}><IonLabel  className="ion-text-wrap"><b>Fuente de generación: </b>{data?.fuente || 'Desconocida'}</IonLabel></IonItem>
                    </IonCol>
                    <IonCol size={"12"}>
                        <IonItem lines={"none"}><IonLabel  className="ion-text-wrap"><b>Tipo de amenaza/impacto ambienta: </b>{data?.tipo || 'Desconocido'}</IonLabel></IonItem>
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
                        <IonItem lines={"none"}><IonLabel  className="ion-text-wrap"><b>Descripcion de materia: </b></IonLabel></IonItem>
                        <IonText>{data?.materiadescripcion || 'No posee descripcion'}</IonText>
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
                        <IonItem lines={"none"}><IonLabel  className="ion-text-wrap"><b>Tipo de análisis: </b>{data?.tipoanalises || 'Desconocido'}</IonLabel></IonItem>
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
        if (props.post.categoria === CATEGORIA.iniciativa && props.post.datos?.iniciativa) {
            const data = props.post.datos.iniciativa;
            return(
                <IonRow>
                    <IonCol size={"12"}>
                        <IonItem lines={"full"}  className={"ion-text-center"}  color={'primary'}><IonLabel  className="ion-text-wrap"><h2><b>Informacion adicional</b></h2></IonLabel></IonItem>
                    </IonCol>
                    <IonCol size={"12"}>
                        <IonItem lines={"none"}><IonLabel  className="ion-text-wrap"><b>Tipo de iniciativa sustentable: </b>{data?.tipo || 'Desconocida'}</IonLabel></IonItem>
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
        if (props.post.categoria === CATEGORIA.arte && props.post.datos?.arte) {
            const data = props.post.datos.arte;
            return(
                <IonRow>
                    <IonCol size={"12"}>
                        <IonItem lines={"full"}  className={"ion-text-center"}  color={'primary'}><IonLabel  className="ion-text-wrap"><h2><b>Informacion adicional</b></h2></IonLabel></IonItem>
                    </IonCol>
                    <IonCol size={"12"}>
                        <IonItem lines={"none"}><IonLabel  className="ion-text-wrap"><b>Tipo de expresión artística: </b>{data?.tipo || 'Desconocida'}</IonLabel></IonItem>
                    </IonCol>
                    <IonCol size={"12"}>
                        <IonItem lines={"none"}><IonLabel  className="ion-text-wrap"><b>Participantes: </b>{data?.participantes || 'Desconocida'}</IonLabel></IonItem>
                    </IonCol>
                </IonRow>
            )
        }
        if (props.post.categoria === CATEGORIA.investigacion && props.post.datos?.investigacion) {
            const data = props.post.datos?.investigacion;
            return(
                <IonRow>
                    <IonCol size={"12"}>
                        <IonItem lines={"full"}  className={"ion-text-center"}  color={'primary'}><IonLabel  className="ion-text-wrap"><h2><b>Informacion adicional</b></h2></IonLabel></IonItem>
                    </IonCol>
                    <IonCol size={"12"}>
                        <IonItem lines={"none"}><IonLabel  className="ion-text-wrap"><b>Instituciones participantes del proyecto: </b>{data?.participantes || 'Desconocido'}</IonLabel></IonItem>
                    </IonCol>
                    <IonCol sizeMd={"6"} sizeSm={"12"} sizeXs={"12"}>
                        <IonItem lines={"none"}><IonLabel  className="ion-text-wrap"><b>Estado actual del proyecto: </b>{data?.estado || 'Desconocidos'}</IonLabel></IonItem>
                    </IonCol>
                    <IonCol sizeMd={"6"} sizeSm={"12"} sizeXs={"12"}>
                        <IonItem lines={"none"}><IonLabel  className="ion-text-wrap"><b>Tipo de resultados: </b>{data?.resultado || 'Desconocidos'}</IonLabel></IonItem>
                    </IonCol>
                    <IonCol size={"12"}>
                        <IonItem lines={"none"}><IonLabel  className="ion-text-wrap"><b>Publicacion/comunicación de resultados: </b>{data?.publicacion || 'No indica'}</IonLabel></IonItem>
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

        return (
            <IonRow className={'ion-margin-vertical'}>
                <IonCol size={"12"}>
                    <IonItem lines={"full"}  className={"ion-text-center"}  color={'primary'}><IonLabel  className="ion-text-wrap"><h2><b>Archivos</b></h2></IonLabel></IonItem>
                </IonCol>
                <IonCol size={"12"} className={'ion-padding'}>
                    {
                        files.map((item,i) => {
                            if(imgFiles.includes(item.mimetype)) {
                                return <IonImg src={item.url} key={`ionImg-${item.filename}-${i}`}></IonImg>
                            }
                            return null;
                        })
                    }
                </IonCol>
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
                        <IonButton color={"secondary"} fill={"outline"}  href={`https://twitter.com/intent/tweet/?text=Publicacion:%20${reduceText(props.post.titulo, 100)}%20en%20${window.location.origin}/mapa/${props.post._id}`} target="_blank" rel="noopener">
                            Twitter&nbsp;
                            <IonIcon icon={logoTwitter} ></IonIcon>
                        </IonButton>
                        <IonButton color={"success"} fill={"outline"}  href={`https://wa.me/?text=Publicacion:%20${reduceText(props.post.titulo, 100)}%20Visitala%20en:%20${window.location.origin}/mapa/${props.post._id}`} target="_blank" rel="noopener">
                            Whatsapp&nbsp;
                            <IonIcon icon={logoWhatsapp} ></IonIcon>
                        </IonButton>
                        <IonButton color={"medium"} fill={"outline"}  href={`mailto:?subject=Publicacion:%20${reduceText(props.post.titulo, 100)}&body=Visitala%20en:%20${window.location.origin}/mapa/${props.post._id}`} target="_blank" rel="noopener">
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
                        <IonButton color={'danger'} onClick={() => window.open(`${window.location.origin}/print/${props.post._id}`, '_blank') } fill={'outline'}>
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