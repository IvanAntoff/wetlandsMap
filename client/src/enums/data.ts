import { postCategory, wetlandCategoryTypes, wetlandOriginTypes, wetlanLocationType, wetlandZonesTypes, outskirtTypes, floraTypes, wildlifeTypes, colorTypes, smellTypes, marginsTypes, morfologyTypes, originTypes, threatType, sourceTypes, hasType, waterAnalysisType, waterAnalysisResults, initiativeTypeTypes, initiativeObjetiveTypes, organizatorTypes, participantsTypes, artType, publicationsTypes, resultStateTypes, resultTypeTypes, booleanEnum } from "../interfaces/interfaces";

// Data
export const categories: {name: string, value: postCategory}[] = [
    {name: "Descripción del humedal/Sitio de interés", value: "humedal"},
    {name: "Amenazas / impactos antrópicos o naturales", value: "amenazas"},
    {name: "Iniciativas sustentables", value: "iniciativas"},
    {name: "Expresiones artísticas", value: "arte"},
    {name: "Proyectos de investigación", value: "investigacion"}
]

// Generic data
export const wetlandCategoryArray:wetlandCategoryTypes[] = ["Rio", "Laguna natural", "Laguna artifical", "Cañada", "Arroyo", "Desconocido"];
export const wetlandZonesArray: wetlandZonesTypes[] = ["ZONA RURAL", "ZONA PERIURBANA", "ZONA URBANA", "OTRO"];
export const wetlandOriginArray:wetlandOriginTypes[] = ["Natural", "Artificial"];
export const wetlandLocationArray: wetlanLocationType[] =  ["Colón", "Concepcion Del Uruguay", "Gualeguaychú"];

// Wetlands optionals
export const outskirtArray: outskirtTypes[] = ["Industrial", "Residencial", " Agropecuaria", "De preservación / Reserva natural", "Ecoturismo", "Otra"];
export const floraArray: floraTypes[] = ["Acuática", "Terrestre", "Mixta", "No se observa"];
export const wildlifeArray: wildlifeTypes[] = ["Anfibios" , "Peces", "Reptiles", "Aves", "Mamíferos", "Insectos", "Macroinvertebrados", "Otra"]
export const colorArray: colorTypes[] = ["Ámbar", "Marrón", "Verde", "Otro"];
export const smellArray: smellTypes[] = ["Presencia", "Ausencia"];
export const marginsArray: marginsTypes[] = ["Alterado ", "Inalterado"];
export const morfologyArray: morfologyTypes[] = ["Barranca", "Bosque", "nativo", "Pastizal", "Cultivo", "Mixta"];

// Threath opcionals
// export const typePollutant = ["Actividad industrial", "Actividad agrícola", "Actividad ganadera", "Alteración de márgenes del humedal", "Emprendimiento inmobiliario", "Asentamientos urbanos"];
export const threathTypeArray: threatType[] = ['Orgánica' , 'Química', 'Microbiológica ', 'Alteración de paisaje ', 'Alteración de márgenes de ribera ', 'Otra' , 'Desconocido']
export const originArray: originTypes[] = ['Natural' , 'Antropica' , 'Desconocido'];
export const sourceArray: sourceTypes[] = ['Basural no controlado – A cielo abierto' , 'Relleno sanitario' , 'Actividad industrial ' , 'Actividad agrícola' , 'Actividad ganadera' , 'Alteración de márgenes del humedal ' , 'Emprendimiento inmobiliario' , 'Asentamientos urbanos ' , 'Desconocido' , 'Otra'];
export const hasArray: hasType[] = ['Presencia' , 'Ausencia' , 'Desconozco'];
export const waterAnalysisTypeArray: waterAnalysisType[] = ['Físico-químico','Microbiológico ','Biológico','Bioensayos','Otra'];
export const waterAnalysisResultsArray: waterAnalysisResults[] = ['Calidad del agua buena', 'Calidad del agua regular', 'Calidad del agua mala' , 'Otra'];
export const booleanEnumArray: booleanEnum[] = ['Si', 'No'];

// Initiative optionals
export const initiativeTypeArray: initiativeTypeTypes[] = ["Proyecto" , "Actividad/es" , "Ota" ,"Desconocido"];
export const organizatorArray: organizatorTypes[] = ["Vecinos" , "Organización" , "Municipio" , "Otro" , "Desconocido"];
export const participantsArray: participantsTypes[] = ['Persona individual', 'Vecinos', 'Organización – Comisiones vecinales', 'ONG', 'Municipio', 'Establecimiento educativo de nivel primario o secundario', 'Institución universitaria', 'Centro-Instituto de investigación', 'Otro'];
export const initiativeObjetiveArray: initiativeObjetiveTypes[] = ["Mejorar" , "Preservar"  , "Restaurar" , "Puesta en valor" , "Otro" , "Desconocido"];

// Art optionals
export const artTypeArray: artType[] = ["Producciones artísticas", "Fotos", "Audiovisuales", "Redacciones", "Documentos"];

// Investigations optionals
export const resultStateArray: resultStateTypes[] =  ["Pendiente" , "Activo" , "Finalizado"];
export const resultTypeArray: resultTypeTypes[] = ["Final" , "Parcial"];
export const publicationsArray: publicationsTypes[] = ["No publicados" , "Revistas científicas" , "Congresos" , "Reuniones científicas" , "Otros"];

// input files types
export const imgFiles = 'image/png, image/jpeg';
export const docFiles = '.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, .pdf';

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