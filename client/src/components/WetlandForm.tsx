import { IonButton, IonCol, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonProgressBar, IonRow, IonSelect, IonSelectOption, IonText, IonTextarea } from "@ionic/react";
import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { analysis, aspectTypes, axiosResp, bingMapPosition, flora, initiativeType, investigationResult, invetigationState, margins, objetive, organizator, outskirtType, post, postCategory, typeArt, typeInstitute, typePollutant, wetlandCategories, wetlandLocation, wetlandTypes, wetlandZones } from "../interfaces/interfaces";
import { POSTS_URL } from '../axiosDirs';
const axios = require('axios');

interface wetlandFormProps{
    categories: {name: string, value: postCategory}[],
    location: bingMapPosition,
}

export const WetlandForm: React.FC<wetlandFormProps> = (props) => {
    const [ step, setStep ] = useState<number>(1);
    const [ showErrorMessage, setShowErrorMessage ] = useState<boolean>(false);
    const [ errorMessage, setErrorMessage ] = useState<string>('Error desconocido.');
    const [ errorMessageColor, setErrorMessageColor ] = useState<string>('warning');
    const [ disableSubmit, setDisableSubmit ] = useState<boolean>(false);
    const { register, getValues ,handleSubmit } = useForm<post>();
    const onSubmit = handleSubmit(data => {
        setDisableSubmit(true);
        let post:post = data;
        post.status = "pending";
        post.ubication = {latitude: props.location.latitude.toString(), longitude: props.location.longitude.toString()};
        console.log(post, props.location)
        axios.post(`${POSTS_URL}/posts`, {
            "status": "pending",
            "category": post.category,
            "subcategory": [],
            "ubication": post.ubication,
            "keyword": [],
            "content": post.content
        })
        .then((response: axiosResp) => {
            console.log('res:',response)
            if (response && response.status === 200) showSuccess('Elemento publicado con exito! Gracias por su ayuda.')
        })
        .catch((error: any) => {
            console.error(error);
            showError('Algo salio mal al realizar la publicacion, intentelo mas tarde.');
        });
    });
    const FIRSTSTEP = 1;
    const LASTSTEP = 5;

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
                if (typeof(getValues("category")) === 'undefined') return showError('Debe seleccionar una categoria.');
                if (!props.location || !props.location.latitude || !props.location.longitude) return showError('Error al confirmar la ubicacion seleccionada, repita el proceso.');
                setStep(step+1);
            break;
            case 2:
                if ( 
                    (typeof(getValues("content.genericData.category") ) === 'undefined') ||
                    (typeof(getValues("content.genericData.zone") ) === 'undefined') ||
                    (typeof(getValues("content.genericData.location") ) === 'undefined') ||
                    (typeof(getValues("content.genericData.type") ) === 'undefined') 
                ) return showError('Debe completar todos los campos.');
                setStep(step+1);
            break;
            case 3:
                if ( 
                    (typeof(getValues("content.title") ) !== 'undefined') &&
                    (getValues("content.title") !== "") &&
                    (typeof(getValues("content.description") ) !== 'undefined') &&
                    (getValues("content.description") !== "")
                ) setStep(step+1);
                else showError('Debe completar todos los campos.');
            break;
        }
    }

    const getTitle = () => {
        let title = '';
        switch (step) {
            case 1:
                title = `Paso ${step}: Tipo de publicación.`
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
                title = `¡Ultimo paso!`
            break;
        }
        return title;
    }

    const optionalsWetland = () => {
        return (
            <>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'}>Color observado:</IonLabel>
                    <IonInput placeholder={"Ingrese un color"} {...register("subcategory.wetland.color")} ></IonInput>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'}>Olor:</IonLabel>
                    <IonInput placeholder={"Ingrese olor"} {...register("subcategory.wetland.smell")} ></IonInput>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'}>Flora:</IonLabel>
                    <IonSelect placeholder={"Tipo de humedal:"} className={'alert-xl'} {...register("subcategory.wetland.flora")} >
                        {
                        flora.map((flora, index) => {
                            return (<IonSelectOption value={flora} key={`IonSelectOption-${index}-flora-${flora}`}>{flora}</IonSelectOption>)
                        })
                        }
                    </IonSelect>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'}>Estado del margenes:</IonLabel>
                    <IonSelect placeholder={"Estado del margen:"} className={'alert-xl'} {...register("subcategory.wetland.margins")} >
                        {
                        margins.map((margin, index) => {
                            return (<IonSelectOption value={margin} key={`IonSelectOption-${index}-margin-${margin}`}>{margin}</IonSelectOption>)
                        })
                        }
                    </IonSelect>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'}>Uso de las zonas aledañas:</IonLabel>
                    <IonSelect placeholder={"zonas aledañas:"} className={'alert-xl'} {...register("subcategory.wetland.outskirts")} >
                        {
                        outskirtType.map((type, index) => {
                            return (<IonSelectOption value={type} key={`IonSelectOption-${index}-outskirtType-${type}`}>{type}</IonSelectOption>)
                        })
                        }
                    </IonSelect>
                </IonItem>
            </>
        )
    }

    const optionalsThreath = () => {
        return (
            <>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'}>Contaminantes observados:</IonLabel>
                    <IonSelect multiple placeholder={"Seleccione el/los necesarios:"} className={'alert-xl'} {...register("subcategory.threath.pollutants")} >
                        {
                        typePollutant.map((pollutant, index) => {
                            return (<IonSelectOption value={pollutant} key={`IonSelectOption-${index}-typePollutant-${pollutant}`}>{pollutant}</IonSelectOption>)
                        })
                        }
                    </IonSelect>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'}>Tipo de análisis realizado:</IonLabel>
                    <IonSelect placeholder={"Tipo de análisis:"} className={'alert-xl'} {...register("subcategory.threath.analysis.type")} >
                        {
                        analysis.type.map((type, index) => {
                            return (<IonSelectOption value={type} key={`IonSelectOption-${index}-analisys-${type}`}>{type}</IonSelectOption>)
                        })
                        }
                    </IonSelect>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'}>Resultado del análisis:</IonLabel>
                    <IonSelect placeholder={"Resultado del análisis:"} className={'alert-xl'} {...register("subcategory.threath.analysis.results")} >
                        {
                        analysis.results.map((res, index) => {
                            return (<IonSelectOption value={res} key={`IonSelectOption-${index}-analisysRes-${res}`}>{res}</IonSelectOption>)
                        })
                        }
                    </IonSelect>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'}>Aspectos alterados del agua:</IonLabel>
                    <IonSelect placeholder={"Seleccione el/los necesarios:"} multiple className={'alert-xl'} {...register("subcategory.threath.aspect.type")} >
                        {
                        aspectTypes.map((type, index) => {
                            return (<IonSelectOption value={type} key={`IonSelectOption-${index}-aspectTypes-${type}`}>{type}</IonSelectOption>)
                        })
                        }
                    </IonSelect>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'} className={"ion-align-self-start"}>Describa lo seleccionado:</IonLabel>
                    <IonTextarea placeholder={"Describa, si corresponde, los aspectos alterados seleccionados."} {...register("subcategory.threath.aspect.description")} ></IonTextarea>
                </IonItem>
            </>
        )
    }

    const optionalsInitiative = () => {
        return (
            <>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'}>Tipo de iniciativa:</IonLabel>
                    <IonSelect placeholder={"Seleccione una iniciativa:"} className={'alert-xl'} {...register("subcategory.initiative.type")} >
                        {
                        initiativeType.map((type, index) => {
                            return (<IonSelectOption value={type} key={`IonSelectOption-${index}-initiaveType-${type}`}>{type}</IonSelectOption>)
                        })
                        }
                    </IonSelect>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'}>Organizador:</IonLabel>
                    <IonSelect placeholder={"Tipo de análisis:"} className={'alert-xl'} {...register("subcategory.initiative.organizator")} >
                        {
                        organizator.map((org, index) => {
                            return (<IonSelectOption value={org} key={`IonSelectOption-${index}-organizator-${org}`}>{org}</IonSelectOption>)
                        })
                        }
                    </IonSelect>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'}>Objetivo:</IonLabel>
                    <IonSelect placeholder={"Seleccione el objetivo:"} className={'alert-xl'} {...register("subcategory.initiative.objetive")} >
                        {
                        objetive.map((objetive, index) => {
                            return (<IonSelectOption value={objetive} key={`IonSelectOption-${index}-objetive-${objetive}`}>{objetive}</IonSelectOption>)
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
                    <IonLabel position={'floating'}>Tipo de expresion artistica:</IonLabel>
                    <IonSelect placeholder={"Seleccione una iniciativa:"} className={'alert-xl'} {...register("subcategory.initiative.type")} >
                        {
                        typeArt.map((type, index) => {
                            return (<IonSelectOption value={type} key={`IonSelectOption-${index}-artType-${type}`}>{type}</IonSelectOption>)
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
                    <IonLabel position={'floating'}>Tipo de Institución:</IonLabel>
                    <IonSelect placeholder={"Seleccione la institucion a cargo:"} className={'alert-xl'} {...register("subcategory.investigation.institute")} >
                        {
                        typeInstitute.map((type, index) => {
                            return (<IonSelectOption value={type} key={`IonSelectOption-${index}-typeInstitute-${type}`}>{type}</IonSelectOption>)
                        })
                        }
                    </IonSelect>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'}>Estado de la investigación:</IonLabel>
                    <IonSelect placeholder={"Seleccione la institucion a cargo:"} className={'alert-xl'} {...register("subcategory.investigation.state")} >
                        {
                        invetigationState.map((state, index) => {
                            return (<IonSelectOption value={state} key={`IonSelectOption-${index}-invetigationState-${state}`}>{state}</IonSelectOption>)
                        })
                        }
                    </IonSelect>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'}>Resultados:</IonLabel>
                    <IonSelect placeholder={"Seleccione un tipo :"} className={'alert-xl'} {...register("subcategory.investigation.state")} >
                        {
                        investigationResult.type.map((type, index) => {
                            return (<IonSelectOption value={type} key={`IonSelectOption-${index}-investigationResult-${type}`}>{type}</IonSelectOption>)
                        })
                        }
                    </IonSelect>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'}>Publicaciones de los resultados:</IonLabel>
                    <IonSelect multiple placeholder={"Seleccione el/los necesarios:"} className={'alert-xl'} {...register("subcategory.investigation.state")} >
                        {
                        investigationResult.publish.map((type, index) => {
                            return (<IonSelectOption value={type} key={`IonSelectOption-${index}-publish-${type}`}>{type}</IonSelectOption>)
                        })
                        }
                    </IonSelect>
                </IonItem>
            </>
        )
    }

    const getOptionesByType = () => {
        const category = getValues("category")
        switch (category) {
            case 'humedal': 
                return optionalsWetland();
            case 'amenazas':
                return optionalsThreath();
            case "iniciativas":
                return optionalsInitiative();
            case "arte":
                return optionalsArt();
            case "investigacion":
                return optionalsInvestigation();
            default: return null;
        }
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
                        <IonItem hidden={showIfStepIs(2)}>
                            <IonLabel position={'floating'}>Tipo de humedal:</IonLabel>
                            <IonSelect placeholder={"Tipo de humedal:"} className={'alert-xl'} {...register("content.genericData.type")} >
                                {
                                wetlandTypes.map((type, index) => {
                                    return (<IonSelectOption value={type} key={`IonSelectOption-${index}-wetlandTypes-${type}`}>{type}</IonSelectOption>)
                                })
                                }
                            </IonSelect>
                        </IonItem>
                        <IonItem hidden={showIfStepIs(2)}>
                            <IonLabel position={'floating'}>Categoría del humedal:</IonLabel>
                            <IonSelect placeholder={"Categoría del humedal:"} className={'alert-xl'} {...register("content.genericData.category")} >
                                {
                                wetlandCategories.map((Categorie, index) => {
                                    return (<IonSelectOption value={Categorie} key={`IonSelectOption-${index}-wetlandCategories-${Categorie}`}>{Categorie}</IonSelectOption>)
                                })
                                }
                            </IonSelect>
                        </IonItem>
                        <IonItem hidden={showIfStepIs(2)}>
                            <IonLabel position={'floating'}>Ubicación del humedal:</IonLabel>
                            <IonSelect placeholder={"Ubicación del humedal:"} className={'alert-xl'} {...register("content.genericData.zone")} >
                                {
                                wetlandZones.map((zone, index) => {
                                    return (<IonSelectOption value={zone} key={`IonSelectOption-${index}-wetlandZones-${zone}`}>{zone}</IonSelectOption>)
                                })
                                }
                            </IonSelect>
                        </IonItem>
                        <IonItem hidden={showIfStepIs(2)}>
                            <IonLabel position={'floating'}>Departamento en el que se encuentra:</IonLabel>
                            <IonSelect placeholder={"Ubicación del humedal:"} className={'alert-xl'} {...register("content.genericData.location")} >
                                {
                                wetlandLocation.map((location, index) => {
                                    return (<IonSelectOption value={location} key={`IonSelectOption-${index}-wetlandLocation-${location}`}>{location}</IonSelectOption>)
                                })
                                }
                            </IonSelect>
                        </IonItem>
                        <IonItem hidden={showIfStepIs(3)}>
                            <IonLabel position={'floating'}>Titulo:</IonLabel>
                            <IonInput placeholder={"Ingrese un titulo."} required {...register("content.title", { required: 'El titulo es requerido' } )} ></IonInput>
                        </IonItem>
                        <IonItem hidden={showIfStepIs(3)}>
                            <IonLabel position={'floating'} className={"ion-align-self-start"}>Descripcion:</IonLabel>
                            <IonTextarea placeholder={"Ingrese los datos de su publicacion."} required {...register("content.description", { required: true })} ></IonTextarea>
                        </IonItem>
                        { getOptionesByType() }
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