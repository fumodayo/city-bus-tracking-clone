"use client";

import { useMemo } from "react";
import { Marker } from "react-map-gl";

import MarkerRed from "./MarkerRed";
import MarkerBlue from "./MarkerBlue";

import usePinStore from "@/app/hooks/usePinStore";

import { useSearchParams } from "next/navigation";

const MarkerPin = () => {
  const { lng: lngStart, lat: latStart } = usePinStore((state) => state.start);
  const { lng: lngEnd, lat: latEnd } = usePinStore((state) => state.end);

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
