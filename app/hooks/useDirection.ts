import { useState, useEffect } from "react";
import usePinStore from "./usePinStore";
import axios from "axios";
import useBusStopStore from "./useBusstop";
import { isPointInPolygon } from "../utils/isPointInPolygon";

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

const useLocationNear = () => {
  /**
   * Step 1: Create polygon at "start" point
   * Step 2: Find bus stops inside polygon using ray-casting algorithm
   * Step 3: Calculate distance of all bus stop locations in polygon then find its minimum distance
   */
  const [location, setLocation] = useState<any | null>(null);
  const busstore = useBusStopStore();
  const { lng: lngStart, lat: latStart } = usePinStore((state) => state.start);
  useEffect(() => {
    if (lngStart && latStart) {
      const handleLocationNear = async () => {
        // Step 1
        const { data } = await axios.get(
          `https://api.mapbox.com/isochrone/v1/mapbox/walking/${lngStart}%2C${latStart}?contours_meters=1000&polygons=true&denoise=1&access_token=${process.env.NEXT_PUBLIC_MAPBOX_KEY}`
        );
        const polygon = data.features[0].geometry.coordinates[0];

        const covertLocationBusStopInArray = busstore.busstopStore.map(
          (bus) => ({
            id: bus.id,
            location: [bus.location.lng, bus.location.lat],
          })
        );

        // Step 2
        const listPointsInPolygon = covertLocationBusStopInArray.filter((p) =>
          isPointInPolygon(p.location, polygon)
        );

        // Step 3
        let total = [];
        for (let point = 0; point < listPointsInPolygon.length - 1; point++) {
          const { data } = await axios.get(
            `https://api.mapbox.com/directions/v5/mapbox/walking/${lngStart},${latStart};${
              listPointsInPolygon[point].location
            },${
              listPointsInPolygon[point + 1].location
            }?steps=true&geometries=geojson&access_token=${
              process.env.NEXT_PUBLIC_MAPBOX_KEY
            }&language=vi`
          );
          total.push({
            id: listPointsInPolygon[point].id,
            distance: data.routes[0].distance,
          });
        }

        const elementWithMinDistance = total.reduce(
          (minElement, currentElement) => {
            if (currentElement.distance < minElement.distance) {
              return currentElement;
            } else {
              return minElement;
            }
          }
        );
        setLocation(elementWithMinDistance);
      };
      handleLocationNear();
    }
  }, [lngStart, latStart]);
  return location;
};

export { useDirection, useLocationNear };
