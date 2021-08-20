import { useEffect, useState } from 'react'
import { API_KEY_BINGMAPS } from '../apiKeys'
import { marker } from '../interfaces/interfaces'
import ReactBingmaps from "./BingMapsReact"

interface genericMap{
    center: { latitude: number, longitude: number }
    markers: marker[],
    height?: string,
    width?: string,
    zoom?: number,
    mapTypeId?: "grayscale" | "canvaLight" | "canvaDark"
}

export const GenericMap: React.FC<genericMap> = (props:genericMap) => {
    // Este hook sera actualizado a true, cuando el mapa haya concluido su carga.
    const [mapIsReady, setMapIsReady] = useState<boolean>(false)
    // Manejamos el hight y width localmente.
    const [auxWidth, setAuxWidth] = useState<string>('0px');
    const [auxHeight, setAuxHeight] = useState<string>('0px');

    const renderMap = () => {
        setMapIsReady(true)
        setAuxWidth(props.width ? props.width : '100%');
        setAuxHeight(props.height? props.height : '100%');
    }



    return (
        <>
            { mapIsReady === false ? <h1>El mapa esta siendo cargado.</h1> : null }
            <ReactBingmaps
                onMapReady={()=>(console.log('ready'), renderMap())}
                bingMapsKey={API_KEY_BINGMAPS}
                pushPins={props.markers}
                height={props.height ? props.height : '100%'}
                width={props.width ? props.width : '100%'}
                mapOptions={{
                    navigationBarMode: "square"
                }}
                viewOptions={{
                    center: props.center,
                    mapTypeId: props.mapTypeId ? props.mapTypeId : "grayscale",
                    zoom: props.zoom ? props.zoom : 0,
                }}
            />
        </>

    )
}
