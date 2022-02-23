import { User } from "@auth0/auth0-spa-js/dist/typings/global"
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonImg, IonThumbnail, IonGrid, IonRow, IonCol, IonText } from "@ionic/react"
import { useEffect, useState } from "react"
import LoginButton from "./LoginButton"
import LogoutButton from "./LogoutButton"

interface headerInterface {
    login?: {
        includeLogin: boolean,
        user: User | undefined
    }
}

export const Header: React.FC<headerInterface> = (props: headerInterface) => {
    const [ showLogIn, setShowLogIn ] = useState<boolean>(false);
    const [ user, setUser ] = useState<User | undefined>();

    useEffect(() => {
        if(props?.login?.includeLogin) setShowLogIn(props?.login?.includeLogin);
        if(props?.login?.user) setUser(props.login.user);
    },[props.login])

    const getLogInButton = (user: User | undefined) => {
        let button = null;
        if (!user) button = (
            <LoginButton />
        )
        else button = (
            <>
                <IonButton>
                    <p>{user?.nickname ? user.nickname : 'Desconocido'}</p>
                    <img className="circular--square" src={user?.picture ? user.picture : ''} alt={user?.name ? user?.name : 'unknowImg'} width="35" height="35" />
                </IonButton>
                <LogoutButton />
            </>
        )
        return button;
    }

    return (
    <IonHeader>
        <IonToolbar color={'primary'}>
            <IonGrid>
                <IonRow className={'ion-justify-content-between ion-align-items-center'}>
                    <IonCol sizeMd="3" sizeSm="12" sizeXs="12">
                        <IonImg src="/assets/imgs/header/logo.png" style={{height: '32px'}}/>
                    </IonCol>
                    <IonCol sizeMd="4" sizeSm="12" sizeXs="12" className={'ion-justify-content-center ion-text-center ion-align-items-center'}>
                        <IonTitle>Humedales digitales</IonTitle>
                        <IonText><b>Cuenca del río Gualeguaychú</b></IonText>
                    </IonCol>
                    <IonCol sizeMd="3"sizeSm="12" sizeXs="12" className={'ion-justify-content-center ion-text-center ion-align-items-center'}>
                        <IonButtons className={'ion-justify-content-center ion-text-center ion-align-items-center'}>
                        {   
                            showLogIn === true ? 
                            getLogInButton(user)
                            :
                            null
                        }
                        </IonButtons>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonToolbar>
    </IonHeader>
    )
} 