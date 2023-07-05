"use client";

import { useSearchParams } from "next/navigation";
import { useFindBusStopNear } from "../hooks/useDirection";
import { useFileredMarker } from "../hooks/useFilter";
import MarkerDraw from "./marker/MarkerDraw";
import { SafeStations } from "./types";

const MapMarker = () => {
  const filteredRoad = useFileredMarker();
  const { filteredStops } = useFindBusStopNear();

  const params = useSearchParams();
  const type = params?.get("type") === "direction";

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
      {type &&
        filteredStops &&
        filteredStops.map((point, index: number) => (
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
