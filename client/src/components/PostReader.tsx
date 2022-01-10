import { IonButton, IonButtons, IonCol, IonGrid, IonItem, IonLabel, IonRow, IonText, IonThumbnail, IonTitle, IonToolbar } from "@ionic/react"
import { categorias } from "../enums/data";
import { CATEGORIA, post } from "../interfaces/posts.interface";
import { toCapitalizeCase } from "../utils/sharedFn";

interface PostReader {
    post: post | undefined,
    mode: 'complete' | 'public'
}

export const PostReader: React.FC<PostReader> = (props: PostReader) => {

    const  booleanText = (boolean: boolean | undefined) => {
        if (typeof(boolean) !== 'boolean') return null;
        if (boolean) return 'Presencia';
        return 'Ausencia';
    }
    // const [imgList, setImgList] = useState<JSX.Element[]>([]);

    // useEffect(() => {
    //     const getFiles = () => {
    //         const strFiles: string[] = props.post?.content?.files || [];
    //         const files:Blob[] = [];
    //         try {
    //             console.log(files)
    //             for (let i = 0; i < strFiles.length; i++) {
    //                 let type = "";
    //                 if (strFiles.includes('PNG')) type = ""
    //                 const blob = new Blob([strFiles[i]],{type: 'image/png'});
    //                 if (!blob) continue;
    //                 console.log('blob: ',blob)
    //                 files.push(blob);
    //             }
    //             console.log(1)
    //             const imgs: JSX.Element[] = [];
    //             // console.log(files) 
    //             console.log(2)
    //             console.log('files ',files)
    //             for (let i = 0; i < files.length; i++) {
    //                 console.log(3)
    //                 const file = files[i];
    //                 const url = URL.createObjectURL(file)
    //                 console.log(4, url)
    //                 if (file?.type.includes('image') && typeof(url) === 'string') imgs.push (
    //                     <IonThumbnail><img src={url}></img></IonThumbnail>
    //                 )
    //             }
    //             return imgs;
    //         } catch (error) {
    //             console.error(error)
    //             return ([<IonText className={'ion-text-center'}>Error al obtener los archivos.</IonText>])
    //         }
    //     }
    //     const auxImgs = getFiles();
    //     console.log(auxImgs)
    //     if (auxImgs && Array.isArray(auxImgs)) setImgList(auxImgs);
    // }, [props])

    const getCatergoryName = (type: CATEGORIA) :string => {
        let label = categorias.find((item) => item.value === type)?.name || 'Desconocido';
        return label;
    }

    const getData = () => {
        if (!props.post || !props.post.datos) return null;
        if (props.post.datos?.humedal) {
            const data = props.post.datos.humedal;
            return (
                <IonRow>
                    <IonCol size={"12"}>
                        <IonItem lines={"full"}  className={"ion-text-center"}  color={'primary'}><IonLabel><h2><b>Informacion adicional</b></h2></IonLabel></IonItem>
                    </IonCol>
                    <IonCol size={"12"}>
                        <IonItem lines={"none"}><IonLabel><h2><b>Aspecto del agua</b></h2></IonLabel></IonItem>
                    </IonCol>
                    <IonCol size={"6"}>
                        <IonItem lines={"none"}><IonLabel><b>Presencia de flora: </b>{data?.flora || 'Desconocida'}</IonLabel></IonItem>
                    </IonCol>
                    <IonCol size={"6"}>
                        <IonItem lines={"none"}><IonLabel><b>Presencia de fauna: </b>{data?.fauna || 'Desconocida'}</IonLabel></IonItem>
                    </IonCol>
                    <IonCol size={"6"}>
                        <IonItem lines={"none"}><IonLabel><b>Color: </b>{data?.color || 'Desconocido'}</IonLabel></IonItem>
                    </IonCol>
                    <IonCol size={"6"}>
                        <IonItem lines={"none"}><IonLabel><b>Olor: </b>{booleanText(data?.olor) || 'Desconocido'}</IonLabel></IonItem>
                    </IonCol>
                    <IonCol size={"12"}>
                        <IonItem lines={"none"}><IonLabel><b>Actividades desarrolladas en zonas aledañas:</b> {data?.aledaños || 'Desconocidas'}</IonLabel></IonItem>
                    </IonCol>
                    <IonCol size={"12"}>
                        <IonItem lines={"none"}><IonLabel><b>Estado de márgenes de ribera: </b>{data?.margen || 'Desconocido'}</IonLabel></IonItem>
                    </IonCol>
                    <IonCol size={"6"}>
                        <IonItem lines={"none"}><IonLabel><b>Morfología de la costa: </b>{data?.morfologia || 'Desconocida'}</IonLabel></IonItem>
                    </IonCol>
                </IonRow>
            )
        }
        if (props.post.datos?.amenaza) {
            const data = props.post.datos.amenaza;
            <IonRow>
                <IonCol size={"12"}>
                    <IonItem lines={"full"}  className={"ion-text-center"}  color={'primary'}><IonLabel><h2><b>Informacion adicional</b></h2></IonLabel></IonItem>
                </IonCol>
                <IonCol size={"12"}>
                    <IonItem lines={"none"}><IonLabel><b>Origen de la amenaza/impacto ambienta: </b>{data?.origen || 'Origen desconocido'}</IonLabel></IonItem>
                </IonCol>
                <IonCol size={"12"}>
                    <IonItem lines={"none"}><IonLabel><b>Fuente de generación: </b>{data?.fuente || 'Desconocida'}</IonLabel></IonItem>
                </IonCol>
                <IonCol size={"12"}>
                    <IonItem lines={"none"}><IonLabel><b>Tipo de amenaza/impacto ambienta: </b>{data?.tipo || 'Desconocido'}</IonLabel></IonItem>
                </IonCol>
                <IonCol size={"12"}>
                    <IonItem lines={"none"}><IonLabel><h2><b>Presencia de elementos flotantes</b></h2></IonLabel></IonItem>
                </IonCol>
                <IonCol size={"4"}>
                    <IonItem lines={"none"}><IonLabel><b>Materia orgánica: </b>{booleanText(data?.materia) || 'Desconocido'}</IonLabel></IonItem>
                </IonCol>
                <IonCol size={"4"}>
                    <IonItem lines={"none"}><IonLabel><b>Espuma: </b>{booleanText(data?.espuma) || 'Desconocido'}</IonLabel></IonItem>
                </IonCol>
                <IonCol size={"4"}>
                    <IonItem lines={"none"}><IonLabel><b>Algas: </b>{booleanText(data?.algas) || 'Desconocido'}</IonLabel></IonItem>
                </IonCol>
                <IonCol size={"12"}>
                    <IonItem lines={"none"}><IonLabel><b>Descripcion de materia: </b></IonLabel></IonItem>
                    <IonText>{data?.materiadescripcion || 'No posee descripcion'}</IonText>
                </IonCol>
                <IonCol size={"6"}>
                    <IonItem lines={"none"}><IonLabel><b>Olor: </b>{booleanText(data?.olor) || 'Desconocido'}</IonLabel></IonItem>
                </IonCol>
                <IonCol size={"12"}>
                    <IonItem lines={"full"}  className={"ion-text-center"}  color={'primary'}><IonLabel><h2><b>Documentación que acredite amenaza/impacto ambiental</b></h2></IonLabel></IonItem>
                </IonCol>
                <IonCol size={"12"}>
                    <IonItem lines={"none"}><IonLabel><b>Análisis de muestras de agua: </b>{booleanText(data?.analisis) || 'No incluye'}</IonLabel></IonItem>
                </IonCol>
                <IonCol size={"6"}>
                    <IonItem lines={"none"}><IonLabel><b>Tipo de análisis: </b>{data?.tipoanalises || 'Desconocido'}</IonLabel></IonItem>
                </IonCol>
                <IonCol size={"6"}>
                    <IonItem lines={"none"}><IonLabel><b>Resultados: </b>{data.resultadoanalises || 'Desconocido'}</IonLabel></IonItem>
                </IonCol>
                <IonCol size={"6"}>
                    <IonItem lines={"none"}><IonLabel><b>Estudios de impacto ambienta: </b>{booleanText(data?.estudioambiental) || 'No incluye'}</IonLabel></IonItem>
                </IonCol>
                <IonCol size={"6"}>
                    <IonItem lines={"none"}><IonLabel><b>Informe técnico ambiental: </b>{booleanText(data?.informetecnico) || 'No incluye'}</IonLabel></IonItem>
                </IonCol>
            </IonRow>
        }
        if (props.post.datos?.iniciativa) {
            const data = props.post.datos.iniciativa;
            return(
                <IonRow>
                    <IonCol size={"12"}>
                        <IonItem lines={"full"}  className={"ion-text-center"}  color={'primary'}><IonLabel><h2><b>Informacion adicional</b></h2></IonLabel></IonItem>
                    </IonCol>
                    <IonCol size={"12"}>
                        <IonItem lines={"none"}><IonLabel><b>Tipo de iniciativa sustentable: </b>{data?.tipo || 'Desconocida'}</IonLabel></IonItem>
                    </IonCol>
                    <IonCol size={"12"}>
                        <IonItem lines={"none"}><IonLabel><b>Objetivo: </b>{data?.objetivo || 'Desconocido'}</IonLabel></IonItem>
                    </IonCol>
                    <IonCol size={"12"}>
                        <IonItem lines={"none"}><IonLabel><b>Participantes: </b>{data?.participantes || 'Desconocidos'}</IonLabel></IonItem>
                    </IonCol>
                    {/* <IonCol size={"6"}>
                        <IonItem lines={"none"}><IonLabel><b>Organizador: </b>{data?.organizator || 'Desconocido'}</IonLabel></IonItem>
                    </IonCol> */}
                </IonRow>
            )
        }
        if (props.post.datos?.arte) {
            const data = props.post.datos.arte;
            return(
                <IonRow>
                    <IonCol size={"12"}>
                        <IonItem lines={"full"}  className={"ion-text-center"}  color={'primary'}><IonLabel><h2><b>Informacion adicional</b></h2></IonLabel></IonItem>
                    </IonCol>
                    <IonCol size={"12"}>
                        <IonItem lines={"none"}><IonLabel><b>Tipo de expresión artística: </b>{data?.tipo || 'Desconocida'}</IonLabel></IonItem>
                    </IonCol>
                    <IonCol size={"12"}>
                        <IonItem lines={"none"}><IonLabel><b>Participantes: </b>{data?.participantes || 'Desconocida'}</IonLabel></IonItem>
                    </IonCol>
                </IonRow>
            )
        }
        if (props.post.datos?.investigacion) {
            const data = props.post.datos?.investigacion;
            return(
                <IonRow>
                    <IonCol size={"12"}>
                        <IonItem lines={"full"}  className={"ion-text-center"}  color={'primary'}><IonLabel><h2><b>Informacion adicional</b></h2></IonLabel></IonItem>
                    </IonCol>
                    <IonCol size={"12"}>
                        <IonItem lines={"none"}><IonLabel><b>Instituciones participantes del proyecto: </b>{data?.participantes || 'Desconocido'}</IonLabel></IonItem>
                    </IonCol>
                    <IonCol size={"6"}>
                        <IonItem lines={"none"}><IonLabel><b>Estado actual del proyecto: </b>{data?.estado || 'Desconocidos'}</IonLabel></IonItem>
                    </IonCol>
                    <IonCol size={"6"}>
                        <IonItem lines={"none"}><IonLabel><b>Tipo de resultados: </b>{data?.resultado || 'Desconocidos'}</IonLabel></IonItem>
                    </IonCol>
                    <IonCol size={"12"}>
                        <IonItem lines={"none"}><IonLabel><b>Publicacion/comunicación de resultados: </b>{data?.publicacion || 'No indica'}</IonLabel></IonItem>
                    </IonCol>
                </IonRow>
            )
        }
    }

    return(
        <>
        {
            props.post ?
            <IonGrid className={"scroll"} fixed>
                <IonRow>
                    <IonCol size={"12"}>
                        <IonToolbar color={'primary'}>
                            <IonTitle className={"ion-text-center"} ><h1 className={'ion-text-wrap'}><b>{toCapitalizeCase(props.post.titulo)}</b></h1></IonTitle>
                            <IonTitle size={"small"} className={"ion-margin-bottom"}><b>Categoria:</b> {getCatergoryName(props.post.categoria)}</IonTitle>
                        </IonToolbar>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol size={"12"}>
                        <IonItem lines={"full"}  className={"ion-text-center"}  color={'primary'}><IonLabel><h2><b>Informacion general</b></h2></IonLabel></IonItem>
                    </IonCol>
                    <IonCol size={"4"}>
                        <IonItem lines={"none"}>
                            <IonLabel><b>Tipo:</b> {toCapitalizeCase(props.post?.categoria) || 'Desconocido'}</IonLabel>
                        </IonItem>
                        <IonItem lines={"none"}>
                            <IonLabel><b>Origen:</b> {toCapitalizeCase(props.post?.origen) || 'Desconocido'}</IonLabel>
                        </IonItem>
                    </IonCol>
                    <IonCol size={"4"}>
                        <IonItem lines={"none"}>
                            <IonLabel><b>Depto:</b> {toCapitalizeCase(props.post?.departamento) || 'Desconocido'}</IonLabel>
                        </IonItem>
                        <IonItem lines={"none"}>
                            <IonLabel><b>Zona:</b> {toCapitalizeCase(props.post?.zona) || 'Desconocida'}</IonLabel>
                        </IonItem>
                    </IonCol>
                    <IonCol size={"4"}>
                        <IonItem lines={"none"}>
                            <IonLabel><b>Lat:</b> {props.post?.coordenadas?.latitude || 'Desconocida'}</IonLabel>
                        </IonItem>
                        <IonItem lines={"none"}>
                            <IonLabel><b>Lon:</b> {props.post?.coordenadas?.longitude || 'Desconocida'}</IonLabel>
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow className={'ion-margin-vertical'}>
                    <IonCol size={"12"}>
                        <IonItem lines={"full"}  className={"ion-text-center"}  color={'primary'}><IonLabel><h2><b>Descripcion</b></h2></IonLabel></IonItem>
                    </IonCol>
                    <IonCol size={"12"} className={'ion-padding'}>
                        <IonText className={'ion-padding ion-margin-vertical'} >{props?.post?.descripcion|| 'La publicacion no incluye descripcion.'}</IonText>
                    </IonCol>
                </IonRow>
                {
                    props.post.datos ?
                    getData()
                    : null
                }
                {/* {
                    Array.isArray(props?.post?.content?.files) && props.post.content.files.length > 0 ?
                    <IonRow className={'ion-margin-vertical'}>
                        <IonCol size={"12"}>
                            <IonItem lines={"full"}  className={"ion-text-center"}  color={'primary'}><IonLabel><h2><b>Archivos</b></h2></IonLabel></IonItem>
                        </IonCol>
                        <IonCol size={"12"} className={'ion-padding'}>
                            { imgList.map((item) => item) }
                        </IonCol>
                    </IonRow>
                    :null
                } */}
                <IonRow className={'ion-margin-vertical'}>
                    <IonCol size={"12"}>
                        <IonItem lines={"full"}  className={"ion-text-center"}  color={'primary'}><IonLabel><h2><b>Opciones</b></h2></IonLabel></IonItem>
                    </IonCol>
                    <IonCol size={"12"} className={'ion-padding'}>
                        <IonButtons className={'ion-justify-content-evenly'}>
                            <IonButton color={'success'} disabled={true} fill={'outline'}>
                                Descargar Excel
                            </IonButton>
                            <IonButton color={'danger'} disabled={true} fill={'outline'}>
                                Descargar PDF
                            </IonButton>
                        </IonButtons>
                    </IonCol>
                </IonRow>
            </IonGrid>
            :null
        }
        </>
    )
}