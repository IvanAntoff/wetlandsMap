import { IonButton, IonCol, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonProgressBar, IonRow, IonSelect, IonSelectOption, IonText, IonTextarea } from "@ionic/react";
import { alert, arrowBack } from "ionicons/icons";
import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { axiosResp, post } from "../interfaces/interfaces";
import { POSTS_URL } from '../axiosDirs';
const axios = require('axios');
interface wetlandFormProps{
    categories: {name: string, value: string}[],
    subcategories: {label: string, values: {name: string, value: string}[]}[],
}

export const WetlandForm: React.FC<wetlandFormProps> = (props) => {
    const [ step, setStep ] = useState<number>(1);
    const [ showErrorMessage, setShowErrorMessage ] = useState<boolean>(false);
    const [ errorMessage, setErrorMessage ] = useState<string>('Error desconocido.');
    const [ errorMessageColor, setErrorMessageColor ] = useState<string>('warning');
    const [ disableSubmit, setDisableSubmit ] = useState<boolean>(false);
    const { register, getValues ,handleSubmit, formState: { errors } } = useForm<post>();
    const onSubmit = handleSubmit(data => {
        setDisableSubmit(true);
        let post:post = data;
        post.status = "pending";
        post.subcategory = [];
        post.keyword = [];
        console.log(post)
        axios.post(`${POSTS_URL}/posts`, post)
        .then((response: axiosResp) => {
            if (response && response.status === 200) showSuccess('Elemento publicado con exito! Gracias por su ayuda.')
        })
        .catch((error: any) => {
            console.error(error);
            showError('Algo salio mal al realizar la publicacion, intentelo mas tarde.');
        });
    });
    const FIRSTSTEP = 1;
    const LASTSTEP = 4;

    const showIfStepIs = (stepToCheck: number) : boolean => {
        if (stepToCheck !== step ) return true;
        return false;
    } 

    const backStep = () => {
        if (showErrorMessage === true) closeErrorMessage();
        if (step > FIRSTSTEP) setStep(step-1);
    }

    const showSuccess = (Message: string) => {
        setErrorMessage(Message);
        setShowErrorMessage(true);
        setErrorMessageColor('success')
    }


    const showError = (errorMessage: string) => {
        setErrorMessage(`Error: ${errorMessage}`);
        setShowErrorMessage(true);
        setErrorMessageColor('warning')
    }

    const closeErrorMessage = () => {
        setErrorMessage(`Error desconocido.`);
        setShowErrorMessage(false);
        setErrorMessageColor('warning')
    }

    const nextStep = () => {
        if (step >= LASTSTEP) return;
        if (showErrorMessage === true) closeErrorMessage();
        switch (step) {
            case 1:
                if (typeof(getValues("category")) !== 'undefined') setStep(step+1);
                else showError('Debe seleccionar una categoria.');
            break;
            case 2:
                if ( 
                    (typeof(getValues("content.title") ) !== 'undefined') &&
                    (getValues("content.title") !== "") &&
                    (typeof(getValues("content.description") ) !== 'undefined') &&
                    (getValues("content.description") !== "")
                ) setStep(step+1);
                else showError('Debe completar todos los campos.');
            break;
            case 3:
                if ( 
                    (typeof(getValues("ubication.latitude") ) !== 'undefined') &&
                    (getValues("ubication.latitude") !== "") &&
                    (typeof(getValues("ubication.longitude") ) !== 'undefined') &&
                    (getValues("ubication.longitude") !== "")
                ) setStep(step+1);
                else showError('Debe seleccionar una ubicacion.');
            break;
        }
    }

    const getTitle = () => {
        let title = '';
        switch (step) {
            case 1:
                title = `Paso ${step}: Tipo de publicacion.`
            break;
            case 2:
                title = `Paso ${step}: Datos a publicar.`
            break;
            case 3:
                title = `Paso ${step}: Ubicacion.`
            break;
            case LASTSTEP:
                title = `¡Ultimo paso!`
            break;
        }
        return title;
    }

    return (
    <>
        <IonProgressBar value={step / LASTSTEP} buffer={step / LASTSTEP}></IonProgressBar>
        <IonText className={"ion-text-center"}><h1>{getTitle()}</h1></IonText>
        <IonProgressBar value={step / LASTSTEP} buffer={step / LASTSTEP}></IonProgressBar>
        <IonGrid style={{width: '100%'}}>
            <IonRow className={"ion-align-items-center ion-justify-content-evenly"} style={{height: '100%'}}>
                <IonCol size={"1"}>
                    <IonButton fill={"outline"} onClick={() => backStep()} hidden={step > FIRSTSTEP ? false : true}>
                        <IonIcon name={"chevron-back"}/>
                    </IonButton>        
                </IonCol>
                <IonCol size={"8"} className={"ion-nowrap nowarp"}>
                    <form onSubmit={onSubmit}>
                        {/*  Paso 1: Seleccionar categoria/tipo de post a cargar */}
                        {/* Categorias */}
                        <IonItem hidden={showIfStepIs(1)}>
                            <IonText><h1>Seleccione el tipo de publicacion a cargar</h1></IonText>
                            <IonLabel position={'floating'}>Categoria:</IonLabel>
                            <IonSelect placeholder={"Tipo de publicacion"} className={'alert-xl'} {...register("category", { required: true } )} >
                                { props.categories.length > 0 ?
                                    props.categories.map((category, index) => {
                                        return (<IonSelectOption value={category.value} key={`IonSelectOption-${index}-categoty-${category.name}`}>{category.name}</IonSelectOption>)
                                    })
                                    :
                                    <IonSelectOption disabled={true}>Datos no disponibles.</IonSelectOption>
                                }
                            </IonSelect>
                        </IonItem>
                        {/* OpcionesxCatergoria = Subcategorias */}
                        { props.subcategories.length > 0 ?
                            props.subcategories.map((item) => {
                                <IonItem>
                                <IonLabel>{item.label}</IonLabel>
                                <IonSelect {...register("category", { required: false } )} >
                                    { item.values.length > 0 ?
                                        item.values.map((subcategory) => {
                                            return (<IonSelectOption value={subcategory.value}>{subcategory.name}</IonSelectOption>)
                                        })
                                        :
                                        <IonSelectOption disabled={true}>Datos no disponibles.</IonSelectOption>
                                    }
                                </IonSelect>
                            </IonItem>
                            })
                            :
                            null
                        }
                        <IonItem hidden={showIfStepIs(2)}>
                            <IonLabel position={'floating'}>Titulo:</IonLabel>
                            <IonInput placeholder={"Ingrese un titulo."} required {...register("content.title", { required: 'El titulo es requerido' } )} ></IonInput>
                        </IonItem>
                        <IonItem hidden={showIfStepIs(2)}>
                            <IonLabel position={'floating'} className={"ion-align-self-start"}>Descripcion:</IonLabel>
                            <IonTextarea placeholder={"Ingrese los datos de su publicacion."} required {...register("content.description", { required: true })} ></IonTextarea>
                        </IonItem>
                        <IonItem hidden={showIfStepIs(3)} lines={"none"}>
                            <IonText><h1>Falta el map con reverse geocode</h1></IonText>
                        </IonItem>
                        <IonItem hidden={showIfStepIs(3)} lines={"none"}>
                            <IonText><h1>Hay que ingreasr a manopla lat y lon</h1></IonText>
                        </IonItem>
                        <IonItem hidden={showIfStepIs(3)}>
                            <IonLabel>Ubicacion:</IonLabel>
                            <IonInput placeholder={"Ingrese la latitud:"} required {...register("ubication.latitude", { required: true } )} ></IonInput>
                            <IonInput placeholder={"Ingrese la longitud:"} required {...register("ubication.longitude", { required: true })} ></IonInput>
                        </IonItem>
                        <IonText className={"ion-text-center"} hidden={showIfStepIs(LASTSTEP)}><h3>Esta a punto de completar la publicacion</h3></IonText>
                        <IonItem  className={"ion-margin"} hidden={showIfStepIs(LASTSTEP)} lines={"none"}>
                            <IonText hidden={showIfStepIs(LASTSTEP)}>
                                <h5>Aun esta a tiempo de realizar las modificaciones que usted crea necesarias.</h5><br/>
                                <h5>Una vez completada la publicacion, nuestro equipo de moderadores verificara el contenido de la misma. Si la revision es finalizada de manera exitosa su publicacion aparecera en la pantalla principal.</h5><br/>
                            </IonText>
                        </IonItem>
                        <IonButton type="submit" expand='block' hidden={showIfStepIs(LASTSTEP)} disabled={disableSubmit}>Completar!</IonButton> 
                    </form>
                </IonCol>
                <IonCol size={"1"}>
                    <IonButton fill={"outline"} onClick={() => nextStep()} hidden={step < LASTSTEP ? false : true}>
                        <IonIcon name={"chevron-forward"}/>
                    </IonButton>
                </IonCol>
            </IonRow>
        </IonGrid>
        <IonItem  className={"ion-margin"} lines={"full"} color={errorMessageColor} button detail detailIcon={"close-circle"} 
            onClick={()=> closeErrorMessage()} hidden={!showErrorMessage}>
            <IonText>{errorMessage}</IonText>
        </IonItem>
        <IonProgressBar value={step / LASTSTEP} buffer={step / LASTSTEP}></IonProgressBar>
    </>
    );
}