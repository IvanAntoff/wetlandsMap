import { IonButton, IonCol, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonProgressBar, IonRow, IonSelect, IonSelectOption, IonText, IonTextarea } from "@ionic/react";
import * as React from "react";
import { useState } from "react";
import { SubmitHandler, UnpackNestedValue, useForm } from "react-hook-form";
import { axiosResp, bingMapPosition, post, postCategory } from "../interfaces/interfaces";
import { artTypeArray, booleanEnumArray, colorArray, floraArray, hasArray, imgFiles, initiativeObjetiveArray, initiativeTypeArray, keywordsItems, marginsArray, morfologyArray, organizatorArray, originArray, outskirtArray, participantsArray, publicationsArray, resultStateArray, resultTypeArray, smellArray, sourceArray, waterAnalysisResultsArray, waterAnalysisTypeArray, wetlandCategoryArray, wetlandLocationArray, wetlandOriginArray, wetlandZonesArray, wildlifeArray } from "../enums/data";
import { POSTS_URL } from "../apiKeys";
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
    const FIRSTSTEP = 1;
    const LASTSTEP = 5;

    const onSubmit:SubmitHandler<post> = ((data: UnpackNestedValue<post>, event?: React.BaseSyntheticEvent) => {
        try {
            setDisableSubmit(true);
            let post:post = data;
            // if (post.content.files) {
            //     const auxFiles: string[] = [];
            //     for (let i = 0; i < post.content.files.length; i++) {
            //         const file = post.content.files[i];
            //         const fileStr = JSON.stringify(file);
            //         if (fileStr) auxFiles.push(fileStr);
            //     }
            //     post.content = {...post.content};
            // }
            post.status = "pending";
            post.ubication = {latitude: props.location.latitude.toString(), longitude: props.location.longitude.toString()};
            // console.log('post:',post, props.location)
            axios.post(`${POSTS_URL}/posts`, {
                ...post,
                status: "pending",
            })
            .then((response: axiosResp) => {
                // console.log('res:',response)
                if (response && response.status === 200) showSuccess('Elemento publicado con exito! Gracias por su ayuda.')
            })
            .catch((error: any) => {
                console.error(error);
                showError('Algo salio mal al realizar la publicacion, intentelo mas tarde.');
            });
        }
        catch(error){
            console.error(error)
            showError('Algo salio mal al realizar la publicacion, intentelo mas tarde.');
        }
    });

    const onSubmitError = (errors:any, e:any) => console.error(errors, e);

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
                    (typeof(getValues("content.genericData.origin") ) === 'undefined') 
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
            case 4:
                setStep(step+1);
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
                    <IonLabel position={'floating'}>Actividades desarrolladas en zonas aledañas:</IonLabel>
                    <IonSelect placeholder={""} className={'alert-xl'} {...register("data.outskirts")} >
                        {
                        outskirtArray.map((outskirt, index) => {
                            return (<IonSelectOption value={outskirt} key={`IonSelectOption-${index}-outskirt-${outskirt}`}>{outskirt}</IonSelectOption>)
                        })
                        }
                    </IonSelect>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'}>Aspecto del agua:</IonLabel>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'}>Color del agua:</IonLabel>
                    <IonSelect placeholder={"Indique el color observado."} className={'alert-xl'} {...register("data.color")} >
                        {
                        colorArray.map((colorArray, index) => {
                            return (<IonSelectOption value={colorArray} key={`IonSelectOption-${index}-colorArray-${colorArray}`}>{colorArray}</IonSelectOption>)
                        })
                        }
                    </IonSelect>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'}>Presencia de olor en el agua:</IonLabel>
                    <IonSelect placeholder={"Indique si noto la presencia de olor en el agua."} className={'alert-xl'} {...register("data.smell")} >
                        {
                        smellArray.map((smell, index) => {
                            return (<IonSelectOption value={smell} key={`IonSelectOption-${index}-smell-${smell}`}>{smell}</IonSelectOption>)
                        })
                        }
                    </IonSelect>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'}>Presencia de flora:</IonLabel>
                    <IonSelect placeholder={"Indique la flora observada."} multiple className={'alert-xl'} {...register("data.flora")} >
                        {
                        floraArray.map((flora, index) => {
                            return (<IonSelectOption value={flora} key={`IonSelectOption-${index}-flora-${flora}`}>{flora}</IonSelectOption>)
                        })
                        }
                    </IonSelect>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'}>Presencia de fauna:</IonLabel>
                    <IonSelect placeholder={"Indique la fauna observada."} multiple className={'alert-xl'} {...register("data.wildlife")} >
                        {
                        wildlifeArray.map((wildlife, index) => {
                            return (<IonSelectOption value={wildlife} key={`IonSelectOption-${index}-wildlife-${wildlife}`}>{wildlife}</IonSelectOption>)
                        })
                        }
                    </IonSelect>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'}>Estado de márgenes de ribera:</IonLabel>
                    <IonSelect placeholder={"Indique el estado observado en los margenes de ribera."} className={'alert-xl'} {...register("data.margins")} >
                        {
                        marginsArray.map((margins, index) => {
                            return (<IonSelectOption value={margins} key={`IonSelectOption-${index}-margins-${margins}`}>{margins}</IonSelectOption>)
                        })
                        }
                    </IonSelect>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'}>Morfología de la costa:</IonLabel>
                    <IonSelect placeholder={"Indique el estado observado en los margenes de ribera."} className={'alert-xl'} {...register("data.morfology")} >
                        {
                        morfologyArray.map((morfology, index) => {
                            return (<IonSelectOption value={morfology} key={`IonSelectOption-${index}-morfology-${morfology}`}>{morfology}</IonSelectOption>)
                        })
                        }
                    </IonSelect>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'}>Historia:</IonLabel>
                    <IonTextarea placeholder={"Relate, de conocerse, la historia del sitio."} {...register("data.history")} ></IonTextarea>
                </IonItem>
            </>
        )
    }

    const optionalsThreath = () => {
        return (
            <>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'}>Tipo de origen de la amenaza/impacto ambiental:</IonLabel>
                    <IonSelect placeholder={"De conocerla, indique el origen de la amenaza."} className={'alert-xl'} {...register("data.origin")} >
                        {
                        originArray.map((origin, index) => {
                            return (<IonSelectOption value={origin} key={`IonSelectOption-${index}-origin-${origin}`}>{origin}</IonSelectOption>)
                        })
                        }
                    </IonSelect>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'}>Fuente de generación:</IonLabel>
                    <IonSelect placeholder={"Indique que genera la contaminacion/amenaza."} className={'alert-xl'} {...register("data.source")} >
                        {
                        sourceArray.map((source, index) => {
                            return (<IonSelectOption value={source} key={`IonSelectOption-${index}-source-${source}`}>{source}</IonSelectOption>)
                        })
                        }
                    </IonSelect>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'}>Aspectos alterados en la calidad del agua:</IonLabel>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'}>Olor:</IonLabel>
                    <IonSelect placeholder={"Indique si noto presencia de olor/es."} className={'alert-xl'} {...register("data.aspect.smell")} >
                        {
                        smellArray.map((smell, index) => {
                            return (<IonSelectOption value={smell} key={`IonSelectOption-${index}-smell-${smell}`}>{smell}</IonSelectOption>)
                        })
                        }
                    </IonSelect>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'}>Color :</IonLabel>
                    <IonSelect placeholder={"Indique el color del agua."} className={'alert-xl'} {...register("data.aspect.color")} >
                        {
                        colorArray.map((color, index) => {
                            return (<IonSelectOption value={color} key={`IonSelectOption-${index}-color-${color}`}>{color}</IonSelectOption>)
                        })
                        }
                    </IonSelect>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'}>Presencia de elementos flotantes:</IonLabel>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'}>Materia orgánica en la superficie:</IonLabel>
                    <IonSelect placeholder={"Indique si notó materia flotando."} className={'alert-xl'} {...register("data.surface.matter")} >
                        {
                        hasArray.map((has, index) => {
                            return (<IonSelectOption value={has} key={`IonSelectOption-${index}-has-${has}`}>{has}</IonSelectOption>)
                        })
                        }
                    </IonSelect>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'}>Describa la materia flotante presenciada:</IonLabel>
                    <IonTextarea placeholder={"Describa, si corresponde, lo presenciado."} {...register("data.surface.matterDescrition")} minlength={200} maxlength={1000} spellCheck={true} ></IonTextarea>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'}>Espumas en la superficie:</IonLabel>
                    <IonSelect placeholder={"Indique si notó espuma flotando."} className={'alert-xl'} {...register("data.surface.foam")} >
                        {
                        hasArray.map((has, index) => {
                            return (<IonSelectOption value={has} key={`IonSelectOption-${index}-foam-${has}`}>{has}</IonSelectOption>)
                        })
                        }
                    </IonSelect>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'}>Algas en la superficie:</IonLabel>
                    <IonSelect placeholder={"Indique si notó algas flotando."} className={'alert-xl'} {...register("data.surface.seaweed")} >
                        {
                        hasArray.map((has, index) => {
                            return (<IonSelectOption value={has} key={`IonSelectOption-${index}-algas-${has}`}>{has}</IonSelectOption>)
                        })
                        }
                    </IonSelect>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'}>Documentación que acredite amenaza/impacto ambiental:</IonLabel>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'}>Análisis de muestras de agua:</IonLabel>
                    <IonSelect placeholder={"Existen análisis de muestras de agua."} className={'alert-xl'} {...register("data.documentation.waterAnalysis")} >
                        {
                        booleanEnumArray.map((Enum, index) => {
                            return (<IonSelectOption value={Enum} key={`IonSelectOption-${index}-analysis-${Enum}`}>{Enum}</IonSelectOption>)
                        })
                        }
                    </IonSelect>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'}>Tipo de análisis:</IonLabel>
                    <IonSelect placeholder={"Existen análisis de muestras de agua."} className={'alert-xl'} {...register("data.documentation.waterAnalysisType")} >
                        {
                        waterAnalysisTypeArray.map((waterAnalysisRes, index) => {
                            return (<IonSelectOption value={waterAnalysisRes} key={`IonSelectOption-${waterAnalysisRes}-waterAnalysisType-${index}`}>{waterAnalysisRes}</IonSelectOption>)
                        })
                        }
                    </IonSelect>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'}>Resultados de los estudios:</IonLabel>
                    <IonSelect placeholder={"Conoce los resultados de los estudios?."} className={'alert-xl'} {...register("data.documentation.waterAnalysisResults")} >
                        {
                        waterAnalysisResultsArray.map((waterAnalysisResults, index) => {
                            return (<IonSelectOption value={waterAnalysisResults} key={`IonSelectOption-${waterAnalysisResults}-waterAnalysisResults-${index}`}>{waterAnalysisResults}</IonSelectOption>)
                        })
                        }
                    </IonSelect>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'}>Estudios de impacto ambiental:</IonLabel>
                    <IonSelect placeholder={"Existen estudios sobre el impacto ambieltal?."} className={'alert-xl'} {...register("data.documentation.environmentalImpactReport")} >
                        {
                        booleanEnumArray.map((environmentalImpactReport, index) => {
                            return (<IonSelectOption value={environmentalImpactReport} key={`IonSelectOption-${environmentalImpactReport}-environmentalImpactReport-${index}`}>{environmentalImpactReport}</IonSelectOption>)
                        })
                        }
                    </IonSelect>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'}>Informe técnico ambiental:</IonLabel>
                    <IonSelect placeholder={"Existen informes técnicos ambientales?."} className={'alert-xl'} {...register("data.documentation.environmentalTechnicalReport")} >
                        {
                        booleanEnumArray.map((environmentalTechnicalReport, index) => {
                            return (<IonSelectOption value={environmentalTechnicalReport} key={`IonSelectOption-${environmentalTechnicalReport}-environmentalTechnicalReport-${index}`}>{environmentalTechnicalReport}</IonSelectOption>)
                        })
                        }
                    </IonSelect>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'}>Adjunta imágenes/videos:</IonLabel>
                    <IonSelect placeholder={""} className={'alert-xl'} {...register("data.documentation.images")} >
                        {
                        booleanEnumArray.map((images, index) => {
                            return (<IonSelectOption value={images} key={`IonSelectOption-${images}-images-${index}`}>{images}</IonSelectOption>)
                        })
                        }
                    </IonSelect>
                </IonItem>
            </>
        )
    }

    const optionalsInitiative = () => {
        return (
            <>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'}>Tipo de iniciativa sustentable:</IonLabel>
                    <IonSelect placeholder={""} className={'alert-xl'} {...register("data.initiativeType")} >
                        {
                        initiativeTypeArray.map((initiativeType, index) => {
                            return (<IonSelectOption value={initiativeType} key={`IonSelectOption-${initiativeType}-initiativeType-${index}`}>{initiativeType}</IonSelectOption>)
                        })
                        }
                    </IonSelect>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'}>Organizador/es de la iniciativa sustentable:</IonLabel>
                    <IonSelect placeholder={""} className={'alert-xl'} {...register("data.organizator")} >
                        {
                        organizatorArray.map((organizator, index) => {
                            return (<IonSelectOption value={organizator} key={`IonSelectOption-${organizator}-organizator-${index}`}>{organizator}</IonSelectOption>)
                        })
                        }
                    </IonSelect>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'}>Participantes de la iniciativa sustentable:</IonLabel>
                    <IonSelect placeholder={""} className={'alert-xl'} {...register("data.initiativeParticipants")} >
                        {
                        participantsArray.map((participants, index) => {
                            return (<IonSelectOption value={participants} key={`IonSelectOption-${participants}-participants-${index}`}>{participants}</IonSelectOption>)
                        })
                        }
                    </IonSelect>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'}>Objetivo de la iniciativa sustentable:</IonLabel>
                    <IonSelect placeholder={""} className={'alert-xl'} {...register("data.objetive")} >
                        {
                        initiativeObjetiveArray.map((objetive, index) => {
                            return (<IonSelectOption value={objetive} key={`IonSelectOption-${objetive}-objetive-${index}`}>{objetive}</IonSelectOption>)
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
                    <IonLabel position={'floating'}>Tipo de expresión artística:</IonLabel>
                    <IonSelect placeholder={""} className={'alert-xl'} {...register("data.artType")} >
                        {
                        artTypeArray.map((artType, index) => {
                            return (<IonSelectOption value={artType} key={`IonSelectOption-${artType}-artType-${index}`}>{artType}</IonSelectOption>)
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
                    <IonLabel position={'floating'}>Instituciones participantes del proyecto de investigación:</IonLabel>
                    <IonSelect placeholder={""} className={'alert-xl'} {...register("data.investigationParticipants")} >
                        {
                        participantsArray.map((investigationParticipants, index) => {
                            return (<IonSelectOption value={investigationParticipants} key={`IonSelectOption-${investigationParticipants}-investigationParticipants-${index}`}>{investigationParticipants}</IonSelectOption>)
                        })
                        }
                    </IonSelect>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'}>Estado actual del proyecto de investigación:</IonLabel>
                    <IonSelect placeholder={""} className={'alert-xl'} {...register("data.state")} >
                        {
                        resultStateArray.map((state, index) => {
                            return (<IonSelectOption value={state} key={`IonSelectOption-${state}-state-${index}`}>{state}</IonSelectOption>)
                        })
                        }
                    </IonSelect>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'}>Tipo de resultados obtenidos:</IonLabel>
                    <IonSelect placeholder={""} className={'alert-xl'} {...register("data.resultType")} >
                        {
                        resultTypeArray.map((resultType, index) => {
                            return (<IonSelectOption value={resultType} key={`IonSelectOption-${resultType}-resultType-${index}`}>{resultType}</IonSelectOption>)
                        })
                        }
                    </IonSelect>
                </IonItem>
                <IonItem hidden={showIfStepIs(4)}>
                    <IonLabel position={'floating'}>Estado de publicación/comunicación de resultados obtenidos:</IonLabel>
                    <IonSelect placeholder={""} className={'alert-xl'} {...register("data.publications")} >
                        {
                        publicationsArray.map((publications, index) => {
                            return (<IonSelectOption value={publications} key={`IonSelectOption-${publications}-publications-${index}`}>{publications}</IonSelectOption>)
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
        <IonGrid style={{width: '100%'}} className={'scroll'}>
            <IonRow className={"ion-align-items-center ion-justify-content-evenly"} style={{height: '100%'}}>
                <IonCol size={"1"}>
                    <IonButton fill={"outline"} onClick={() => backStep()} hidden={step > FIRSTSTEP ? false : true}>
                        <IonIcon name={"chevron-back"}/>
                    </IonButton>        
                </IonCol>
                <IonCol size={"8"} className={"ion-nowrap nowarp"}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/*  Paso 1: Seleccionar categoria/tipo de post a cargar */}
                        {/* Categorias */}
                        <IonItem hidden={showIfStepIs(1)}>
                            <IonText><h1>Seleccione el tipo de publicacion a cargar</h1></IonText>
                            <IonLabel position={'stacked'}>Categoria:</IonLabel>
                            <IonSelect placeholder={"Tipo de publicacion"} className={'alert-xl'} {...register("category")} >
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
                            <IonLabel position={'stacked'}>Tipo de humedal:</IonLabel>
                            <IonSelect placeholder={"Tipo de humedal:"} className={'alert-xl'} {...register("content.genericData.origin")} >
                                {
                                wetlandOriginArray.map((type, index) => {
                                    return (<IonSelectOption value={type} key={`IonSelectOption-${index}-wetlandTypes-${type}`}>{type}</IonSelectOption>)
                                })
                                }
                            </IonSelect>
                        </IonItem>
                        <IonItem hidden={showIfStepIs(2)}>
                            <IonLabel position={'stacked'}>Categoría del humedal:</IonLabel>
                            <IonSelect placeholder={"Categoría del humedal:"} className={'alert-xl'} {...register("content.genericData.category")} >
                                {
                                wetlandCategoryArray.map((wetlandCategoryArray, index) => {
                                    return (<IonSelectOption value={wetlandCategoryArray} key={`IonSelectOption-${index}-wetlandCategoryArray-${wetlandCategoryArray}`}>{wetlandCategoryArray}</IonSelectOption>)
                                })
                                }
                            </IonSelect>
                        </IonItem>
                        <IonItem hidden={showIfStepIs(2)}>
                            <IonLabel position={'stacked'}>Ubicación del humedal:</IonLabel>
                            <IonSelect placeholder={"Ubicación del humedal:"} className={'alert-xl'} {...register("content.genericData.zone")} >
                                {
                                wetlandZonesArray.map((zone, index) => {
                                    return (<IonSelectOption value={zone} key={`IonSelectOption-${index}-wetlandZones-${zone}`}>{zone}</IonSelectOption>)
                                })
                                }
                            </IonSelect>
                        </IonItem>
                        <IonItem hidden={showIfStepIs(2)}>
                            <IonLabel position={'stacked'}>Departamento en el que se encuentra:</IonLabel>
                            <IonSelect placeholder={"Ubicación del humedal:"} className={'alert-xl'} {...register("content.genericData.location")} >
                                {
                                wetlandLocationArray.map((location, index) => {
                                    return (<IonSelectOption value={location} key={`IonSelectOption-${index}-wetlandLocation-${location}`}>{location}</IonSelectOption>)
                                })
                                }
                            </IonSelect>
                        </IonItem>
                        <IonItem hidden={showIfStepIs(3)}>
                            <IonLabel position={'floating'}>Titulo:</IonLabel>
                            <IonInput placeholder={"Ingrese un titulo."} {...register("content.title")} ></IonInput>
                        </IonItem>
                        <IonItem hidden={showIfStepIs(3)}>
                            <IonLabel position={'floating'} className={"ion-align-self-start"}>Descripcion:</IonLabel>
                            <IonTextarea placeholder={"Ingrese los datos de su publicacion."} {...register("content.description")} minlength={200} maxlength={1000} spellCheck={true} ></IonTextarea>
                        </IonItem>
                        <IonItem hidden={showIfStepIs(3)}>
                            <IonLabel position={'stacked'}>Palabras clave:</IonLabel>
                            <IonSelect placeholder={"Seleccione las que crea correspondientes:"} multiple className={'alert-xl'} {...register("keyword")} >
                                {
                                keywordsItems.map((keyword, index) => {
                                    return (<IonSelectOption value={keyword} key={`IonSelectOption-${index}-keyword-${keyword}`}>{keyword}</IonSelectOption>)
                                })
                                }
                            </IonSelect>
                        </IonItem>
                        <IonItem hidden={showIfStepIs(3)}>
                            <IonLabel position={'stacked'} style={{width: '100%', maxWidth: '100%'}}>Imagenes/fotos:</IonLabel>
                            <div style={{display: 'flex', width: '100%', padding: '10px'}}>
                                <input type="file" multiple accept={`${imgFiles}`} {...register("content.files")}  style={{display: 'flex'}}/>
                            </div>
                        </IonItem>
                        { getOptionesByType() }
                        <IonText className={"ion-text-center"} hidden={showIfStepIs(LASTSTEP)}><h3>Esta a punto de completar la publicacion</h3></IonText>
                        <IonItem  className={"ion-margin"} hidden={showIfStepIs(LASTSTEP)} lines={"none"}>
                            <IonText hidden={showIfStepIs(LASTSTEP)}>
                                <h5>Aun esta a tiempo de realizar las modificaciones que usted crea necesarias.</h5><br/>
                                <h5>Una vez completada la publicación, nuestro equipo verificará el contenido de la misma. 
                                    Si la revisión es finalizada de manera exitosa su publicación será añadida al mapa. 
                                    Ante inconvenientes o consultas, comunicarse al correo-e <a href={"mailto:fcyt_laboratorioibga@uader.edu.ar"} target={"_blank"}>fcyt_laboratorioibga@uader.edu.ar</a></h5><br/>
                            </IonText>
                        </IonItem>
                        <IonButton type="submit" onClick={() => onSubmit(getValues())} expand='block' hidden={showIfStepIs(LASTSTEP)} disabled={disableSubmit}>Completar!</IonButton> 
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