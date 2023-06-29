"use client";

import { useMemo } from "react";
import { Marker } from "react-map-gl";

import MarkerRed from "./MarkerRed";
import MarkerBlue from "./MarkerBlue";

import usePinStartStore from "@/app/hooks/usePinStartStore";
import usePinEndStore from "@/app/hooks/usePinEndStore";

import { useSearchParams } from "next/navigation";

const MarkerPin = () => {
  const {
    lng: lngStart,
    lat: latStart,
    point: pointStart,
  } = usePinStartStore();
  const { lng: lngEnd, lat: latEnd, point: pointEnd } = usePinEndStore();

  const params = useSearchParams();
  const type = params?.get("type");

  const red = useMemo(() => {
    return (
      type === "direction" &&
      latStart &&
      lngStart && (
        <Marker longitude={lngStart} latitude={latStart} anchor="top">
          <MarkerRed />
        </Marker>
      )
    );
  }, [latStart, lngStart, type]);

  const blue = useMemo(() => {
    return (
      type === "direction" &&
      latEnd &&
      lngEnd && (
        <Marker longitude={lngEnd} latitude={latEnd} anchor="top">
          <MarkerBlue />
        </Marker>
      )
    );
  }, [latEnd, lngEnd, type]);

  return (
    <div>
      {red} {blue}
    </div>
  );
};

export default MarkerPin;
