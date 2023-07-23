// DEPENDENCIES
import { IonLoading } from "@ionic/react";
import React, { useEffect, useRef, useCallback, useState } from "react";
import './bingMap.css'

export default function BingMapsReact({
  bingMapsKey,
  height,
  mapOptions,
  onMapReady,
  pushPins,
  pushPinsWithInfoboxes,
  polygon,
  infobox,
  viewOptions,
  width,
  mapEventsHandlers,
  getLocationOnClick,
}) {
  // refs
  const mapContainer = useRef(null);
  const map = useRef(null);
  const onClickLocationSetter = useRef(null);
  const infoboxHandler = useRef(null);
  const [loading, setLoading] = useState(true);
  // get location
  function getLocationClicked (map, valueSetter) {
    try{
      if (map && window.Microsoft && window.Microsoft.Maps && window.Microsoft.Maps.Events  && window.Microsoft.Maps.Events.addHandler && valueSetter) {
        function addOnClickHanlder(map ,event, valueSetter) {
          if (event.targetType === "map") {
            let pixelClicked = new window.Microsoft.Maps.Point(event.getX(), event.getY());
            let pixToLocation = map.tryPixelToLocation(pixelClicked);
            valueSetter(pixToLocation);
          }
        }
        // onClickLocation handler
        if (onClickLocationSetter.current) window.Microsoft.Maps.Events.removeHandler(onClickLocationSetter.current);
        onClickLocationSetter.current = window.Microsoft.Maps.Events.addHandler(map, "click", function (e) {addOnClickHanlder(map, e, valueSetter)});
      };
    }
    catch (error) {
      console.error('Error on getLocationClicked: ', error);
    }
  }

  // events
  function addEventsHandlers (map, events) {
    try{
      if (map && window.Microsoft && window.Microsoft.Maps && window.Microsoft.Maps.Events) {
        for (let i = 0; i < events.length; i++) {
          const event = events[i];
          if (event.eventType && event.func) {window.Microsoft.Maps.Events.addHandler(map, event.eventType, event.func)};
        }
      }
    }
    catch (error) {
      console.error('Error on addEventsHandlers: ', error);
    }
  }

  // removes pushpins
  function removePushpins(map, Maps) {
    for (var i = map.entities.getLength() - 1; i >= 0; i--) {
      var pushpin = map.entities.get(i);
      if (pushpin instanceof Maps.Pushpin) {
        map.entities.removeAt(i);
      }
    }
  }

  const resetInfoboxes = (map) => {
    infoboxHandler.current.setOptions({visible: false});
    infoboxHandler.current.setMap(null);
    infoboxHandler.current.setMap(map);
  }
  // to fix actions visualizations problems just add this css and import. 
  // .MicrosoftMap .Infobox .infobox-actions {
  //   height: max-content;
  // }
  // add pushpins with infoboxes
  const addPushpinsWithInfoboxes = useCallback(
    (pushPinsToAdd, map, Maps) => {
      removePushpins(map, Maps);
      pushPinsToAdd.forEach((pushPin) => {
        if (pushPin === null) return;
        const newPin = new Maps.Pushpin(pushPin.center, pushPin.options);
        newPin.metadata = pushPin.metadata;
        Maps.Events.addHandler(newPin, "mouseover", (e) => {
          infoboxHandler.current.setOptions({
            location: e.target.getLocation(),
            title: e.target.metadata.title,
            description: e.target.metadata.description,
            visible: true,
            actions: Array.isArray(e.target.metadata?.actions) ? e.target.metadata.actions : undefined 
          });
        });
        Maps.Events.addHandler(newPin, "mouseout", (e) => {
          infoboxHandler.current.setOptions({
            visible: false,
          });
        });
        map.entities.push(newPin);
      });
    },
    []
  );

  // add pushpins
  function addPushpins(pushPinsToAdd, map, Maps) {
    pushPinsToAdd.forEach((pushPin) => {
      if (pushPin === null) {
        return;
      }
      const newPin = new Maps.Pushpin(pushPin.center, pushPin.options);
      map.entities.push(newPin);
    });
  }

    // add polygon unfinished
    function addPolygon(polygonToAdd, map, Maps) {
        try{
          if (polygonToAdd === null) return;
          const newPolygon = new Maps.Polygon([polygonToAdd], {
            fillColor: 'rgba(0, 255, 0, 0.5)',
            strokeColor: 'red',
            strokeThickness: 2
          });
          if(newPolygon && newPolygon[1]) map.entities.push(newPolygon);
        }
        catch (error) {
          console.error('Error on polygon creation. Error: ',error);
        }
    }

    // add infobox
    function addInfobox(newinfobox) {
      try{
        if (newinfobox === null || !newinfobox.center || !newinfobox.title || !newinfobox.description) return;
        infobox.setOptions(newinfobox.center, {
          title: newinfobox.title,
          description: newinfobox.description
        });
      }
      catch (error) {
        console.error('Error on polygon creation. Error: ',error);
      }
    }
  

  // set view options
  function setMapViewOptions(map, viewOptions, Maps) {
    const options = { ...viewOptions };
    if (viewOptions.mapTypeId) {
      options.mapTypeId = Maps.MapTypeId[viewOptions.mapTypeId];
    }
    if (viewOptions.hideRoadLabels) {
      options.labelOverlay = Maps.LabelOverlay.hidden;
    }
    map.setView(options);
  }

  // set map options
  function setMapOptions(map, mapOptions, Maps) {
    const options = { ...mapOptions };

    // some map options require values from the Maps class
    // these conditional statements handle those cases
    if (mapOptions.navigationBarMode) {
      options.navigationBarMode =
        Maps.NavigationBarMode[mapOptions.navigationBarMode];
    }
    if (mapOptions.navigationBarOrientation) {
      options.navigationBarOrientation =
        Maps.NavigationBarOrientation[mapOptions.navigationBarOrientation];
    }
    if (mapOptions.supportedMapTypes) {
      options.supportedMapTypes = mapOptions.supportedMapTypes.map(
        (type) => Maps.MapTypeId[type]
      );
    }
    map.setOptions(options);
  }

  // make map, set options, add pins
  const makeMap = useCallback(() => {
    const { Maps } = window.Microsoft;
    // only make a new map if one doesn't already exist
    if (!map.current) {
      map.current = new Maps.Map(mapContainer.current, {
        showLogo: false,
        showTrafficButton: false,
      });
      setLoading(false);
      onMapReady && onMapReady();
    }
  },[]);

  useEffect(() => {
    if(map.current) return;
    setLoading(true);
    window.makeMap = makeMap;
    const scriptTag = document.createElement("script");
    scriptTag.setAttribute("type", "text/javascript");
    scriptTag.async = true;
    scriptTag.defer = true;
    scriptTag.setAttribute(
      "src",
      `https://www.bing.com/api/maps/mapcontrol?callback=makeMap&key=${bingMapsKey}`
    );
    document.body.appendChild(scriptTag);
  }, [makeMap]);

  useEffect(() => {
    if(!map.current) return;
    setLoading(true);
    const { Maps } = window.Microsoft;
    if(!infoboxHandler.current) {
      infoboxHandler.current = new Maps.Infobox(map.current.getCenter(), {
        visible: false,
      });
      infoboxHandler.current.setMap(map.current);
    }
    if (mapEventsHandlers) {
      addEventsHandlers(map.current, mapEventsHandlers);
    }
    if (getLocationOnClick) {
      getLocationClicked(map.current, getLocationOnClick);
    }

    // set viewOptions, if any
    if (viewOptions) {
      setMapViewOptions(map.current, viewOptions, Maps);
    }

    // set mapOptions, if any
    if (mapOptions) {
      setMapOptions(map.current, mapOptions, Maps);
    }

    // add push pins, if any
    if (pushPins) {
      addPushpins(pushPins, map.current, Maps);
    }

    // add infoboxes, if any
    if (pushPinsWithInfoboxes) {
      resetInfoboxes(map.current);
      addPushpinsWithInfoboxes(pushPinsWithInfoboxes, map.current, Maps);
    }

    // add polygons, if any
    if (polygon) addPolygon(pushPins, map.current, Maps);
    // add infobox, if any
    if (infobox) {
      resetInfoboxes(map.current);
      addInfobox(infobox, map.current, Maps);
    }
    setLoading(false);
  },[
    map,
    addPushpinsWithInfoboxes,
    bingMapsKey,
    mapOptions,
    onMapReady,
    pushPins,
    pushPinsWithInfoboxes,
    viewOptions,
    getLocationOnClick,
    height,
    pushPins.length,
    pushPinsWithInfoboxes.length,
    polygon,
    infobox,
    width,
    mapEventsHandlers,
  ])

  return (
      <div ref={mapContainer} style={loading == true ? { height: '0px', width: '0px' } : { height: height, width: width }}>
      <IonLoading
        isOpen={loading}
        message={'Actualizando mapa...'}
        keyboardClose={false}
        backdropDismiss={false}
        />
      </div>
  );
}
BingMapsReact.defaultProps = {
  bingMapsKey: null,
  mapOptions: null,
  height: "100%",
  onMapReady: null,
  pushPins: [],
  pushPinsWithInfoboxes: [],
  viewOptions: null,
  width: "100%",
  mapEventsHandlers: null,
  getLocationOnClick: null,
  polygon: null,
  infobox: null
};
