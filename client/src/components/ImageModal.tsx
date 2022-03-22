import { IonImg, IonModal, IonThumbnail } from "@ionic/react";
import { useState } from "react"

interface ImageProps {
    src: string,
    alt?: string,
    size?: string
}

export const ImageModal: React.FC<ImageProps> = (props: ImageProps) => {
    const [ bigPicture, setBigPicture ] = useState<boolean>(false);
    console.log(props.src)
    return (
        !bigPicture ?
        <IonThumbnail onClick={() => setBigPicture(true)} style={{"--size": props?.size || '350px'}}>
            <IonImg src={props.src} alt={props?.alt || 'image'} />
        </IonThumbnail>
        :
        <IonModal isOpen={bigPicture} backdropDismiss onDidDismiss={() => setBigPicture(false)} cssClass={'modal-width-70vw'}>
            <IonImg src={props.src} alt={props?.alt || 'image'} />
        </IonModal>
    )
}