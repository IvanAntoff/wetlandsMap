import { useEffect, useRef, useState } from 'react'
import { API_KEY_BINGMAPS } from '../apiKeys'
import { infobox, marker } from '../interfaces/interfaces'
import ReactBingmaps from "./BingMapsReact"

interface genericMap{
    center: { latitude: number, longitude: number }
    markers?: marker[],
    polygon?: Microsoft.Maps.Location[],
    infobox?: infobox,
    height?: string,
    width?: string,
    zoom?: number,
    loading? : boolean,
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

    const [auxCenter, setAuxCenter] = useState<{ latitude: number, longitude: number }>({latitude: 0, longitude: 0})
    // This ref is only setted once.
    const getLocationSetter = useRef<any>(null);
    // Map component reference.
    const [mapComponent ,setMapComponent] = useState<JSX.Element>(<></>);

    useEffect(()=>{
        getLocationSetter.current = props.getLocationOnClick;
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
        if ((props.center) && (auxCenter !== props.center)) setAuxCenter(props.center);
    },[auxCenter, props.center]);

    const getMarkersByType = (markers: marker[], type: 'info' | 'normal'): marker[] => {
        let infoMarkers: marker[] = []
        let normalMarkers: marker[] = []
        if (markers){
            for (let i = 0; i < markers.length; i++) {
                const newMarker = markers[i];
                if (newMarker) {
                    if(newMarker.metadata && newMarker.metadata.title) infoMarkers.push(newMarker);
                    else normalMarkers.push(newMarker);
                }
            }
        }
        if (type === 'info') return infoMarkers;
        return normalMarkers;
    }

    useEffect(() => {
        if (mapIsReady === false) setMapComponent(<ReactBingmaps onMapReady={() => {setTimeout(() => {setMapIsReady(true)}, 2000);}} bingMapsKey={API_KEY_BINGMAPS} height={'0px'} width={'0px'}/>)
        const renderMap = () => {
            setMapComponent(
                <ReactBingmaps
                    onMapReady={() => {if (mapIsReady === false) setMapIsReady(true)}}
                    bingMapsKey={API_KEY_BINGMAPS}
                    pushPins={getMarkersByType(props.markers ? props.markers : [], 'normal')}
                    pushPinsWithInfoboxes={getMarkersByType(props.markers ? props.markers : [], 'info')}
                    infobox={props.infobox}
                    polygon={props.polygon}
                    height={auxHeight}
                    width={auxWidth}
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
    },[mapIsReady, auxWidth, auxHeight, auxZoom, auxCenter, getLocationSetter.current])

    return (
        <>
            { mapIsReady === false || props.loading === true ? 
            <>
                <h1 style={{textAlign: 'center'}}>El mapa esta siendo cargado.</h1> 
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
