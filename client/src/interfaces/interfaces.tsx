
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
    // `data` is the response that was provided by the server
    data: any,
    // `status` is the HTTP status code from the server response
    status: number,
    // `statusText` is the HTTP status message from the server response - EX: 'OK'
    statusText: string,
    // `headers` the HTTP headers that the server responded with
    // All header names are lower cased and can be accessed using the bracket notation.
    // Example: `response.headers['content-type']`
    headers: any,
    // `config` is the config that was provided to `axios` for the request
    config: any,
    // `request` is the request that generated this response
    // It is the last ClientRequest instance in node.js (in redirects)
    // and an XMLHttpRequest instance in the browser
    request: any
}

export type postCategory = 'humedal' | 'amenazas' | 'iniciativas' | 'arte' | 'investigacion';

export interface post {
    id: string,
    status: 'pending' | 'refused' | 'approved',
    category: postCategory,
    data: optionalWetland | optionalThreat | optionalInitiative | optionalsArt | optionalInvestigation,
    content: {
        title: string,
        description: string,
        files: File[],
        genericData: {
            zone: "ZONA RURAL" | "ZONA PERIURBANA" | "ZONA URBANA" | "OTRO ",
            type: "Natural" | "Artificial",
            category: typeWetland,
            location: "Colón" | "Concepcion Del Uruguay" | "Gualeguaychú"
        }
    },
    ubication: { latitude: string, longitude: string },
    keyword: string[]
}

type typeWetland = "Rio" | "Laguna natural" | "Laguna artifical" | "Cañada" | "Arroyo" | "Desconocido";
type typeOutskirt = "Industrial" | "Residencial" | " Agropecuaria" | "De preservación / Reserva natural" | "Ecoturismo" | "Otra";
type typePollutant = "Actividad industrial" | "Actividad agrícola" | "Actividad ganadera" | "Alteración de márgenes del humedal" | "Emprendimiento inmobiliario" | "Asentamientos urbanos";
type typeArt = "Producciones artísticas" | "Fotos" | "Audiovisuales" | "Redacciones" | "Documentos";
type typeInstitute = "Escolar" | "Universitario" | "Laboratorio" | "Instituciones de Investigación" | "Privado" | "ONG" | "Otro";

interface optionalWetland {
    color?: "Ámbar" | "Marrón" | "Verde" | "Otro",
    smell?: "Presencia" | "Ausencia",
    outskirts?: typeOutskirt,
    flora?: "Acuática" | "Terrestre" | "Mixta" | "No se observa",
    wildlife?: "Anfibios" | "Peces"| "Reptiles" | "Aves"| "Mamíferos"| "Insectos"| "Macroinvertebrados"| "Otra",
    history?: string,
    margins?: "Alterado " | "Inalterado" | "Otra",
    morfology: "Barranca" | "Bosque" | "nativo" | "Pastizal" | "Cultivo" | "Mixta"
}
interface optionalThreat {
    anthropics?: string,
    pollutants?: string,
}

interface optionalInitiative {
    type:  "Proyecto" | "Actividad/es" | "Desconocido",
    organizator?: "Vecinos" | "Organización" | "Municipio" | "Otro" | "Desconocido",
    objetive?: "Mejorar" | "Preservar" | "Puesta en valor" | "Desconocido"
}

interface optionalsArt {
    type: typeArt
}

interface optionalInvestigation {
    institute: typeInstitute,
    state: "Pendiente" | "Activo" | "Finalizado",
    result: string,
    resultType: "Final" | "Parcial",
}

export type genericFilter = {type: string, value: string};

export type keywords = 'Flora'| 'Fauna'| 'Algas'| 'Contaminación'| 'Residuos sólidos urbanos'| 'Efluentes cloacales'| 'Efluentes industriales'| 'Alteración del paisaje'| 'Calidad del agua'| 'Biodiversidad'| 'Educación ambiental'| 'Ecoturismo'| 'Actividad residencial'| 'Actividad industrial'| 'Actividad agrícola'| 'Actividad ganadera'| 'Emprendimiento inmobiliario'|  'Aves'| 'Paisaje'| 'Rural'| 'Periurbano'| 'Urbano'| 'Natural'| 'Artificial'| 'Laguna'| 'Río'| 'Arroyo'| 'Cañada'| 'Pantano'| 'Colón'| 'Concepción del Uruguay'| 'Gualeguaychú'| 'Basura'| 'Olor'| 'Color'| 'Ribera'| 'Nutrientes'| 'Pesca'| 'Recreación'| 'Cultivo'| 'Granjas'| 'Estudio de impacto ambiental'| 'Informe técnico ambiental'| 'Conservación'| 'Proyecto educativo'| 'Proyecto de investigación'| 'Reserva natural'| 'Anfibios'| 'Peces'| 'Reptiles'| 'Aves'| 'Mamíferos'| 'Insectos'| 'Macroinvertebrados'| 'Pastizal'| 'Bosque'| 'Barranca'| 'Análisis de agua'| 'Físico-químico'| 'Microbiológico'| 'Biológico'| 'Bioensayos'| 'Asentamientos'| 'Basural'| 'Relleno sanitario'| 'Materia orgánica'| 'Espumas'| 'Actividad sustentable'| 'Proyecto sustentable'| 'Feria de ciencias'| 'Congresos'| 'Jornadas ambientales'| 'Revistas científicas'| 'Contaminación orgánica'| 'Contaminación Química'| 'Contaminación microbiológica'| 'Contaminación antrópica' | 'Contaminación natural';

