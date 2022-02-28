import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCheckbox, IonCol, IonGrid, IonIcon, IonItem, IonRow, IonText } from "@ionic/react";
import { useMemo, useState } from "react";
import { post } from "../interfaces/posts.interface";
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
    }[],
    check?: {
        onCheck: (post: post) => void,
        setUncheck?: boolean,
        setCheck?: boolean
    }
}
const PostCard: React.FC<postCard> = (props: postCard) => {
    const [ checked, setChecked ] = useState<boolean>(false);

    const checkCard = () => {
        setChecked(!checked);
        if (props.check?.onCheck) props.check?.onCheck(props.post);    
    }

    useMemo(() => {
        setChecked(true);
        if (props.check?.onCheck) props.check?.onCheck(props.post);    
    },[props.check?.setCheck])

    useMemo(() => {
        setChecked(false);
    },[props.check?.setUncheck])

    return (
        <IonCard color={checked === true ? 'light' : ''}>
            <IonCardHeader className="ion-margin-no">
                <IonGrid className={"ion-no-padding"}>
                    <IonRow>
                        <IonCol className={"ion-no-padding"} size={props.check ? '11' : '12'}>
                            <IonCardTitle>{toCapitalizeCase(props.post?.titulo) || 'Titulo no disponible.' }</IonCardTitle>
                            <IonCardSubtitle><b>Ubicacion:</b>&nbsp;{props?.post?.departamento || 'Desconocida'}</IonCardSubtitle>
                        </IonCol>
                        {
                            props.check &&
                            <IonCol className={"ion-no-padding"} size={ '1'}>
                                <IonCheckbox checked={checked} onIonChange={(e) => checkCard()}></IonCheckbox>
                            </IonCol>
                        }
                    </IonRow>
                </IonGrid>
            </IonCardHeader>
            <IonCardContent >
                <IonText>
                    {reduceText(props.post?.descripcion) || 'Descripcion no disponible.'}
                </IonText>
                { props.buttons && props.buttons.length > 0 ? 
                    <IonItem lines={"none"} color={checked ? 'light' : ''}>
                        <IonButtons className={'ion-justify-content-between'}>
                            {props.buttons.map((button, index) => {
                                return(
                                    <IonButton size={button.size ? button.size : "default"} onClick={() => button.onClick()}
                                        color={button.color ? button.color : 'primary'} fill={'clear'} key={`PostCard-button-${index}`}
                                    >
                                        {button.label ? button.label : null}
                                        {button.icon ? <IonIcon icon={button.icon} />: null}
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
