import { StreamableFile } from "@nestjs/common";
import { Readable } from "stream";
import { Amenaza } from "./amenaza.interface";
import { Arte } from "./arte.interface";
import { Humedal } from "./humedal.interface";
import { Iniciativa } from "./iniciativa.interface";
import { Investigacion } from "./investigacion.interface";

export interface post {
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
    files: archivo[],
    datos: {
        humedal?: Humedal, 
        amenaza?: Amenaza,
        iniciativa?: Iniciativa,
        arte?: Arte,
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
    aprobados: post[],
    pendientes: post[],
    rechazados: post[]
}

export interface archivo {
    filename: string;
    mimetype: string;
    name: string;
}

export interface archivoVM {
    filename: string;
    mimetype: string;
    name: string;
    url?: string;
}
export interface postVM extends Omit<post, 'files'> {
    files: archivoVM[];
}