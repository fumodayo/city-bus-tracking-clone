"use client";

import RoadDraw from "./RoadDraw";

import { useFilteredPath } from "../hooks/useFilter";
import { useFindBusStopNear } from "../hooks/useDirection";
import { useSearchParams } from "next/navigation";

const MapDraw = () => {
  const filteredRoad = useFilteredPath();
  const { coordinates } = useFindBusStopNear();

  const params = useSearchParams();
  const type = params?.get("type") === "direction";

  return (
    <div>
      {!type &&
        filteredRoad.map((route: any) => (
          <RoadDraw
            key={route.codeRoute}
            color={route.color}
            coordinates={route.line}
          />
        ))}
      {type && coordinates.length > 0 && (
        <RoadDraw color="#429f5d" coordinates={coordinates} />
      )}
    </div>
  );
};

export default MapDraw;
