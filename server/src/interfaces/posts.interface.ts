import { Amenaza } from "./amenaza.interface";
import { Arte } from "./arte.interface";
import { Humedal } from "./humedal.interface";
import { Iniciativa } from "./iniciativa.interface";
import { Investigacion } from "./investigacion.interface";

export interface Posts {
    _id: string,
    estado: ESTADO,
    categoria: CATEGORIA,
    tipo: string,
    origen: string,
    titulo: string,
    descripcion: string,
    coordenadas: { latitude: string, longitude: string },
    zona: string,
    departamento: string,
    keyword: string[],
    files: string[],
    datos: {
        humedal?: Humedal, 
        amenaza?: Amenaza,
        iniciativa?: Iniciativa,
        art?: Arte,
        investigation?: Investigacion
    }
}

export enum CATEGORIA {
    humedal = 'humedal',
    amenaza = 'amenaza',
    iniciativa = 'iniciativa',
    arte = 'arte',
    investigacion = 'investigacion'
}

export enum ESTADO {
    pendiente = 'pending', 
    rechazado = 'refused',
    aprobado = 'approved'
}

export interface groupedPosts {
    aprobados: Posts[],
    pendientes: Posts[],
    rechazados: Posts[]
}