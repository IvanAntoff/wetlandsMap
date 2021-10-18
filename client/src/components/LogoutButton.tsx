import { useAuth0 } from "@auth0/auth0-react";
import { IonButton } from '@ionic/react';

const LogoutButton = () => {
    const { logout } = useAuth0();

    return (
        <IonButton size={'small'} color={'warning'} fill={'outline'} onClick={() => logout({ returnTo: window.location.origin })}>
            Cerrar sesion
        </IonButton>
    );
};

export default LogoutButton;