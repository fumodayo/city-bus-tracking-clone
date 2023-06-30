import { useState, useEffect } from "react";
import usePinStore from "./usePinStore";
import axios from "axios";

type Direction = {
  distance?: number;
  duration?: number;
  coordinates?: number[];
  steps?: Object;
};

const useDirection = () => {
  const [direction, setDirection] = useState<Direction | null>(null);
  const { lng: lngStart, lat: latStart } = usePinStore((state) => state.start);
  const { lng: lngEnd, lat: latEnd } = usePinStore((state) => state.end);
  useEffect(() => {
    const fetchDirection = async () => {
      if (lngStart && latStart && lngEnd && latEnd) {
        const { data } = await axios.get(
          `https://api.mapbox.com/directions/v5/mapbox/walking/${lngStart},${latStart};${lngEnd},${latEnd}?steps=true&geometries=geojson&access_token=${process.env.NEXT_PUBLIC_MAPBOX_KEY}&language=vi`
        );
        const dir: Direction = {};
        dir.distance = data.routes[0].distance;
        dir.duration = data.routes[0].duration;
        dir.coordinates = data.routes[0].geometry.coordinates;
        dir.steps = data.routes[0].legs[0].steps.map((step: any) => ({
          name: step.maneuver.instruction,
          guide: step.maneuver.modifier || "here",
          distance: step.distance,
          duration: step.duration,
        }));
        setDirection(dir);
      }
    };
    fetchDirection();
  }, [lngStart, latStart, lngEnd, latEnd]);
  return direction;
};

export default useDirection;
