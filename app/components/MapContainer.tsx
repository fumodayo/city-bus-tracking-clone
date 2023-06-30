"use client";

import Map from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useCallback, useEffect, useRef, useState, useMemo } from "react";
import type { MapRef, ViewStateChangeEvent } from "react-map-gl";
import useFlyToStore from "../hooks/useFlyStore";
import { useSearchParams } from "next/navigation";
import usePinStore from "../hooks/usePinStore";

interface MapContainerProps {
  children: React.ReactNode;
}

const MapContainer: React.FC<MapContainerProps> = ({ children }) => {
  const [viewport, setViewport] = useState({
    latitude: 16.06045710530602,
    longitude: 108.2097851153426,
    zoom: 14,
  });

  const onViewportChange = (e: ViewStateChangeEvent) =>
    setViewport(e.viewState);

  const mapRef = useRef<MapRef | null>(null);

  const {
    lng: lngStart,
    lat: latStart,
    setLngLatStart,
  } = usePinStore((state) => state.start);
  const {
    lng: lngEnd,
    lat: latEnd,
    setLngLatEnd,
  } = usePinStore((state) => state.end);

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
        if (!lngStart && !latStart) {
          setLngLatStart(lat, lng);
        } else if (!lngEnd && !latEnd) {
          setLngLatEnd(lat, lng);
        }
      }
    },
    [params, setLngLatStart, setLngLatEnd, latStart, lngStart, lngEnd, latEnd]
  );

  return (
    <Map
      {...viewport}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onMove={onViewportChange}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
      ref={mapRef}
      onDblClick={handleAddClick}
    >
      {children}
    </Map>
  );
};

export default MapContainer;
