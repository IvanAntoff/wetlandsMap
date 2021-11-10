interface infoboxAction {
    label: string,
    eventHandler: () => void
}
export interface marker {
    metadata?: {
        title: string,
        description?: string,
        visible?: boolean,
        actions?:infoboxAction[],
    },
    center:  bingMapPosition,
}

export interface infobox {
    center: bingMapPosition,
    title: string,
    description: string
}

export type bingMapPosition = { latitude: number, longitude: number, altitude?: number, altitudeReference?: number };

export type axiosResp = {
    data: any,
    status: number,
    statusText: string,
    headers: any,
    config: any,
    request: any
}

export interface post {
    id: string,
    status: 'pending' | 'refused' | 'approved',
    category: postCategory,
    data: {
        wetland?: optionalWetland, 
        threath?: optionalThreat,
        initiative?: optionalInitiative,
        art?: optionalsArt,
        investigation?: optionalInvestigation
    },
    content: {
        title: string,
        description: string,
        files: File[],
        genericData: {
            category: wetlandCategoryTypes,
            zone: wetlandZonesTypes,
            origin: wetlandOriginTypes,
            location: wetlanLocationType
        }
    },
    ubication: { latitude: string, longitude: string },
    keyword: string[]
}
export type postCategory = 'humedal' | 'amenazas' | 'iniciativas' | 'arte' | 'investigacion';
export type wetlandCategoryTypes = "Rio" | "Laguna natural" | "Laguna artifical" | "Cañada" | "Arroyo" | "Desconocido";
export type wetlandZonesTypes = "ZONA RURAL" | "ZONA PERIURBANA" | "ZONA URBANA" | "OTRO";
export type wetlandOriginTypes = "Natural" | "Artificial";
export type wetlanLocationType = "Colón" | "Concepcion Del Uruguay" | "Gualeguaychú";

// type typePollutant = "Actividad industrial" | "Actividad agrícola" | "Actividad ganadera" | "Alteración de márgenes del humedal" | "Emprendimiento inmobiliario" | "Asentamientos urbanos";

// Humedal o sitio de interes.
interface optionalWetland {
    outskirts: outskirtTypes,
    flora?: floraTypes,
    wildlife?: wildlifeTypes,
    history?: string,
    margins?: marginsTypes,
    color?: colorTypes,
    smell?: smellTypes,
    morfology?: morfologyTypes 
}
export type outskirtTypes = "Desconoce" | "Industrial" | "Residencial" | " Agropecuaria" | "De preservación / Reserva natural" | "Ecoturismo" | "Otra";
export type floraTypes = "Acuática" | "Terrestre" | "Mixta" | "No se observa";
export type wildlifeTypes = "Anfibios" | "Peces"| "Reptiles" | "Aves"| "Mamíferos"| "Insectos"| "Macroinvertebrados"| "Otra" | "No se observa"
export type colorTypes = "Ámbar" | "Marrón" | "Verde" | "Otro";
export type smellTypes = "Presencia" | "Ausencia";
export type marginsTypes = "Alterado " | "Inalterado" | "Otra";
export type morfologyTypes = "Barranca" | "Bosque" | "nativo" | "Pastizal" | "Cultivo" | "Mixta";

// Amenazas o impactos antropicos.
interface optionalThreat {
    threatType: threatType,
    origin: originTypes,
    source: sourceTypes,
    aspect?: {
        color?: colorTypes,
        smell?: smellTypes,
    },
    surface?: {
        matter?: hasType,
        matterDescrition?: string,
        foam?: hasType,
        seaweed?: hasType,
    },
    documentation?:{
        waterAnalysis?: booleanEnum,
        waterAnalysisType?: waterAnalysisType,
        waterAnalysisResults?: waterAnalysisResults,
        environmentalImpactReport?: booleanEnum,
        environmentalTechnicalReport?:booleanEnum,
        images?: booleanEnum 
    }
}
export type threatType = 'Orgánica' | 'Química'| 'Microbiológica '| 'Alteración de paisaje '| 'Alteración de márgenes de ribera '| 'Otra' | 'Desconocido';
export type originTypes = 'Natural' | 'Antropica' | 'Desconocido';
export type sourceTypes = 'Basural no controlado – A cielo abierto' | 'Relleno sanitario' | 'Actividad industrial ' | 'Actividad agrícola' | 'Actividad ganadera' | 'Alteración de márgenes del humedal ' | 'Emprendimiento inmobiliario' | 'Asentamientos urbanos ' | 'Desconocido' | 'Otra';
export type hasType = 'Presencia' | 'Ausencia' | 'Desconozco';
export type waterAnalysisType = 'Físico-químico'|'Microbiológico '|'Biológico'|'Bioensayos'|'Otra';
export type waterAnalysisResults = 'Calidad del agua buena' | 'Calidad del agua regular' | 'Calidad del agua mala' | 'Otra';
export type booleanEnum = 'Si' | 'No';
// Iniciativas sustentables.
interface optionalInitiative {
    initiativeType: initiativeTypeTypes,
    organizator?: organizatorTypes,
    initiativeParticipants?: participantsTypes,
    objetive: initiativeObjetiveTypes
}

