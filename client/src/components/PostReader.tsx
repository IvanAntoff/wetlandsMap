import { IonCol, IonGrid, IonItem, IonLabel, IonRow, IonText, IonTitle, IonToolbar } from "@ionic/react"
import { categories } from "../enums/data";
import { hasType, post, postCategory } from "../interfaces/interfaces"
import { toCapitalizeCase } from "../utils/sharedFn";

interface PostReader {
    post: post | undefined,
    mode: 'complete' | 'public'
}

export const PostReader: React.FC<PostReader> = (props: PostReader) => {
    const getCatergoryName = (type: postCategory) :string => {
        let label = categories.find((item) => item.value === type)?.name || 'Desconocido';
        return label;
    }

    const getData = () => {
        if (!props.post || !props.post.data) return null;
        if (props.post.data?.wetland) {
            const data = props.post.data.wetland;
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
                        <IonItem lines={"none"}><IonLabel><b>Presencia de fauna: </b>{data?.wildlife || 'Desconocida'}</IonLabel></IonItem>
                    </IonCol>
                    <IonCol size={"6"}>
                        <IonItem lines={"none"}><IonLabel><b>Color: </b>{data?.color || 'Desconocido'}</IonLabel></IonItem>
                    </IonCol>
                    <IonCol size={"6"}>
                        <IonItem lines={"none"}><IonLabel><b>Olor: </b>{data?.smell || 'Desconocido'}</IonLabel></IonItem>
                    </IonCol>
                    <IonCol size={"12"}>
                        <IonItem lines={"none"}><IonLabel><b>Actividades desarrolladas en zonas aledañas:</b> {data?.outskirts || 'Desconocidas'}</IonLabel></IonItem>
                    </IonCol>
                    <IonCol size={"12"}>
                        <IonItem lines={"none"}><IonLabel><b>Estado de márgenes de ribera: </b>{data?.margins || 'Desconocido'}</IonLabel></IonItem>
                    </IonCol>
                    <IonCol size={"6"}>
                        <IonItem lines={"none"}><IonLabel><b>Morfología de la costa: </b>{data?.morfology || 'Desconocida'}</IonLabel></IonItem>
                    </IonCol>
                </IonRow>
            )
        }
        if (props.post.data?.threath) {
            const data = props.post.data.threath;
            <IonRow>
                <IonCol size={"12"}>
                    <IonItem lines={"full"}  className={"ion-text-center"}  color={'primary'}><IonLabel><h2><b>Informacion adicional</b></h2></IonLabel></IonItem>
                </IonCol>
                <IonCol size={"12"}>
                    <IonItem lines={"none"}><IonLabel><b>Origen de la amenaza/impacto ambienta: </b>{data?.origin || 'Origen desconocido'}</IonLabel></IonItem>
                </IonCol>
                <IonCol size={"12"}>
                    <IonItem lines={"none"}><IonLabel><b>Fuente de generación: </b>{data?.source || 'Desconocida'}</IonLabel></IonItem>
                </IonCol>
                <IonCol size={"12"}>
                    <IonItem lines={"none"}><IonLabel><b>Tipo de amenaza/impacto ambienta: </b>{data?.threatType || 'Desconocido'}</IonLabel></IonItem>
                </IonCol>
                <IonCol size={"12"}>
                    <IonItem lines={"none"}><IonLabel><h2><b>Presencia de elementos flotantes</b></h2></IonLabel></IonItem>
                </IonCol>
                <IonCol size={"4"}>
                    <IonItem lines={"none"}><IonLabel><b>Materia orgánica: </b>{data?.surface?.matter || 'Desconocido'}</IonLabel></IonItem>
                </IonCol>
                <IonCol size={"4"}>
                    <IonItem lines={"none"}><IonLabel><b>Espuma: </b>{data?.surface?.foam || 'Desconocido'}</IonLabel></IonItem>
                </IonCol>
                <IonCol size={"4"}>
                    <IonItem lines={"none"}><IonLabel><b>Algas: </b>{data?.surface?.seaweed || 'Desconocido'}</IonLabel></IonItem>
                </IonCol>
                <IonCol size={"12"}>
                    <IonItem lines={"none"}><IonLabel><b>Descripcion de materia: </b></IonLabel></IonItem>
                    <IonText>{data?.surface?.matterDescrition || 'No posee descripcion'}</IonText>
                </IonCol>
                <IonCol size={"6"}>
                    <IonItem lines={"none"}><IonLabel><b>Olor: </b>{data?.aspect?.smell || 'Desconocido'}</IonLabel></IonItem>
                </IonCol>
                <IonCol size={"12"}>
                    <IonItem lines={"full"}  className={"ion-text-center"}  color={'primary'}><IonLabel><h2><b>Documentación que acredite amenaza/impacto ambiental</b></h2></IonLabel></IonItem>
                </IonCol>
                <IonCol size={"12"}>
                    <IonItem lines={"none"}><IonLabel><b>Análisis de muestras de agua: </b>{data?.documentation?.waterAnalysis || 'No incluye'}</IonLabel></IonItem>
                </IonCol>
                <IonCol size={"6"}>
                    <IonItem lines={"none"}><IonLabel><b>Tipo de análisis: </b>{data?.documentation?.waterAnalysisType || 'Desconocido'}</IonLabel></IonItem>
                </IonCol>
                <IonCol size={"6"}>
                    <IonItem lines={"none"}><IonLabel><b>Resultados: </b>{data?.documentation?.waterAnalysisResults || 'Desconocido'}</IonLabel></IonItem>
                </IonCol>
                <IonCol size={"6"}>
                    <IonItem lines={"none"}><IonLabel><b>Estudios de impacto ambienta: </b>{data?.documentation?.environmentalImpactReport || 'No incluye'}</IonLabel></IonItem>
                </IonCol>
                <IonCol size={"6"}>
                    <IonItem lines={"none"}><IonLabel><b>Informe técnico ambiental: </b>{data?.documentation?.environmentalTechnicalReport || 'No incluye'}</IonLabel></IonItem>
                </IonCol>
                <IonCol size={"6"}>
                    <IonItem lines={"none"}><IonLabel><b>Imágenes/videos: </b>{data?.documentation?.images || 'No incluye'}</IonLabel></IonItem>
                </IonCol>
            </IonRow>
        }
        if (props.post.data?.initiative) {
            const data = props.post.data.initiative;
            return(
                <IonRow>
                    <IonCol size={"12"}>
                        <IonItem lines={"full"}  className={"ion-text-center"}  color={'primary'}><IonLabel><h2><b>Informacion adicional</b></h2></IonLabel></IonItem>
                    </IonCol>
                    <IonCol size={"12"}>
                        <IonItem lines={"none"}><IonLabel><b>Tipo de iniciativa sustentable: </b>{data?.initiativeType || 'Desconocida'}</IonLabel></IonItem>
                    </IonCol>
                    <IonCol size={"12"}>
                        <IonItem lines={"none"}><IonLabel><b>Objetivo: </b>{data?.objetive || 'Desconocido'}</IonLabel></IonItem>
                    </IonCol>
                    <IonCol size={"12"}>
                        <IonItem lines={"none"}><IonLabel><b>Participantes: </b>{data?.initiativeParticipants || 'Desconocidos'}</IonLabel></IonItem>
                    </IonCol>
                    <IonCol size={"6"}>
                        <IonItem lines={"none"}><IonLabel><b>Organizador: </b>{data?.organizator || 'Desconocido'}</IonLabel></IonItem>
                    </IonCol>
                </IonRow>
            )
        }
        if (props.post.data?.art) {
            const data = props.post.data.art;
            return(
                <IonRow>
                    <IonCol size={"12"}>
                        <IonItem lines={"full"}  className={"ion-text-center"}  color={'primary'}><IonLabel><h2><b>Informacion adicional</b></h2></IonLabel></IonItem>
                    </IonCol>
                    <IonCol size={"12"}>
                        <IonItem lines={"none"}><IonLabel><b>Tipo de expresión artística: </b>{data?.artType || 'Desconocida'}</IonLabel></IonItem>
                    </IonCol>
                </IonRow>
            )
        }
        if (props.post.data?.Investigation) {
            const data = props.post.data.Investigation;
            return(
                <IonRow>
                    <IonCol size={"12"}>
                        <IonItem lines={"full"}  className={"ion-text-center"}  color={'primary'}><IonLabel><h2><b>Informacion adicional</b></h2></IonLabel></IonItem>
                    </IonCol>
                    <IonCol size={"12"}>
                        <IonItem lines={"none"}><IonLabel><b>Instituciones participantes del proyecto: </b>{data?.investigationParticipants || 'Desconocido'}</IonLabel></IonItem>
                    </IonCol>
                    <IonCol size={"6"}>
                        <IonItem lines={"none"}><IonLabel><b>Estado actual del proyecto: </b>{data?.state || 'Desconocidos'}</IonLabel></IonItem>
                    </IonCol>
                    <IonCol size={"6"}>
                        <IonItem lines={"none"}><IonLabel><b>Tipo de resultados: </b>{data?.resultType || 'Desconocidos'}</IonLabel></IonItem>
                    </IonCol>
                    <IonCol size={"12"}>
                        <IonItem lines={"none"}><IonLabel><b>Publicacion/comunicación de resultados: </b>{data?.publications || 'No indica'}</IonLabel></IonItem>
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
                            <IonTitle className={"ion-text-center"} ><h1><b>{props.post.content.title}</b></h1></IonTitle>
                            <IonTitle size={"small"} className={"ion-margin-bottom"}><b>Categoria:</b> {getCatergoryName(props.post.category)}</IonTitle>
                        </IonToolbar>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol size={"4"}>
                        <IonItem lines={"none"}>
                            <IonLabel><b>Tipo:</b> {toCapitalizeCase(props.post?.content?.genericData?.category) || 'Desconocido'}</IonLabel>
                        </IonItem>
                        <IonItem lines={"none"}>
                            <IonLabel><b>Origen:</b> {toCapitalizeCase(props.post?.content?.genericData?.origin) || 'Desconocido'}</IonLabel>
                        </IonItem>
                    </IonCol>
                    <IonCol size={"4"}>
                        <IonItem lines={"none"}>
                            <IonLabel><b>Depto:</b> {toCapitalizeCase(props.post?.content?.genericData?.location) || 'Desconocido'}</IonLabel>
                        </IonItem>
                        <IonItem lines={"none"}>
                            <IonLabel><b>Zona:</b> {toCapitalizeCase(props.post?.content?.genericData?.zone) || 'Desconocida'}</IonLabel>
                        </IonItem>
                    </IonCol>
                    <IonCol size={"4"}>
                        <IonItem lines={"none"}>
                            <IonLabel><b>Lat:</b> {props.post?.ubication?.latitude || 'Desconocida'}</IonLabel>
                        </IonItem>
                        <IonItem lines={"none"}>
                            <IonLabel><b>Lon:</b> {props.post?.ubication?.longitude || 'Desconocida'}</IonLabel>
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow className={'ion-margin-vertical'}>
                    <IonCol size={"12"}>
                        <IonItem lines={"full"} color={'primary'}><IonLabel><h2><b>Descripcion:</b></h2></IonLabel></IonItem>
                    </IonCol>
                    <IonCol size={"12"} className={'ion-padding'}>
                        <IonText className={'ion-padding ion-margin-vertical'} >{props?.post?.content?.description || 'La publicacion no incluye descripcion.'}</IonText>
                    </IonCol>
                </IonRow>
                {
                    props.post.data ?
                    getData()
                    : null
                }
            </IonGrid>
            :null
        }
        </>
    )
}