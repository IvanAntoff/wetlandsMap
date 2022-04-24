import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonGrid, IonImg, IonItem, IonLabel, IonModal, IonRow, IonText } from "@ionic/react"
import { useState } from "react"
import { reduceText, toCapitalizeCase } from "../utils/sharedFn";

export interface NewsModalProps {
    title: string,
    body: string,
    subTitle?: string,
    imgs?: string[],
}

export const NewsModal: React.FC<NewsModalProps> = (props: NewsModalProps) => {
    const [ isOpen, setIsOpen ] = useState<boolean>(false);

    const openNews = () => {setIsOpen(true)};
    const closeNews = () => {setIsOpen(false)};

    return (
        !isOpen ? 
        <IonCard style={{maxWidth: '20vw', minWidth: '200px'}}>
            <IonCardHeader>
                <IonCardTitle>{reduceText(toCapitalizeCase(props.title), 100)}</IonCardTitle>
                {
                    props.subTitle && <IonCardSubtitle>{reduceText(toCapitalizeCase(props.subTitle), 100)}</IonCardSubtitle>
                }
            </IonCardHeader>
            <IonCardContent>
                {
                    reduceText(toCapitalizeCase(props.body), 180)
                }
                <IonItem detail button onClick={() => openNews()}>Ver mas!</IonItem>
            </IonCardContent>
        </IonCard>
        :
        <IonModal isOpen={isOpen} backdropDismiss onDidDismiss={() => closeNews()} cssClass={'modal-width-70vw'}>
            <IonGrid>
                <IonRow>
                    <IonCol size={"12"}>
                        <IonItem lines={"full"}  className={"ion-text-center"}  color={'primary'}><IonLabel  className="ion-text-wrap"><h2><b>{toCapitalizeCase(props.title)}</b></h2></IonLabel></IonItem>
                        {
                            props.subTitle && <IonItem lines={"full"}  className={"ion-text-center"}  color={'primary'}><IonLabel  className="ion-text-wrap"><h2><b>{toCapitalizeCase(props.subTitle)}</b></h2></IonLabel></IonItem>
                        }
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol size={"12"} className={'ion-padding'}>
                        <IonText className={'ion-padding ion-margin-vertical'}>{props.body}</IonText>
                    </IonCol>
                    {
                        Array.isArray(props?.imgs) && props.imgs.length > 0 &&
                        props.imgs.map((item, index) => 
                            <IonCol sizeMd={"4"} sizeSm={"6"} sizeXs={"6"} className={'ion-padding'} key={`ionImg-${item}-${index}`}>
                                <IonImg src={item}></IonImg>
                            </IonCol> 
                        )
                    }
                </IonRow>
            </IonGrid>
        </IonModal>
    )
}