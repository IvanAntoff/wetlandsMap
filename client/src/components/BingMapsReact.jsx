// DEPENDENCIES
import React, { useEffect, useRef, useCallback } from "react";

export default function BingMapsReact({
  bingMapsKey,
  height,
  mapOptions,
  onMapReady,
  pushPins,
  pushPinsWithInfoboxes,
  viewOptions,
  width,
  mapEventsHandlers,
  getLocationOnClick
}) {
  // refs
  const mapContainer = useRef(null);
  const map = useRef(null);
  const onClickLocationSetter = useRef(null);

  // onClickLocation handler
  function addOnClickHanlder(map ,event, valueSetter) {
    if (event.targetType === "map") {
      let pixelClicked = new window.Microsoft.Maps.Point(event.getX(), event.getY());
      let pixToLocation = map.tryPixelToLocation(pixelClicked);
      valueSetter(pixToLocation);
    }
  }

  // get location
  function getLocationClicked (map, valueSetter) {
    try{
      if (map && window.Microsoft && window.Microsoft.Maps && window.Microsoft.Maps.Events  && window.Microsoft.Maps.Events.addHandler && valueSetter) {
        if (!onClickLocationSetter.current){
          const aux = window.Microsoft.Maps.Events.addHandler(map, "click", function (e) {addOnClickHanlder(map, e, valueSetter)})
          onClickLocationSetter.current = aux;
        }
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

  // add pushpins with infoboxes
  const addPushpinsWithInfoboxes = useCallback(
    (pushPinsToAdd, infobox, map, Maps) => {
      removePushpins(map, Maps);
      pushPinsToAdd.forEach((pushPin) => {
        if (pushPin === null) {
          return;
        }
        const newPin = new Maps.Pushpin(pushPin.center, pushPin.options);
        newPin.metadata = pushPin.metadata;
        Maps.Events.addHandler(newPin, "mouseover", (e) => {
          infobox.setOptions({
            location: e.target.getLocation(),
            title: e.target.metadata.title,
            description: e.target.metadata.description,
            visible: true,
            htmlContent: pushPin.infoboxHtml,
          });
        });
        Maps.Events.addHandler(newPin, "mouseout", (e) => {
          infobox.setOptions({
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
        credentials: bingMapsKey,
      });
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
      const infobox = new Maps.Infobox(map.current.getCenter(), {
        visible: false,
      });
      infobox.setMap(map.current);
      addPushpinsWithInfoboxes(
        pushPinsWithInfoboxes,
        infobox,
        map.current,
        Maps
      );
    }
    onMapReady && onMapReady();
  }, [
    addPushpinsWithInfoboxes,
    bingMapsKey,
    mapOptions,
    onMapReady,
    pushPins,
    pushPinsWithInfoboxes,
    viewOptions,
    getLocationOnClick
  ]);

  useEffect(() => {
    if (window.Microsoft && window.Microsoft.Maps) {
      makeMap();
    } else {
      const scriptTag = document.createElement("script");
      scriptTag.setAttribute("type", "text/javascript");
      scriptTag.setAttribute(
        "src",
        `https://www.bing.com/api/maps/mapcontrol?callback=makeMap`
      );
      scriptTag.async = true;
      scriptTag.defer = true;
      document.body.appendChild(scriptTag);
      window.makeMap = makeMap;
    }
  }, [makeMap]);

  return (
    <div ref={mapContainer} style={{ height: height, width: width }}></div>
  );
}
BingMapsReact.defaultProps = {
  bingMapsKey: null,
  mapOptions: null,
  height: "100%",
  onMapReady: null,
  pushPins: null,
  pushPinsWithInfoboxes: null,
  viewOptions: null,
  width: "100%",
  mapEventsHandlers: null,
  getLocationOnClick: null
};
