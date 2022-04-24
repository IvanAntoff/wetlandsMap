import { NewsModalProps } from "../components/NewsModal";
import { CATEGORIA } from "../interfaces/posts.interface";

// Data
export const categorias = [
    {name: "Descripción del humedal/Sitio de interés", value: CATEGORIA.humedal},
    {name: "Amenazas / impactos antrópicos o naturales", value: CATEGORIA.amenaza},
    {name: "Iniciativas sustentables", value: CATEGORIA.iniciativa},
    {name: "Expresiones artísticas", value: CATEGORIA.arte},
    {name: "Proyectos de Investigación/Extensión", value: CATEGORIA.investigacion}
]

// input files types
export const imgFiles = 'image/png, image/jpeg';
export const docFiles = '.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, .pdf, application/pdf';

// Keywords
export const keywordsItems = ['Flora', 'Fauna', 'Algas', 'Contaminación', 'Residuos sólidos urbanos', 'Efluentes cloacales', 'Efluentes industriales', 'Alteración del paisaje', 'Calidad del agua', 'Biodiversidad', 'Educación ambiental', 'Ecoturismo', 'Actividad residencial', 'Actividad industrial', 'Actividad agrícola', 'Actividad ganadera', 'Emprendimiento inmobiliario',  'Aves', 'Paisaje', 'Rural', 'Periurbano', 'Urbano', 'Natural', 'Artificial', 'Laguna', 'Río', 'Arroyo', 'Cañada', 'Pantano', 'Colón', 'Concepción del Uruguay', 'Gualeguaychú', 'Basura', 'Olor', 'Color', 'Ribera', 'Nutrientes', 'Pesca', 'Recreación', 'Cultivo', 'Granjas', 'Estudio de impacto ambiental', 'Informe técnico ambiental', 'Conservación', 'Proyecto educativo', 'Proyecto de investigación', 'Reserva natural', 'Anfibios', 'Peces', 'Reptiles', 'Aves', 'Mamíferos', 'Insectos', 'Macroinvertebrados', 'Pastizal', 'Bosque', 'Barranca', 'Análisis de agua', 'Físico-químico', 'Microbiológico', 'Biológico', 'Bioensayos', 'Asentamientos', 'Basural', 'Relleno sanitario', 'Materia orgánica', 'Espumas', 'Actividad sustentable', 'Proyecto sustentable', 'Feria de ciencias', 'Congresos', 'Jornadas ambientales', 'Revistas científicas', 'Contaminación orgánica', 'Contaminación Química', 'Contaminación microbiológica', 'Contaminación antrópica', 'Contaminación natural']

export const booleanEnums = [
    {value: true, name: 'Presenta'},
    {value: false, name: 'No presenta'},
]

export const News: NewsModalProps[] = [
    {
        title: 'Inicio de actividades en el marco del proyecto "Humedales Digitales"',
        body: 'El 30/08 y 16/09 estuvimos en la Escuela N° 2 "Prof. Pablo G. Haedo" con estudiantes de 6to y 3er año realizando los primeros talleres del proyecto "Humedales Digitales. Un proyecto de ciencia ciudadana".',
        imgs: ['/assets/imgs/home/publicaciones/1.jpg','/assets/imgs/home/publicaciones/2.jpg', '/assets/imgs/home/publicaciones/3.jpg']
    },
    {
        title: 'Seguimos con el desarrollo de talleres en el marco del proyecto "Humedales Digitales"',
        body: 'El 17/09 estuvimos en Concepción del Uruguay, realizando un taller del proyecto "Humedales Digitales. Un proyecto de ciencia ciudadana" con alumnos de 6to año pertenecientes al Instituto “Martín Fierro”.',
        imgs: ['/assets/imgs/home/publicaciones/4.jpg','/assets/imgs/home/publicaciones/5.jpg', '/assets/imgs/home/publicaciones/6.jpg']
    },
    {
        title: 'Continuamos con los talleres en el marco del proyecto "Humedales Digitales"',
        body: 'El 20/10 estuvimos en San José, con alumnos de 6to y 2do año pertenecientes a la Escuela N°10 “Juan Bautista Alberdi” desarrollando talleres en el marco del proyecto "Humedales Digitales. Un proyecto de ciencia ciudadana".',
        imgs: ['/assets/imgs/home/publicaciones/7.jpg','/assets/imgs/home/publicaciones/8.jpg', '/assets/imgs/home/publicaciones/9.jpg']
    },
]