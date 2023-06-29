"use client";

import Map from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useCallback, useEffect, useRef, useState, useMemo } from "react";
import type { MapRef, ViewStateChangeEvent } from "react-map-gl";
import useFlyToStore from "../hooks/useFlyStore";
import usePinStartStore from "../hooks/usePinStartStore";
import usePinEndStore from "../hooks/usePinEndStore";
import { useSearchParams } from "next/navigation";

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

  const { setlngLatStart } = usePinStartStore();
  const { setlngLatEnd } = usePinEndStore();
  const [clickCount, setClickCount] = useState(0);

  const { lat, lng } = useFlyToStore();

  useEffect(() => {
    if (lat && lng && mapRef.current) {
      const map = mapRef.current.getMap();
      map?.flyTo({ center: [lng, lat] });
    }
  }, [lat, lng]);

  const params = useSearchParams();

  const handleAddClick = useCallback(
    (e: any) => {
      const type = params?.get("type");
      const { lat, lng } = e.lngLat;
      if (type === "direction") {
        setClickCount((prevClickCount) => prevClickCount + 1);
        if (clickCount % 2 === 0) {
          setlngLatStart(lat, lng);
        } else if ((clickCount + 1) % 2 === 0) {
          setlngLatEnd(lat, lng);
        }
      }
    },
    [params, clickCount, setlngLatStart, setlngLatEnd]
  );


  return (
    <Map
      {...viewport}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onMove={onViewportChange}
      mapboxAccessToken={MAPBOX_TOKEN}
      ref={mapRef}
      onDblClick={handleAddClick}
    >
      {children}
    </Map>
  );
};

export default MapContainer;
