"use client";

import { useMemo } from "react";
import { Source, Layer } from "react-map-gl";
import { Feature, LineString } from "geojson";

interface RoadDrawProps {
  cooridinates: number[][];
}

const RoadDraw: React.FC<RoadDrawProps> = ({ cooridinates = [] }) => {
  const getGeoJSON = (coordinates: number[][]): Feature<LineString> => {
    return {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: coordinates,
      },
    };
  };

  const route = useMemo(() => {
    return (
      <Source id="route" type="geojson" data={getGeoJSON(cooridinates)}>
        <Layer
          id="route-layer"
          type="line"
          paint={{
            "line-color": "#0070f3",
            "line-width": 2,
          }}
        />
      </Source>
    );
  }, [cooridinates]);

  return <div>{route}</div>;
};

export default RoadDraw;
