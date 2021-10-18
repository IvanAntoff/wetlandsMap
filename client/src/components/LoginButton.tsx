import { useAuth0 } from "@auth0/auth0-react";
import { IonButton } from '@ionic/react';

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return <IonButton color={'secondary'} fill={'solid'} onClick={() => loginWithRedirect()}>Iniciar sesion</IonButton>
};

export default LoginButton;