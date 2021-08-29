import { useEffect, useRef, useState } from 'react'
import { API_KEY_BINGMAPS } from '../apiKeys'
import { marker } from '../interfaces/interfaces'
import ReactBingmaps from "./BingMapsReact"

interface genericMap{
    center: { latitude: number, longitude: number }
    markers: marker[],
    height?: string,
    width?: string,
    zoom?: number,
    eventsHandlers?: { eventType: string, func: () => void }[],
    getLocationOnClick?: (value:any) => void,
    mapTypeId?: "grayscale" | "canvaLight" | "canvaDark"
}

export const GenericMap: React.FC<genericMap> = (props:genericMap) => {
    // When map is ready, this hook is true.
    const [mapIsReady, setMapIsReady] = useState<boolean>(false)
    // Handle zoom, height y width localy.
    const [auxWidth, setAuxWidth] = useState<string>('100%');
    const [auxHeight, setAuxHeight] = useState<string>('100%');
    const [auxZoom, setAuxZoom] = useState<number>(0);
    const [auxMarkers, setAuxMarkers] = useState<any[]>([]);
    const [auxCenter, setAuxCenter] = useState<{ latitude: number, longitude: number }>({latitude: 0, longitude: 0})
    // This ref is only setted once.
    const getLocationSetter = useRef<any>(null);
    // Map component reference.
    const [mapComponent ,setMapComponent] = useState<JSX.Element>(<></>);

    useEffect(()=>{
        if (!getLocationSetter.current) getLocationSetter.current = props.getLocationOnClick;
    },[props.getLocationOnClick])

    useEffect(()=>{
        if ((props.width) && (auxWidth !== props.width)) setAuxWidth(props.width);
    },[auxWidth,props.width]);

    useEffect(()=>{
        if ((props.height) && (auxHeight !== props.height)) setAuxHeight(props.height);
    },[props.height,auxHeight]);

    useEffect(()=>{
        if ((props.zoom) && (auxZoom !== props.zoom)) setAuxZoom(props.zoom);
    },[auxZoom, props.zoom]);

    useEffect(()=>{
        if ((props.markers) && (auxMarkers !== props.markers)) setAuxMarkers(props.markers);
    },[auxMarkers, props.markers]);

    useEffect(()=>{
        if ((props.center) && (auxCenter !== props.center)) setAuxCenter(props.center);
    },[auxCenter, props.center]);

    useEffect(() => {
        if (mapIsReady === false) setMapComponent(<ReactBingmaps onMapReady={() => {setTimeout(() => {setMapIsReady(true)}, 2000);}} bingMapsKey={API_KEY_BINGMAPS} height={'0px'} width={'0px'}/>)
        const renderMap = () => {
            setMapComponent(
                <ReactBingmaps
                    onMapReady={() => {if (mapIsReady === false) setMapIsReady(true)}}
                    bingMapsKey={API_KEY_BINGMAPS}
                    pushPins={auxMarkers}
                    height={auxWidth}
                    width={auxHeight}
                    mapOptions={{
                        navigationBarMode: "square"
                    }}
                    viewOptions={{
                        center: auxCenter,
                        zoom: auxZoom,
                    }}
                    mapEventsHandlers={props.eventsHandlers ? props.eventsHandlers : null }
                    getLocationOnClick={getLocationSetter.current ? getLocationSetter.current : null}
                />
            )
        }
        if (mapIsReady === true) renderMap();
    },[mapIsReady, auxWidth, auxHeight, auxZoom, auxMarkers, auxCenter, getLocationSetter.current])

    return (
        <>
            { mapIsReady === false ? 
            <>
                <h1>El mapa esta siendo cargado.</h1> 
                {mapComponent}
            </>
            : 
            <>
                {mapComponent} 
            </>
            }
        </>
    )
}
