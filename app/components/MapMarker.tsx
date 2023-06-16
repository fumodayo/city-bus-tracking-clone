"use client";

import useBusStopStore from "../hooks/useBusstop";
import useCheckboxStore from "../hooks/useCheckbox";
import MarkerDraw from "./marker/MarkerDraw";
import { SafeStations } from "./types";

const MapMarker = () => {
  const checked = useCheckboxStore((state) => state.routeCodes);
  const listings = useBusStopStore((state) => state.busstopStore);
  const filterRoad = (
    objects: any,
    checked: (string | number)[],
    direction = "turn"
  ) => {
    return objects.filter(
      (obj: any) =>
        checked.includes(obj.codeRoute) && obj.direction === direction
    );
  };

  const filteredRoad = filterRoad(listings, checked, "turn");

  return (
    <div>
      {filteredRoad.map((point: SafeStations) => (
        <MarkerDraw
          key={point.address}
          lat={point?.location?.lat}
          lng={point?.location?.lng}
          location={point}
        />
      ))}
    </div>
  );
};

export default MapMarker;
