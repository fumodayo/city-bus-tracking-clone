"use client";

import { useSearchParams } from "next/navigation";

import MarkerDraw from "./marker/MarkerDraw";

import useNearbySearch from "../hooks/useNearbySearch";
import useFlyToStore from "../hooks/useFlyStore";

import { useMemo } from "react";

const PlaceMarker = () => {
  const params = useSearchParams();
  const category = params?.get("text");
  const { lat, lng } = useFlyToStore();

  const getNearPlaces = useNearbySearch(category, lat, lng);

  return (
    <div>
      {getNearPlaces.map((point, index) => (
        <MarkerDraw
          key={index}
          lat={point["lat"]}
          lng={point["lng"]}
          location={point}
          isPlace
        />
      ))}
    </div>
  );
};

export default PlaceMarker;
