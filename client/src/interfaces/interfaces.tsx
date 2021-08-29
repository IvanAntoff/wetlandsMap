export interface post {
    id: string,
    status: 'pending' | 'refused' | 'aproved',
    category: string,
    subcategory: {type: string, value: string}[],
    content: {
        title: string,
        description: string,
        files: any[]
    },
    ubication: {lat: string, lon: string},
    keyword: string[]
}

export interface marker {
    title: string,
    subtitle?: string,
    text?: string,
    center:  {latitude: number, longitude: number },
}

export type bingMapPosition = { latitude: number, longitude: number, altitude?: number, altitudeReference?: number };