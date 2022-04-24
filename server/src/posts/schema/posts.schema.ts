import { Schema } from 'mongoose';

export const PostSchema = new Schema ({
    estado: {type: String},
    categoria: {type: String},
    tipo: {type: String},
    origen: {type: String},
    titulo: {type: String},
    descripcion: {type: String},
    coordenadas: {
        latitude: {type: String},
        longitude: {type: String}
    },
    zona: {type: String},
    departamento: {type: String},
    keyword: {type: Array},
    files: {type: Array},
    datos: {
        humedal: {
            color: {type: String},
            olor: {type: Boolean},
            aledaños: {type: String},
            flora: {type: Array},
            fauna: {type: Array},
            margen: {type: String},
            morfologia: {type: String},
            historia: {type: String}
        }, 
        amenaza: {
            origen: {type: String},
            fuente: {type: String},
            olor: {type: Boolean},
            color: {type: String},
            materia: {type: Boolean},
            materiadescripcion: {type: String},
            espuma: {type: Boolean},
            algas: {type: Boolean},
            tipo: {type: String},
            analisis: {type: Boolean},
            tipoanalises: {type: String},
            resultadoanalises: {type: String},
            informetecnico: {type: Boolean},
            estudioambiental: {type: Boolean},
        },
        iniciativa: {
            tipo: {type: String},
            participantes: {type: String},
            objetivo: {type: String},
        },
        arte: {
            tipo: {type: String},
            participantes: {type: String}
        },
        investigacion: {
            participantes: {type: String},
            estado: {type: String},
            resultado: {type: String},
            publicacion: {type: String}
        }
    },
    fechacreacion: {type: Date}
},{timestamps: true});