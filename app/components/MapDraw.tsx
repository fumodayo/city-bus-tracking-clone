"use client";

import RoadDraw from "./RoadDraw";

import { useFilteredPath } from "../hooks/useFilter";

const MapDraw = () => {
  const filteredRoad = useFilteredPath();

  return (
    <div>
      {filteredRoad.map((route: any) => (
        <RoadDraw
          key={route.codeRoute}
          color={route.color}
          coordinates={route.line}
        />
      ))}
    </div>
  );
};

export default MapDraw;
