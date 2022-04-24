import { IonButton, IonCol, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonLoading, IonProgressBar, IonRow, IonSelect, IonSelectOption, IonText, IonTextarea } from "@ionic/react";
import * as React from "react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { bingMapPosition } from "../interfaces/interfaces";
import { POSTS_URL } from "../apiKeys";
import { axiosInstance } from "../axiosConf";
import { archivo, CATEGORIA, categorias, ESTADO, post } from "../interfaces/posts.interface";
import { Enums } from "../interfaces/enum.interface";
import { booleanEnums, docFiles, imgFiles } from "../enums/data";

interface wetlandFormProps{
    enums: Enums,
    location: bingMapPosition,
    onSubmit?: () => void
}

export const WetlandForm: React.FC<wetlandFormProps> = (props) => {
    const [ step, setStep ] = useState<number>(1);
    const [ showErrorMessage, setShowErrorMessage ] = useState<boolean>(false);
    const [ errorMessage, setErrorMessage ] = useState<string>('Error desconocido.');
    const [ errorMessageColor, setErrorMessageColor ] = useState<string>('warning');
    const [ disableSubmit, setDisableSubmit ] = useState<boolean>(false);
    const [ disableFilesUpload, setDisableFilesUpload ] = useState<boolean>(false);
    const [ uploadedFiles, setUploadedFiles ] = useState<archivo[]>([]);
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ loadingMessage, setLoadingMessage ] = useState<string>('');

    const { register, getValues ,handleSubmit, reset } = useForm<post>();
    const FIRSTSTEP = 1;
    const LASTSTEP = 5;

    const startLoad = (message: string) => {
        setLoadingMessage(message)
        setLoading(true);
    }

    const stoptLoad = () => {
        setLoading(false);
        setLoadingMessage('');
    }

    const resetForm = () => {
        reset();
        setStep(1);
        setUploadedFiles([]);
        setDisableFilesUpload(false);
        setDisableSubmit(false);
    }

    const onSubmit:SubmitHandler<post> = () => {
        try {
            startLoad('Enviando publicación...');
            setDisableSubmit(true);
            let post:post = getValues();
            if (uploadedFiles && uploadedFiles.length > 0) post.files = uploadedFiles;
            post.estado = ESTADO.pendiente;
            post.coordenadas = {
                latitude: props.location.latitude.toString(),
                longitude: props.location.longitude.toString()
            };
            axiosInstance.post(`${POSTS_URL}/posts`, {...post})
            .then((response) => {
                stoptLoad();
                if (response && (response.status === 200 || response.status === 201)) showSuccess('Elemento publicado con exito! Gracias por su ayuda.')
                setTimeout(()=> {
                    resetForm();
                    if(props.onSubmit) props.onSubmit();
                }, 1000);
            })
            .catch((error: any) => {
                console.error(error);
                stoptLoad();
                showError('Algo salio mal al realizar la publicación, intentelo mas tarde.');
            });
        }
        catch(error){
            stoptLoad();
            console.error(error)
            showError('Algo salio mal al realizar la publicación, intentelo mas tarde.');
        }
    };

    const uploadFiles = async (filesEv: FileList | null) => {
        startLoad('Subiendo archivos...');
        setDisableFilesUpload(true);
        const body = new FormData()
        let filesToUpload = 0;
        if (!filesEv || filesEv.length < 1) return;
        for (let i = 0; i < filesEv.length; i++) {
            if ((filesEv[i].size) && ((filesEv[i].size/1024) > 15000)){
                showError('Los archivos cuyo peso sea mayor a 15MB seran omitidos.');
                continue;
            }
            body.append("files[]", filesEv[i]);
            filesToUpload = filesToUpload + 1;
        }
        if(filesToUpload === 0) {
            setDisableFilesUpload(false);
            stoptLoad();
            return showSuccess('Ningun archivo ha sido subido.');
        }
        axiosInstance.post(`${POSTS_URL}/files/uploadMultiple`, body)
        .then((response) => {
            stoptLoad();
            if (Array.isArray(response?.data) && response?.status === 201) {
                setUploadedFiles(response.data);
                showSuccess(`Un total de ${filesToUpload} fueron subidos con exito! Puede continuar.`)
            };
        })
        .catch((error: any) => {
            console.error(error);
            setDisableFilesUpload(false);
            stoptLoad();
            showError('Algo salio mal al realizarcarga de archivos, intentelo mas tarde.');
        });
    }

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
        if (!props.location || !props.location.latitude || !props.location.longitude) return showError('Error al confirmar la ubicacion seleccionada, repita el proceso.');
        switch (step) {
            case 1:
                if ( !getValues("categoria") ) return showError('Debe seleccionar una categoría.');
                return setStep(step+1);
            case 2:
                if ( !getValues("categoria")  || !getValues("zona") || !getValues("departamento") || !getValues("tipo") ) 
                return showError('Debe completar todos los campos.');
                return setStep(step+1);
            case 3:
                if ( !getValues("titulo") || !getValues("descripcion") ) return showError('Debe completar todos los campos.');
                return setStep(step+1);
            case 4:
                if( getValues("categoria") === CATEGORIA.humedal && !getValues("datos.humedal.aledaños")) return showError('Debe completar los datos requeridos.');
                if( getValues("categoria") === CATEGORIA.amenaza && ( !getValues("datos.amenaza.tipo") || !getValues("datos.amenaza.origen") || !getValues("datos.amenaza.fuente") ) ) return showError('Debe completar los datos requeridos.');
                if( getValues("categoria") === CATEGORIA.iniciativa && ( !getValues("datos.iniciativa.tipo") || !getValues("datos.iniciativa.participantes") || !getValues("datos.iniciativa.objetivo") ) ) return showError('Debe completar los datos requeridos.');
                if( getValues("categoria") === CATEGORIA.arte && ( !getValues("datos.arte.tipo") || !getValues("datos.arte.participantes") ) ) return showError('Debe completar los datos requeridos.');
                if( getValues("categoria") === CATEGORIA.investigacion && !getValues("datos.investigacion.participantes") ) return showError('Debe completar los datos requeridos.');
                return setStep(step+1);
        }
    }

    const getTitle = () => {
        let title = '';
        switch (step) {
            case 1:
                title = `Paso ${step}: Típo de publicación.`
            break;
            case 2:
                title = `Paso ${step}: Información general.`
            break;
            case 3:
                title = `Paso ${step}: Publicación.`
            break;
            case 4:
                title = `Paso ${step}: Datos adicionales.`
            break;
            case LASTSTEP:
                title = `¡Último paso!`
            break;
        }
        return title;
    }

    const optionalsWetland = () => {
        return (
            <>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'} className={"ion-text-wrap"}>* Actividades desarrolladas en zonas aledañas:</IonLabel>
                    <IonSelect placeholder={""} className={'alert-xl'} {...register("datos.humedal.aledaños")} >
                        {
                        props.enums.aledaños.map((item, index) => {
                            return (<IonSelectOption value={item._id} key={`IonSelectOption-${index}-outskirt-${item._id}`}>{item.name}</IonSelectOption>)
                        })
                        }
                    </IonSelect>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonText color={"primary"}><h4>Aspecto del agua</h4></IonText>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'} className={"ion-text-wrap"}>Color del agua:</IonLabel>
                    <IonSelect placeholder={"Indique el color observado."} className={'alert-xl'} {...register("datos.humedal.color")} >
                        {
                        props.enums.colores.map((item, index) => {
                            return (<IonSelectOption value={item._id} key={`IonSelectOption-${index}-colorArray-${item._id}`}>{item.name}</IonSelectOption>)
                        })
                        }
                    </IonSelect>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'} className={"ion-text-wrap"}>Presencia de olor en el agua:</IonLabel>
                    <IonSelect placeholder={"Indique si noto la presencia de olor en el agua."} className={'alert-xl'} {...register("datos.humedal.olor")} >
                        {
                        booleanEnums.map((item, index) => {
                            return (<IonSelectOption value={item.value} key={`IonSelectOption-${index}-smell-${item.value}`}>{item.name}</IonSelectOption>)
                        })
                        }
                    </IonSelect>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'} className="ion-text-wrap">Presencia de flora:</IonLabel>
                    <IonSelect placeholder={"Indique la flora observada."} multiple className={'alert-xl'} {...register("datos.humedal.flora")} >
                        {
                        props.enums.floras.map((item, index) => {
                            return (<IonSelectOption value={item._id} key={`IonSelectOption-${index}-flora-${item._id}`}>{item.name}</IonSelectOption>)
                        })
                        }
                    </IonSelect>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'} className={"ion-text-wrap"}>Presencia de fauna:</IonLabel>
                    <IonSelect placeholder={"Indique la fauna observada."} multiple className={'alert-xl'} {...register("datos.humedal.fauna")} >
                        {
                        props.enums.faunas.map((item, index) => {
                            return (<IonSelectOption value={item._id} key={`IonSelectOption-${index}-wildlife-${item._id}`}>{item.name}</IonSelectOption>)
                        })
                        }
                    </IonSelect>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'} className={"ion-text-wrap"}>Estado de márgenes de ribera:</IonLabel>
                    <IonSelect placeholder={"Indique el estado observado en los margenes de ribera."} className={'alert-xl'} {...register("datos.humedal.margen")} >
                        {
                        props.enums.margenes.map((item, index) => {
                            return (<IonSelectOption value={item._id} key={`IonSelectOption-${index}-margins-${item._id}`}>{item.name}</IonSelectOption>)
                        })
                        }
                    </IonSelect>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'} className={"ion-text-wrap"}>Morfología de la costa:</IonLabel>
                    <IonSelect placeholder={"Indique el estado observado en los margenes de ribera."} className={'alert-xl'} {...register("datos.humedal.morfologia")} >
                        {
                        props.enums.morfologias.map((item, index) => {
                            return (<IonSelectOption value={item._id} key={`IonSelectOption-${index}-morfology-${item._id}`}>{item.name}</IonSelectOption>)
                        })
                        }
                    </IonSelect>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'} className={"ion-text-wrap"}>Historia:</IonLabel>
                    <IonTextarea placeholder={"Relate, de conocerse, la historia del sitio."} {...register("datos.humedal.historia")} ></IonTextarea>
                </IonItem>
            </>
        )
    }

    const optionalsThreath = () => {
        return (
            <>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'} className={"ion-text-wrap"}>* Típo de amenaza:</IonLabel>
                    <IonSelect placeholder={"Indique el Típo de la amenaza."} className={'alert-xl'} {...register("datos.amenaza.tipo")} >
                        {
                        props.enums.tipoamenazas.map((item, index) => {
                            return (<IonSelectOption value={item._id} key={`IonSelectOption-${index}-origin-${item._id}`}>{item.name}</IonSelectOption>)
                        })
                        }
                    </IonSelect>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'} className={"ion-text-wrap"}>* Típo de origen de la amenaza/impacto ambiental:</IonLabel>
                    <IonSelect placeholder={"De conocerla, indique el origen de la amenaza."} className={'alert-xl'} {...register("datos.amenaza.origen")} >
                        {
                        props.enums.origenes.map((item, index) => {
                            return (<IonSelectOption value={item._id} key={`IonSelectOption-${index}-origin-${item._id}`}>{item.name}</IonSelectOption>)
                        })
                        }
                    </IonSelect>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'} className={"ion-text-wrap"}>* Fuente de generación:</IonLabel>
                    <IonSelect placeholder={"Indique que genera la contaminacion/amenaza."} className={'alert-xl'} {...register("datos.amenaza.fuente")} >
                        {
                        props.enums.fuenteamenazas.map((item, index) => {
                            return (<IonSelectOption value={item._id} key={`IonSelectOption-${index}-source-${item._id}`}>{item.name}</IonSelectOption>)
                        })
                        }
                    </IonSelect>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonText color={"primary"}><h4>Aspectos alterados en la calidad del agua</h4></IonText>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'} className={"ion-text-wrap"}>Olor:</IonLabel>
                    <IonSelect placeholder={"Indique si noto presencia de olor/es."} className={'alert-xl'} {...register("datos.amenaza.olor")} >
                        {
                        booleanEnums.map((item, index) => {
                            return (<IonSelectOption value={item.value} key={`IonSelectOption-${index}-smell-${item.value}`}>{item.name}</IonSelectOption>)
                        })
                        }
                    </IonSelect>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'} className={"ion-text-wrap"}>Color :</IonLabel>
                    <IonSelect placeholder={"Indique el color del agua."} className={'alert-xl'} {...register("datos.amenaza.color")} >
                        {
                        props.enums.colores.map((item, index) => {
                            return (<IonSelectOption value={item._id} key={`IonSelectOption-${index}-color-${item._id}`}>{item.name}</IonSelectOption>)
                        })
                        }
                    </IonSelect>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonText color={"primary"}><h4>Presencia de elementos flotantes</h4></IonText>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'} className={"ion-text-wrap"}>Materia orgánica en la superficie:</IonLabel>
                    <IonSelect placeholder={"Indique si notó materia flotando."} className={'alert-xl'} {...register("datos.amenaza.materia")} >
                        {
                        booleanEnums.map((item, index) => {
                            return (<IonSelectOption value={item.value} key={`IonSelectOption-${index}-hasMatter-${item.value}`}>{item.name}</IonSelectOption>)
                        })
                        }
                    </IonSelect>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'} className={"ion-text-wrap"}>Describa la materia flotante presenciada:</IonLabel>
                    <IonTextarea placeholder={"Describa, si corresponde, lo presenciado."} {...register("datos.amenaza.materiadescripcion")} minlength={200} maxlength={1000} spellCheck={true} ></IonTextarea>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'} className={"ion-text-wrap"}>Espumas en la superficie:</IonLabel>
                    <IonSelect placeholder={"Indique si notó espuma flotando."} className={'alert-xl'} {...register("datos.amenaza.espuma")} >
                        {
                        booleanEnums.map((item, index) => {
                            return (<IonSelectOption value={item.value} key={`IonSelectOption-${index}-foam-${item.value}`}>{item.name}</IonSelectOption>)
                        })
                        }
                    </IonSelect>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'} className={"ion-text-wrap"}>Algas en la superficie:</IonLabel>
                    <IonSelect placeholder={"Indique si notó algas flotando."} className={'alert-xl'} {...register("datos.amenaza.algas")} >
                        {
                        booleanEnums.map((item, index) => {
                            return (<IonSelectOption value={item.value} key={`IonSelectOption-${index}-algas-${item.value}`}>{item.name}</IonSelectOption>)
                        })
                        }
                    </IonSelect>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonText color={"primary"}><h4>Documentación que acredite amenaza/impacto ambiental</h4></IonText>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'} className={"ion-text-wrap"}>Análisis de muestras de agua:</IonLabel>
                    <IonSelect placeholder={"Existen análisis de muestras de agua."} className={'alert-xl'} {...register("datos.amenaza.analisis")} >
                        {
                        booleanEnums.map((item, index) => {
                            return (<IonSelectOption value={item.value} key={`IonSelectOption-${index}-analysis-${item.value}`}>{item.name}</IonSelectOption>)
                        })
                        }
                    </IonSelect>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'} className={"ion-text-wrap"}>Típo de análisis:</IonLabel>
                    <IonSelect placeholder={"Existen análisis de muestras de agua."} className={'alert-xl'} {...register("datos.amenaza.tipoanalises")} >
                        {
                        props.enums.tipoanalises.map((item, index) => {
                            return (<IonSelectOption value={item._id} key={`IonSelectOption-${item._id}-waterAnalysisType-${index}`}>{item.name}</IonSelectOption>)
                        })
                        }
                    </IonSelect>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'} className={"ion-text-wrap"}>Resultados de los estudios:</IonLabel>
                    <IonSelect placeholder={"Conoce los resultados de los estudios?."} className={'alert-xl'} {...register("datos.amenaza.resultadoanalises")} >
                        {
                        props.enums.resultadoanalises.map((item, index) => {
                            return (<IonSelectOption value={item._id} key={`IonSelectOption-${item._id}-waterAnalysisResults-${index}`}>{item.name}</IonSelectOption>)
                        })
                        }
                    </IonSelect>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'} className={"ion-text-wrap"}>Estudios de impacto ambiental:</IonLabel>
                    <IonSelect placeholder={"Existen estudios sobre el impacto ambieltal?."} className={'alert-xl'} {...register("datos.amenaza.estudioambiental")} >
                        {
                        booleanEnums.map((item, index) => {
                            return (<IonSelectOption value={item.value} key={`IonSelectOption-${item.value}-environmentalImpactReport-${index}`}>{item.name}</IonSelectOption>)
                        })
                        }
                    </IonSelect>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'} className={"ion-text-wrap"}>Informe técnico ambiental:</IonLabel>
                    <IonSelect placeholder={"Existen informes técnicos ambientales?."} className={'alert-xl'} {...register("datos.amenaza.informetecnico")} >
                        {
                        booleanEnums.map((item, index) => {
                            return (<IonSelectOption value={item.value} key={`IonSelectOption-${item.value}-environmentalTechnicalReport-${index}`}>{item.name}</IonSelectOption>)
                        })
                        }
                    </IonSelect>
                </IonItem>
                {/* <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'} className={"ion-text-wrap"}>Adjunta imágenes/videos:</IonLabel>
                    <IonSelect placeholder={""} className={'alert-xl'} {...register("data.threath.documentation.images")} >
                        {
                        booleanEnumArray.map((images, index) => {
                            return (<IonSelectOption value={item._id} key={`IonSelectOption-${images}-images-${index}`}>{images}</IonSelectOption>)
                        })
                        }
                    </IonSelect>
                </IonItem> */}
            </>
        )
    }

    const optionalsInitiative = () => {
        return (
            <>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'} className={"ion-text-wrap"}>Típo de iniciativa sustentable:</IonLabel>
                    <IonSelect placeholder={""} className={'alert-xl'} {...register("datos.iniciativa.tipo")} >
                        {
                        props.enums.tipoiniciativas.map((item, index) => {
                            return (<IonSelectOption value={item._id} key={`IonSelectOption-${item._id}-initiativeType-${index}`}>{item.name}</IonSelectOption>)
                        })
                        }
                    </IonSelect>
                </IonItem>
                {/* <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'} className={"ion-text-wrap"}>Organizador/es de la iniciativa sustentable:</IonLabel>
                    <IonSelect placeholder={""} className={'alert-xl'} {...register("datos.iniciativa.")} >
                        {
                        organizatorArray.map((organizator, index) => {
                            return (<IonSelectOption value={item._id} key={`IonSelectOption-${organizator}-organizator-${index}`}>{organizator}</IonSelectOption>)
                        })
                        }
                    </IonSelect>
                </IonItem> */}
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'} className={"ion-text-wrap"}>Participantes de la iniciativa sustentable:</IonLabel>
                    <IonSelect placeholder={""} className={'alert-xl'} {...register("datos.iniciativa.participantes")} >
                        {
                        props.enums.participantes.map((item, index) => {
                            return (<IonSelectOption value={item._id} key={`IonSelectOption-${item._id}-participants-${index}`}>{item.name}</IonSelectOption>)
                        })
                        }
                    </IonSelect>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'} className={"ion-text-wrap"}>Objetivo de la iniciativa sustentable:</IonLabel>
                    <IonSelect placeholder={""} className={'alert-xl'} {...register("datos.iniciativa.objetivo")} >
                        {
                        props.enums.objetivoiniciativas.map((item, index) => {
                            return (<IonSelectOption value={item._id} key={`IonSelectOption-${item._id}-objetive-${index}`}>{item.name}</IonSelectOption>)
                        })
                        }
                    </IonSelect>
                </IonItem>
            </>
        )
    }

    const optionalsArt = () => {
        return (
            <>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'} className={"ion-text-wrap"}>Típo de expresión artística:</IonLabel>
                    <IonSelect placeholder={""} className={'alert-xl'} {...register("datos.arte.tipo")} >
                        {
                        props.enums.tipoartes.map((item, index) => {
                            return (<IonSelectOption value={item._id} key={`IonSelectOption-${item._id}-artType-${index}`}>{item.name}</IonSelectOption>)
                        })
                        }
                    </IonSelect>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'} className={"ion-text-wrap"}>¿Quiene participaron de la actividad?:</IonLabel>
                    <IonSelect placeholder={""} className={'alert-xl'} {...register("datos.arte.participantes")} >
                        {
                        props.enums.participantes.map((item, index) => {
                            return (<IonSelectOption value={item._id} key={`IonSelectOption-${item._id}-artType-${index}`}>{item.name}</IonSelectOption>)
                        })
                        }
                    </IonSelect>
                </IonItem>
            </>
        )
    }

    const optionalsInvestigation = () => {
        return (
            <>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'} className={"ion-text-wrap"}>Instituciones participantes del proyecto de investigación/extensión:</IonLabel>
                    <IonSelect placeholder={""} className={'alert-xl'} {...register("datos.investigacion.participantes")} >
                        {
                        props.enums.participantes.map((item, index) => {
                            return (<IonSelectOption value={item._id} key={`IonSelectOption-${item._id}-investigationParticipants-${index}`}>{item.name}</IonSelectOption>)
                        })
                        }
                    </IonSelect>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'} className={"ion-text-wrap"}>Estado actual del proyecto de investigación/extensión:</IonLabel>
                    <IonSelect placeholder={""} className={'alert-xl'} {...register("datos.investigacion.estado")} >
                        {
                        props.enums.estadoinvestigaciones.map((item, index) => {
                            return (<IonSelectOption value={item._id} key={`IonSelectOption-${item._id}-state-${index}`}>{item.name}</IonSelectOption>)
                        })
                        }
                    </IonSelect>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'} className={"ion-text-wrap"}>Típo de resultados obtenidos:</IonLabel>
                    <IonSelect placeholder={""} className={'alert-xl'} {...register("datos.investigacion.resultado")} >
                        {
                        props.enums.resultadoinvestigaciones.map((item, index) => {
                            return (<IonSelectOption value={item._id} key={`IonSelectOption-${item._id}-resultType-${index}`}>{item.name}</IonSelectOption>)
                        })
                        }
                    </IonSelect>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'} className={"ion-text-wrap"}>Estado de publicación/comunicación de resultados obtenidos:</IonLabel>
                    <IonSelect placeholder={""} className={'alert-xl'} {...register("datos.investigacion.publicacion")} >
                        {
                        props.enums.publicaciones.map((item, index) => {
                            return (<IonSelectOption value={item._id} key={`IonSelectOption-${item._id}-publications-${index}`}>{item.name}</IonSelectOption>)
                        })
                        }
                    </IonSelect>
                </IonItem>
            </>
        )
    }

    const getOptionesByType = () => {
        const category = getValues("categoria")
        if (!category) return;
        switch (category) {
            case CATEGORIA.humedal: 
                return optionalsWetland();
            case CATEGORIA.amenaza:
                return optionalsThreath();
            case CATEGORIA.iniciativa:
                return optionalsInitiative();
            case CATEGORIA.arte:
                return optionalsArt();
            case CATEGORIA.investigacion:
                return optionalsInvestigation(); 
        }
    }

    return (
    <>
        <IonLoading
            isOpen={loading}
            showBackdrop={true}
            message={loadingMessage || 'Cargando...'}
        />
        <IonProgressBar value={step / LASTSTEP} buffer={step / LASTSTEP}></IonProgressBar>
        <IonText className={"ion-text-center"}><h1>{getTitle()}</h1></IonText>
        <IonProgressBar value={step / LASTSTEP} buffer={step / LASTSTEP}></IonProgressBar>
        <IonGrid style={{width: '100%'}} className={'scroll'}>
            <IonRow className={"ion-align-items-center ion-justify-content-evenly"} style={{height: '100%'}}>
                <IonCol size={"1"}>
                    <IonButton fill={"outline"} onClick={() => backStep()} hidden={step > FIRSTSTEP ? false : true}>
                        <IonIcon icon={"chevron-back"}/>
                    </IonButton>        
                </IonCol>
                <IonCol size={"8"} className={"ion-nowrap nowarp"}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/*  Paso 1: Seleccionar categoria/Típo de post a cargar */}
                        {/* Categorias */}
                        <IonItem hidden={showIfStepIs(1)}>
                            <IonText><h1>Seleccione el típo de publicación a cargar</h1></IonText>
                            <IonLabel position={'stacked'}>Categoría:</IonLabel>
                            <IonSelect placeholder={"Típo de publicación"} className={'alert-xl'} {...register("categoria")} >
                            {
                                categorias.map((category, index) => {
                                    return (<IonSelectOption value={category.value} key={`IonSelectOption-${index}-categoty-${category.name}`}>{category.name}</IonSelectOption>)
                                })
                            }
                            </IonSelect>
                        </IonItem>
                        <IonItem hidden={showIfStepIs(2)}>
                            <IonLabel position={'stacked'}>Típo de humedal:</IonLabel>
                            <IonSelect placeholder={"Típo de humedal:"} className={'alert-xl'} {...register("origen")} >
                            {
                                props.enums.origenes.map((item, index) => {
                                    return (<IonSelectOption value={item._id} key={`IonSelectOption-${index}-wetlandTypes-${item.name}`}>{item.name}</IonSelectOption>)
                                })
                            }
                            </IonSelect>
                        </IonItem>
                        <IonItem hidden={showIfStepIs(2)}>
                            <IonLabel position={'stacked'}>Categoría del humedal:</IonLabel>
                            <IonSelect placeholder={"Categoría del humedal:"} className={'alert-xl'} {...register("tipo")} >
                                {
                                props.enums.tipohumedales.map((item, index) => {
                                    return (<IonSelectOption value={item._id} key={`IonSelectOption-${index}-wetlandCategory-${item._id}`}>{item.name}</IonSelectOption>)
                                })
                                }
                            </IonSelect>
                        </IonItem>
                        <IonItem hidden={showIfStepIs(2)}>
                            <IonLabel position={'stacked'}>Ubicación del humedal:</IonLabel>
                            <IonSelect placeholder={"Ubicación del humedal:"} className={'alert-xl'} {...register("zona")} >
                                {
                                props.enums.zonas.map((item, index) => {
                                    return (<IonSelectOption value={item._id} key={`IonSelectOption-${index}-wetlandZones-${item._id}`}>{item.name}</IonSelectOption>)
                                })
                                }
                            </IonSelect>
                        </IonItem>
                        <IonItem hidden={showIfStepIs(2)}>
                            <IonLabel position={'stacked'}>Departamento en el que se encuentra:</IonLabel>
                            <IonSelect placeholder={"Ubicación del humedal:"} className={'alert-xl'} {...register("departamento")} >
                                {
                                props.enums.departamentos.map((item, index) => {
                                    return (<IonSelectOption value={item._id} key={`IonSelectOption-${index}-wetlandLocation-${item._id}`}>{item.name}</IonSelectOption>)
                                })
                                }
                            </IonSelect>
                        </IonItem>
                        <IonItem hidden={showIfStepIs(3)}>
                            <IonLabel position={'floating'} className={"ion-text-wrap"}>Título:</IonLabel>
                            <IonInput placeholder={"Ingrese un título."} {...register("titulo")} ></IonInput>
                        </IonItem>
                        <IonItem hidden={showIfStepIs(3)}>
                            <IonLabel position={'floating'} className={"ion-align-self-start"}>Descripción:</IonLabel>
                            <IonTextarea placeholder={"Ingrese los datos de su publicación."} {...register("descripcion")} minlength={200} maxlength={1000} spellCheck={true} ></IonTextarea>
                        </IonItem>
                        {/* <IonItem hidden={showIfStepIs(3)}>
                            <IonLabel position={'stacked'}>Palabras clave:</IonLabel>
                            <IonSelect placeholder={"Seleccione las que crea correspondientes:"} multiple className={'alert-xl'} {...register("keyword")} >
                                {
                                keywordsItems.map((item, index) => {
                                    return (<IonSelectOption value={item._id} key={`IonSelectOption-${index}-keyword-${keyword}`}>{keyword}</IonSelectOption>)
                                })
                                }
                            </IonSelect>
                        </IonItem> */}
                        <IonItem hidden={showIfStepIs(3)}>
                            <IonLabel position={'stacked'} style={{width: '100%', maxWidth: '100%'}}>Imagenes y/o documentos:</IonLabel>
                            <div style={{display: 'flex', width: '100%', padding: '10px'}}>
                                <input type="file" multiple accept={`${imgFiles}, ${docFiles}`} disabled={disableFilesUpload} onChange={(e) => uploadFiles(e?.target?.files)} style={{display: 'flex'}}/>
                            </div>
                        </IonItem>
                        { getOptionesByType() }
                        <IonText className={"ion-text-center"} hidden={showIfStepIs(LASTSTEP)}><h3>Esta a punto de completar la publicación</h3></IonText>
                        <IonItem  className={"ion-margin"} hidden={showIfStepIs(LASTSTEP)} lines={"none"}>
                            <IonText hidden={showIfStepIs(LASTSTEP)}>
                                <h5>Aún esta a tiempo de realizar las modificaciones que usted crea necesarias.</h5><br/>
                                <h5>Una vez completada la publicación, nuestro equipo verificará el contenido de la misma. 
                                    Si la revisión es finalizada de manera exitosa su publicación será añadida al mapa. 
                                    Ante inconvenientes o consultas, comunicarse al correo-e <a href={"mailto:fcyt_laboratorioibga@uader.edu.ar"} target={"_blank"}>fcyt_laboratorioibga@uader.edu.ar</a></h5><br/>
                            </IonText>
                        </IonItem>
                        <IonButton onClick={handleSubmit(onSubmit)} expand='block' hidden={showIfStepIs(LASTSTEP)} disabled={disableSubmit}>Completar!</IonButton> 
                    </form>
                </IonCol>
                <IonCol size={"1"}>
                    <IonButton fill={"outline"} onClick={() => nextStep()} hidden={step < LASTSTEP ? false : true}>
                        <IonIcon icon={"chevron-forward"}/>
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