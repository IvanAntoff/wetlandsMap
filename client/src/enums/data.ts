import { CATEGORIA } from "../interfaces/posts.interface";

// Data
export const categorias = [
    {name: "Descripción del humedal/Sitio de interés", value: CATEGORIA.humedal},
    {name: "Amenazas / impactos antrópicos o naturales", value: CATEGORIA.amenaza},
    {name: "Iniciativas sustentables", value: CATEGORIA.iniciativa},
    {name: "Expresiones artísticas", value: CATEGORIA.arte},
    {name: "Proyectos de investigación", value: CATEGORIA.investigacion}
]

// input files types
export const imgFiles = 'image/png, image/jpeg';
export const docFiles = '.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, .pdf';

// Keywords
export const keywordsItems = ['Flora', 'Fauna', 'Algas', 'Contaminación', 'Residuos sólidos urbanos', 'Efluentes cloacales', 'Efluentes industriales', 'Alteración del paisaje', 'Calidad del agua', 'Biodiversidad', 'Educación ambiental', 'Ecoturismo', 'Actividad residencial', 'Actividad industrial', 'Actividad agrícola', 'Actividad ganadera', 'Emprendimiento inmobiliario',  'Aves', 'Paisaje', 'Rural', 'Periurbano', 'Urbano', 'Natural', 'Artificial', 'Laguna', 'Río', 'Arroyo', 'Cañada', 'Pantano', 'Colón', 'Concepción del Uruguay', 'Gualeguaychú', 'Basura', 'Olor', 'Color', 'Ribera', 'Nutrientes', 'Pesca', 'Recreación', 'Cultivo', 'Granjas', 'Estudio de impacto ambiental', 'Informe técnico ambiental', 'Conservación', 'Proyecto educativo', 'Proyecto de investigación', 'Reserva natural', 'Anfibios', 'Peces', 'Reptiles', 'Aves', 'Mamíferos', 'Insectos', 'Macroinvertebrados', 'Pastizal', 'Bosque', 'Barranca', 'Análisis de agua', 'Físico-químico', 'Microbiológico', 'Biológico', 'Bioensayos', 'Asentamientos', 'Basural', 'Relleno sanitario', 'Materia orgánica', 'Espumas', 'Actividad sustentable', 'Proyecto sustentable', 'Feria de ciencias', 'Congresos', 'Jornadas ambientales', 'Revistas científicas', 'Contaminación orgánica', 'Contaminación Química', 'Contaminación microbiológica', 'Contaminación antrópica', 'Contaminación natural']
export const postFilters = [
    {
        title: 'Tipo de publicacion',
        placeholder: 'Seleccione una categoria',
        items: categorias,
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

export const booleanEnums = [
    {value: true, name: 'Presenta'},
    {value: false, name: 'No presenta'},
]