export const imgFiles = 'image/png, image/jpeg';
export const docFiles = '.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, .pdf';
// Data

export const categories: {name: string, value: postCategory}[] = [
    {name: "Descripción del humedal/Sitio de interés", value: "humedal"},
    {name: "Amenazas / impactos antrópicos o naturales", value: "amenazas"},
    {name: "Iniciativas sustentables", value: "iniciativas"},
    {name: "Expresiones artísticas", value: "arte"},
    {name: "Proyectos de investigación", value: "investigacion"}
]

// Generic data
export const wetlandTypes = ["Natural", "Artificial"]

export const wetlandCategories = ["Rio", "Laguna natural", "Laguna artifical", "Cañada", "Arroyo", "Desconocido"];
export const wetlandZones = ["ZONA RURAL", "ZONA PERIURBANA", "ZONA URBANA", "OTRO "];
export const wetlandLocation =  ["Colón", "Concepcion Del Uruguay", "Gualeguaychú"];

// Wetlands optionals
export const outskirtType = ["Industrial", "Residencial", " Agropecuaria", "De preservación / Reserva natural", "Ecoturismo", "Otra"];
export const flora = ["Acuática", "Terrestre", "Otra"];
export const fauna = ["Anfibios" , "Peces", "Reptiles", "Aves", "Mamíferos", "Insectos", "Macroinvertebrados", "Otra"]
export const margins = ["Alterado ", "Inalterado"];
export const color = ["Ámbar", "Marrón", "Verde", "Otro"];
export const olor = ["Presencia", "Ausencia"];
export const morfology = ["Barranca", "Bosque", "nativo", "Pastizal", "Cultivo", "Mixta"];

// Threath opcionals
export const typePollutant = ["Actividad industrial", "Actividad agrícola", "Actividad ganadera", "Alteración de márgenes del humedal", "Emprendimiento inmobiliario", "Asentamientos urbanos"];
export const analysis = {
    type: ["Físico-químico", "Microbiológico", "Biológico"],
    results: ['Buena', "Regular", "Mala"]
};
export const aspectTypes = ["Olor", "Color", "Materia organiza en la superficie", "Espuma", "Algas"];

// Initiative optionals
export const initiativeType = ["Proyecto", "Actividad/es", "Desconocido"];
export const organizator = ["Vecinos", "Organización", "Municipio" ,, "Otro", "Desconocido"];
export const objetive = ["Mejorar", "Preservar", "Puesta en valor", "Desconocido"];

// Art optionals
export const typeArt = ["Producciones artísticas", "Fotos", "Audiovisuales", "Redacciones", "Documentos"];

// Investigations optionals
export const typeInstitute = ["Escolar", "Universitario", "Laboratorio", "Instituciones de Investigación", "Privado", "ONG", "Otro"];
export const invetigationState = ["Pendiente", "Activo", "Finalizado"];
export const investigationResult = ["Final", "Parcial"];
const publish = ["No publicados", "Revista cientifica", "Congreso", "Otro"];

// Keywords

export const keywordsItems = ['Flora', 'Fauna', 'Algas', 'Contaminación', 'Residuos sólidos urbanos', 'Efluentes cloacales', 'Efluentes industriales', 'Alteración del paisaje', 'Calidad del agua', 'Biodiversidad', 'Educación ambiental', 'Ecoturismo', 'Actividad residencial', 'Actividad industrial', 'Actividad agrícola', 'Actividad ganadera', 'Emprendimiento inmobiliario',  'Aves', 'Paisaje', 'Rural', 'Periurbano', 'Urbano', 'Natural', 'Artificial', 'Laguna', 'Río', 'Arroyo', 'Cañada', 'Pantano', 'Colón', 'Concepción del Uruguay', 'Gualeguaychú', 'Basura', 'Olor', 'Color', 'Ribera', 'Nutrientes', 'Pesca', 'Recreación', 'Cultivo', 'Granjas', 'Estudio de impacto ambiental', 'Informe técnico ambiental', 'Conservación', 'Proyecto educativo', 'Proyecto de investigación', 'Reserva natural', 'Anfibios', 'Peces', 'Reptiles', 'Aves', 'Mamíferos', 'Insectos', 'Macroinvertebrados', 'Pastizal', 'Bosque', 'Barranca', 'Análisis de agua', 'Físico-químico', 'Microbiológico', 'Biológico', 'Bioensayos', 'Asentamientos', 'Basural', 'Relleno sanitario', 'Materia orgánica', 'Espumas', 'Actividad sustentable', 'Proyecto sustentable', 'Feria de ciencias', 'Congresos', 'Jornadas ambientales', 'Revistas científicas', 'Contaminación orgánica', 'Contaminación Química', 'Contaminación microbiológica', 'Contaminación antrópica', 'Contaminación natural']
export const postFilters = [
    {
        title: 'Tipo de publicacion',
        placeholder: 'Seleccione una categoria',
        items: categories,
        multiple: true,
        type: 'category',
    },
    {
        title: 'Palabras clave',
        placeholder: 'Seleccione palabra/s clave',
        items: keywordsItems.map(item => {return {name: item, value: item.toLowerCase()}}),
        multiple: true,
        type: 'keyword'
    },
] 