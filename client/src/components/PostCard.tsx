import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonCol, IonGrid, IonIcon, IonItem, IonRow, IonText } from "@ionic/react";
import { post } from "../interfaces/interfaces";
interface postCard extends post {
    index: number,
    buttons?: {
        label?: string, 
        size?: "small" | "large" | "default",
        onClick: Function,
        color?: string,
        icon?: string
    }[]
}
const PostCard: React.FC<postCard> = (props) => {
    if (props.content && props.content.description && props.content.description.length >= 100) props.content.description = `${props.content.description.slice(0,100)} ...`
    return (
        <IonCard color={''}>
            <IonCardHeader className="ion-margin-no">
                <IonCardTitle>{props.content.title ? props.content.title : 'Titulo no disponible.' }</IonCardTitle>
                <IonCardSubtitle><b>Ubicacion:</b>&nbsp;{props?.content?.genericData?.location || 'Desconocida'}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent >
                <IonText>
                    {props.content.description ? props.content.description : 'Descripcion no disponible.'}
                </IonText>
                { props.keyword && props.keyword.length > 0 ?
                    props.keyword.map((keyword, index) => {
                        return (
                            <IonChip key={`PostCard-Chip-keyword-${index}`}>{keyword}</IonChip>
                        )
                    })
                    :
                    null
                }
                { props.buttons && props.buttons.length > 0 ? 
                    <IonItem lines={"none"} >
                        <IonButtons className={'ion-justify-content-between'}>
                            {props.buttons.map((button, index) => {
                                return(
                                    <IonButton size={button.size ? button.size : "default"} onClick={() => button.onClick()}
                                        color={button.color ? button.color : 'primary'} fill={'clear'} key={`PostCard-button-${index}`}
                                    >
                                        {button.label ? button.label : null}
                                        {button.icon ? <IonIcon name={button.icon} />: null}
                                    </IonButton>
                                )
                            })}
                        </IonButtons>
                    </IonItem>
                    :
                    null
                }
            </IonCardContent>
        </IonCard>
    );
};

export default PostCard;
