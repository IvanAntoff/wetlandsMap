import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonCol, IonGrid, IonIcon, IonRow } from "@ionic/react";
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
    return (
        <IonCard>
            <IonCardHeader className="ion-margin-no">
                { props.buttons && props.buttons.length > 0 ? 
                    <IonButtons>
                        {props.buttons.map((button, index) => {
                            return(
                                <IonButton size={button.size ? button.size : "default"} onClick={() => button.onClick()}
                                    color={button.color ? button.color : 'primary'} key={`PostCard-button-${index}`}
                                >
                                    {button.label ? button.label : null}
                                    {button.icon ? <IonIcon name={button.icon} />: null}
                                </IonButton>
                            )
                        })}
                    </IonButtons>
                :
                    null
                }
                <IonCardSubtitle>Ubicacion:&nbsp;</IonCardSubtitle>
                <IonCardTitle>{props.content.title ? props.content.title : 'Titulo no disponible.' }</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                {props.content.description ? props.content.description : 'Descripcion no disponible.'}
                <br/>
                { props.keyword && props.keyword.length > 0 ?
                    props.keyword.map((keyword, index) => {
                        return (
                            <IonChip key={`PostCard-Chip-keyword-${index}`}>{keyword}</IonChip>
                        )
                    })
                    :
                    null
                }
                { props.subcategory && props.subcategory.length > 0 ?
                    props.subcategory.map((subcategory, index) => {
                        return (
                            <IonChip key={`PostCard-Chip-subcategory-${index}`}>{subcategory.type}&nbsp;:&nbsp;{subcategory.value}</IonChip>
                        )
                    })
                    :
                    null
                }
            </IonCardContent>
            
        </IonCard>
    );
};

export default PostCard;
