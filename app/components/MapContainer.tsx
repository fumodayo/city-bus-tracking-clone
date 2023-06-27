"use client";

import Map from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import type {
  MapRef,
  ViewStateChangeEvent,
} from "react-map-gl";
import useFlyToStore from "../hooks/useFlyStore";

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

  const onViewportChange = (e: ViewStateChangeEvent) =>
    setViewport(e.viewState);

  const mapRef = useRef<MapRef | null>(null);
  
  const { lat, lng } = useFlyToStore();

  useEffect(() => {
    if (lat && lng && mapRef.current) {
      const map = mapRef.current.getMap();
      map?.flyTo({ center: [lng, lat] });
    }
  }, [lat, lng]);

  return (
    <Map
      {...viewport}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onMove={onViewportChange}
      mapboxAccessToken={MAPBOX_TOKEN}
      ref={mapRef}
    >
      {children}
    </Map>
  );
};

export default MapContainer;
