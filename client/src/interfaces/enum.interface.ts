export type typeEnum = 'todos' | 'aledaños' | 'colores' | 'departamentos' | 'estadoinvestigaciones' | 'faunas' | 'floras' | 'fuenteamenazas' | 'margenes' | 'morfologias' | 'objetivoiniciativas' | 'origenes' | 'participantes' | 'publicaciones' | 'resultadoanalises' | 'resultadoinvestigaciones' | 'tipoamenazas' | 'tipoanalises' | 'tipoartes' | 'tipohumedales' | 'tipoiniciativas' | 'zonas'

export interface Enum {
    _id: string;
    name: string;
}

export interface Enums {
    aledaños: Enum[],
    colores: Enum[],
    departamentos: Enum[],
    estadoinvestigaciones: Enum[],
    faunas: Enum[],
    floras: Enum[],
    fuenteamenazas: Enum[],
    margenes: Enum[],
    morfologias: Enum[],
    objetivoiniciativas: Enum[],
    origenes: Enum[],
    participantes: Enum[],
    publicaciones: Enum[],
    resultadoanalises: Enum[],
    resultadoinvestigaciones: Enum[],
    tipoamenazas: Enum[],
    tipoanalises: Enum[],
    tipoartes: Enum[],
    tipohumedales: Enum[], 
    tipoiniciativas: Enum[], 
    zonas: Enum[]
}