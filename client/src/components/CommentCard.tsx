import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCheckbox, IonCol, IonGrid, IonIcon, IonItem, IonLabel, IonRow, IonText } from "@ionic/react";
import { useState } from "react";
import { comment, commentVM } from "../interfaces/comment.interface";
import { reduceText } from "../utils/sharedFn";

interface commentCard {
    comment: commentVM | comment,
    buttons?: {
        label?: string, 
        size?: "small" | "large" | "default",
        onClick: Function,
        color?: string,
    }[],
}
const CommentCard: React.FC<commentCard> = (props: commentCard) => {
    const [ seeMore, setSeeMore ] = useState<boolean>(false);
    const maxLength = 250;
    return (
        <IonCard>
            <IonCardHeader>
                {/* <IonCardTitle>Autor: {props.comment.author}</IonCardTitle> */}
                <IonCardSubtitle color={'primary'}><b>Autor: </b>{props.comment.author}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent >
                <IonText>
                    {
                        !seeMore ? 
                        reduceText(props.comment.msg, maxLength)
                        :
                        props.comment.msg
                    }
                </IonText>
                {
                    props.comment.msg.length > maxLength && !seeMore ? 
                    <IonItem detail button onClick={() => setSeeMore(true)}>
                        <IonLabel>Ver mas</IonLabel>
                    </IonItem>
                    : null
                }
                { props.buttons && props.buttons.length > 0 ? 
                    <IonItem lines={"none"}>
                        <IonButtons className={'ion-justify-content-between'}>
                            {props.buttons.map((button, index) => {
                                return(
                                    <IonButton size={button.size ? button.size : "default"} onClick={() => button.onClick()}
                                        color={button.color ? button.color : 'primary'} fill={'clear'} key={`PostCard-button-${index}`}
                                    >
                                        {button.label ? button.label : null}
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

export default CommentCard;
