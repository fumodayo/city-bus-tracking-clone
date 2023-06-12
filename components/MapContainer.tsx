"use client";

import Map from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState } from "react";
import type {
  MapboxStyle,
  MapRef,
  MapLayerMouseEvent,
  ViewStateChangeEvent,
} from "react-map-gl";

interface MapContainerProps {
  children: React.ReactNode;
}

const MAPBOX_TOKEN =
  "pk.eyJ1IjoidGhhaXJ5byIsImEiOiJjbDdjb2ZnY3QxM2F6M3FtaW9zMDFpNWkzIn0.tPFJvhG-HJ0TdmJGolVjHA";

const MapContainer: React.FC<MapContainerProps> = ({ children }) => {
  const [viewport, setViewport] = useState({
    latitude: 16.06045710530602,
    longitude: 108.2097851153426,
    zoom: 14,
  });

  const onViewportChange = (e: ViewStateChangeEvent) => setViewport(e.viewState);

  return (
    <Map
      {...viewport}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onMove={onViewportChange}
      mapboxAccessToken={MAPBOX_TOKEN}
    >
      {children}
    </Map>
  );
};

export default MapContainer;
