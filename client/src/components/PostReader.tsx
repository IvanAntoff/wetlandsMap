import { IonCol, IonGrid, IonItem, IonLabel, IonRow, IonText } from "@ionic/react"
import { categories } from "../enums/data";
import { post, postCategory } from "../interfaces/interfaces"
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

    return(
        <>
        {
            props.post ?
            <IonGrid className={"scroll"} fixed>
                <IonRow>
                    <IonCol size={"12"}>
                        <IonItem lines={"none"}>
                            <IonLabel className={"ion-text-center"}><h1><b>{props.post.content.title}</b></h1></IonLabel>
                        </IonItem>
                        <IonItem lines={"none"} style={{height: 'min-content'}}>
                            <IonLabel position={"stacked"} className={"ion-no-padding ion-no-margin"}><b>Categoria:</b> {getCatergoryName(props.post.category)}</IonLabel>
                        </IonItem>
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
                <IonRow>
                    <IonCol size={"12"} className={'ion-padding'}>
                        <IonText className={'ion-padding'}>{props?.post?.content?.description || 'La publicacion no incluye descripcion.'}</IonText>
                    </IonCol>
                </IonRow>
            </IonGrid>
            :null
        }
        </>
    )
}