export type initiativeTypeTypes = "Proyecto" | "Actividad/es" | "Ota" |"Desconocido";
export type organizatorTypes = "Vecinos" | "Organización" | "Municipio" | "Otro" | "Desconocido";
export type participantsTypes = 'Persona individual'| 'Vecinos'| 'Organización – Comisiones vecinales'| 'ONG'| 'Municipio'| 'Establecimiento educativo de nivel primario o secundario'| 'Institución universitaria'| 'Centro-Instituto de investigación'| 'Otro';
export type initiativeObjetiveTypes = "Mejorar" | "Preservar"  | "Restaurar" | "Puesta en valor" | "Otro" | "Desconocido";

// Expresiones artisticas.
interface optionalsArt {
    artType: artType
}

export type artType = "Producciones artísticas" | "Fotos" | "Audiovisuales" | "Redacciones" | "Documentos" | "Canciones" | "Poemas" | "Dibujos - Pinturas" | "Otra";

// Investigaciones.
interface optionalInvestigation {
    investigationParticipants: participantsTypes,
    state?: resultStateTypes,
    resultType?: resultTypeTypes,
    publications?: publicationsTypes
}

export type resultStateTypes =  "Pendiente" | "Activo" | "Finalizado";
export type resultTypeTypes = "Final" | "Parcial";
export type publicationsTypes = "No publicados" | "Revistas científicas" | "Congresos" | "Reuniones científicas" | "Otros";

//Others
export type genericFilter = {type: string, value: string};
export type keywords = 'Flora'| 'Fauna'| 'Algas'| 'Contaminación'| 'Residuos sólidos urbanos'| 'Efluentes cloacales'| 'Efluentes industriales'| 'Alteración del paisaje'| 'Calidad del agua'| 'Biodiversidad'| 'Educación ambiental'| 'Ecoturismo'| 'Actividad residencial'| 'Actividad industrial'| 'Actividad agrícola'| 'Actividad ganadera'| 'Emprendimiento inmobiliario'|  'Aves'| 'Paisaje'| 'Rural'| 'Periurbano'| 'Urbano'| 'Natural'| 'Artificial'| 'Laguna'| 'Río'| 'Arroyo'| 'Cañada'| 'Pantano'| 'Colón'| 'Concepción del Uruguay'| 'Gualeguaychú'| 'Basura'| 'Olor'| 'Color'| 'Ribera'| 'Nutrientes'| 'Pesca'| 'Recreación'| 'Cultivo'| 'Granjas'| 'Estudio de impacto ambiental'| 'Informe técnico ambiental'| 'Conservación'| 'Proyecto educativo'| 'Proyecto de investigación'| 'Reserva natural'| 'Anfibios'| 'Peces'| 'Reptiles'| 'Aves'| 'Mamíferos'| 'Insectos'| 'Macroinvertebrados'| 'Pastizal'| 'Bosque'| 'Barranca'| 'Análisis de agua'| 'Físico-químico'| 'Microbiológico'| 'Biológico'| 'Bioensayos'| 'Asentamientos'| 'Basural'| 'Relleno sanitario'| 'Materia orgánica'| 'Espumas'| 'Actividad sustentable'| 'Proyecto sustentable'| 'Feria de ciencias'| 'Congresos'| 'Jornadas ambientales'| 'Revistas científicas'| 'Contaminación orgánica'| 'Contaminación Química'| 'Contaminación microbiológica'| 'Contaminación antrópica' | 'Contaminación natural';