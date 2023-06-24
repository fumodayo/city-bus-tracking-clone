"use client";

import { useFileredMarker } from "../hooks/useFilter";
import MarkerDraw from "./marker/MarkerDraw";
import { SafeStations } from "./types";

const MapMarker = () => {
  const filteredRoad = useFileredMarker();

  return (
    <div>
      {filteredRoad.map((point: SafeStations, index: number) => (
        <MarkerDraw
          key={index}
          lat={point?.location?.lat}
          lng={point?.location?.lng}
          location={point}
        />
      ))}
    </div>
  );
};

export default MapMarker;
