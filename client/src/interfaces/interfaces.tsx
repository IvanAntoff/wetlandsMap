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


//Others
export type genericFilter = {type: string, value: string};
export type keywords = 'Flora'| 'Fauna'| 'Algas'| 'Contaminación'| 'Residuos sólidos urbanos'| 'Efluentes cloacales'| 'Efluentes industriales'| 'Alteración del paisaje'| 'Calidad del agua'| 'Biodiversidad'| 'Educación ambiental'| 'Ecoturismo'| 'Actividad residencial'| 'Actividad industrial'| 'Actividad agrícola'| 'Actividad ganadera'| 'Emprendimiento inmobiliario'|  'Aves'| 'Paisaje'| 'Rural'| 'Periurbano'| 'Urbano'| 'Natural'| 'Artificial'| 'Laguna'| 'Río'| 'Arroyo'| 'Cañada'| 'Pantano'| 'Colón'| 'Concepción del Uruguay'| 'Gualeguaychú'| 'Basura'| 'Olor'| 'Color'| 'Ribera'| 'Nutrientes'| 'Pesca'| 'Recreación'| 'Cultivo'| 'Granjas'| 'Estudio de impacto ambiental'| 'Informe técnico ambiental'| 'Conservación'| 'Proyecto educativo'| 'Proyecto de investigación'| 'Reserva natural'| 'Anfibios'| 'Peces'| 'Reptiles'| 'Aves'| 'Mamíferos'| 'Insectos'| 'Macroinvertebrados'| 'Pastizal'| 'Bosque'| 'Barranca'| 'Análisis de agua'| 'Físico-químico'| 'Microbiológico'| 'Biológico'| 'Bioensayos'| 'Asentamientos'| 'Basural'| 'Relleno sanitario'| 'Materia orgánica'| 'Espumas'| 'Actividad sustentable'| 'Proyecto sustentable'| 'Feria de ciencias'| 'Congresos'| 'Jornadas ambientales'| 'Revistas científicas'| 'Contaminación orgánica'| 'Contaminación Química'| 'Contaminación microbiológica'| 'Contaminación antrópica' | 'Contaminación natural';