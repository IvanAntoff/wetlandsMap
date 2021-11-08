import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonCol, IonGrid, IonIcon, IonItem, IonRow, IonText } from "@ionic/react";
import { post } from "../interfaces/interfaces";
import { reduceText, toCapitalizeCase } from "../utils/sharedFn";
interface postCard {
    index: number,
    post: post,
    buttons?: {
        label?: string, 
        size?: "small" | "large" | "default",
        onClick: Function,
        color?: string,
        icon?: string
    }[]
}
const PostCard: React.FC<postCard> = (props: postCard) => {
    return (
        <IonCard color={''}>
            <IonCardHeader className="ion-margin-no">
                <IonCardTitle>{toCapitalizeCase(props.post?.content?.title) || 'Titulo no disponible.' }</IonCardTitle>
                <IonCardSubtitle><b>Ubicacion:</b>&nbsp;{props?.post?.content?.genericData?.location || 'Desconocida'}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent >
                <IonText>
                    {reduceText(props.post?.content?.description) || 'Descripcion no disponible.'}
                </IonText>
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
                {/* { props.keyword && props.keyword.length > 0 ?
                    <IonItem lines={"none"} >
                        {props.keyword.map((keyword, index) => {
                            return (
                                <IonChip key={`PostCard-Chip-keyword-${index}`}>{keyword}</IonChip>
                            )
                        })}
                    </IonItem>
                    :
                    null
                } */}
            </IonCardContent>
        </IonCard>
    );
};

export default PostCard;
