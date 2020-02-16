/* istanbul ignore file */

import React, { useState } from "react";
import PropTypes from "prop-types";

import ReactMapGL, { GeolocateControl, Marker } from "react-map-gl";

import { difficultyToColor, spotPropType } from "../utils/SpotUtils";

import Pin from "./Pin";

const Map = React.memo(
  ({ onGeolocate, onSpotInfoRequested, onRequestAddSpot, spotList }) => {
    const [viewport, setViewport] = useState({
      width: "100vw",
      height: "100vh",
      latitude: 34.048698,
      longitude: -118.418114,
      zoom: 12
    });

    const geolocateStyle = {
      position: "absolute",
      top: 0,
      left: 0,
      margin: 10
    };

    return (
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_TOKEN}
        mapStyle="mapbox://styles/mapbox/satellite-v9?optimize=true"
        onViewportChange={setViewport}
        onClick={selectedMapLocation => {
          // Ignore user clicking on top buttons
          if (selectedMapLocation.center.y < 70) {
            return;
          }

          const [lng, lat] = selectedMapLocation.lngLat;

          onRequestAddSpot({
            lat,
            lng
          });
        }}
      >
        <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          style={geolocateStyle}
          onGeolocate={location =>
            onGeolocate({
              lat: location.coords.latitude,
              lng: location.coords.longitude
            })
          }
        />

        {spotList.map(spot => {
          const difficultyColor = difficultyToColor(spot.difficulty);

          return (
            <Marker key={spot.id} latitude={spot.lat} longitude={spot.lng}>
              <Pin
                onClick={() => onSpotInfoRequested(spot)}
                color={difficultyColor}
              />
            </Marker>
          );
        })}
      </ReactMapGL>
    );
  }
);

Map.propTypes = {
  onGeolocate: PropTypes.func.isRequired,
  onSpotInfoRequested: PropTypes.func.isRequired,
  onRequestAddSpot: PropTypes.func.isRequired,
  spotList: PropTypes.arrayOf(spotPropType).isRequired
};

export default Map;
