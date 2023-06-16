"use client";

import useCheckboxStore from "../hooks/useCheckbox";
import roadmap from "../data/roadmap.json";
import RoadDraw from "./RoadDraw";

const MapDraw = () => {
  const checked = useCheckboxStore((state) => state.routeCodes);

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

  const filteredRoad = filterRoad(roadmap, checked, "turn");
  return (
    <div>
      {filteredRoad.map((route: any) => (
        <RoadDraw key={route.codeRoute} cooridinates={route.line} />
      ))}
    </div>
  );
};

export default MapDraw;
