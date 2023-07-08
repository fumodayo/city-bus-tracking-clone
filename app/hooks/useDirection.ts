import { useState, useEffect } from "react";
import usePinStore from "./usePinStore";
import axios from "axios";
import useBusStopStore from "./useBusstop";
import { isPointInPolygon } from "../utils/isPointInPolygon";
import { calculateDistance } from "../utils/calculateDistance";
import { SafeStations } from "../components/types";

type Direction = {
  distance?: number;
  duration?: number;
  coordinates?: [];
  steps?: Object;
};

const useDirection = (
  type: string,
  lngStart: number | null,
  latStart: number | null,
  lngEnd: number | null,
  latEnd: number | null
) => {
  const [direction, setDirection] = useState<Direction | null>(null);
  useEffect(() => {
    const fetchDirection = async () => {
      if (lngStart && latStart && lngEnd && latEnd) {
        const { data } = await axios.get(
          `https://api.mapbox.com/directions/v5/mapbox/${type}/${lngStart},${latStart};${lngEnd},${latEnd}?steps=true&geometries=geojson&access_token=${process.env.NEXT_PUBLIC_MAPBOX_KEY}&language=vi`
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
  }, [type, lngStart, latStart, lngEnd, latEnd]);
  return direction;
};

const useLocationNear = (lng: number | null, lat: number | null) => {
  /**
   * Step 1: Create polygon at "start" point
   * Step 2: Find bus stops inside polygon using ray-casting algorithm
   * Step 3: Calculate distance of all bus stop locations in polygon then find its minimum distance
   */
  const [location, setLocation] = useState<any | null>(null);
  const busstore = useBusStopStore();
  useEffect(() => {
    if (lng && lat) {
      const handleLocationNear = async () => {
        // Step 1
        const { data } = await axios.get(
          `https://api.mapbox.com/isochrone/v1/mapbox/walking/${lng}%2C${lat}?contours_meters=1000&polygons=true&denoise=1&access_token=${process.env.NEXT_PUBLIC_MAPBOX_KEY}`
        );
        const polygon = data.features[0].geometry.coordinates[0];

        const covertLocationBusStopInArray = busstore.busstopStore.map(
          (point) => ({
            point,
            location: [point.location.lng, point.location.lat],
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
            `https://api.mapbox.com/directions/v5/mapbox/walking/${lng},${lat};${
              listPointsInPolygon[point].location
            },${
              listPointsInPolygon[point + 1].location
            }?steps=true&geometries=geojson&access_token=${
              process.env.NEXT_PUBLIC_MAPBOX_KEY
            }&language=vi`
          );
          total.push({
            ...listPointsInPolygon[point],
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
  }, [lng, lat]);
  return location;
};

const useFindBusStopNear = () => {
  const { lng: lngStart, lat: latStart } = usePinStore((state) => state.start);
  const { lng: lngEnd, lat: latEnd } = usePinStore((state) => state.end);

  const busstore = useBusStopStore();

  const locationNearStart = useLocationNear(lngStart, latStart);
  let latPointStart, lngPointStart;

  if (locationNearStart) {
    const [lng, lat] = locationNearStart.location;
    latPointStart = lat;
    lngPointStart = lng;
  }

  const locationNearEnd = useLocationNear(lngEnd, latEnd);
  let latPointEnd, lngPointEnd;

  if (locationNearEnd) {
    const [lng, lat] = locationNearEnd.location;
    latPointEnd = lat;
    lngPointEnd = lng;
  }

  const walkingStart = useDirection(
    "walking",
    lngStart,
    latStart,
    lngPointStart,
    latPointStart
  );

  const walkingEnd = useDirection(
    "walking",
    lngEnd,
    latEnd,
    lngPointEnd,
    latPointEnd
  );

  const route = useDirection(
    "driving",
    lngPointStart,
    latPointStart,
    lngPointEnd,
    latPointEnd
  );

  let coordinates: [] = [];
  if (
    walkingStart?.coordinates &&
    walkingEnd?.coordinates &&
    route?.coordinates &&
    latStart &&
    lngStart &&
    latEnd &&
    lngEnd
  ) {
    coordinates = [
      ...walkingStart?.coordinates,
      ...route?.coordinates,
      ...walkingEnd?.coordinates,
    ];
  }

  const busStopsNearestRoad = coordinates.reduce<SafeStations[]>(
    (result, point) => {
      let minDistance = Infinity;
      let nearestStop: SafeStations | null = null;
      const maxDistanceThreshold = 50; // Maximum distance threshold in m

      for (const stop of busstore.busstopStore) {
        const distance = calculateDistance(
          point[1],
          point[0],
          stop.location.lat,
          stop.location.lng
        );
        if (distance < minDistance && distance <= maxDistanceThreshold) {
          minDistance = distance;
          nearestStop = stop;
        }
      }

      if (nearestStop !== null && !result.includes(nearestStop)) {
        result.push(nearestStop);
      }

      return result;
    },
    []
  );

  return {
    locationNearStart,
    locationNearEnd,
    walkingStart,
    route,
    walkingEnd,
    coordinates,
    busStopsNearestRoad,
  };
};

export { useDirection, useLocationNear, useFindBusStopNear };
