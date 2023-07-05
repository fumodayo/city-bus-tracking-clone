import { useMemo } from "react";
import { Source, Layer } from "react-map-gl";
import { Feature, LineString, Position } from "geojson";

interface RoadDrawProps {
  coordinates: [] | undefined;
  color: string;
}

const RoadDraw: React.FC<RoadDrawProps> = ({ coordinates = [], color }) => {
  const getGeoJSON = (coordinates: Position[]): Feature<LineString> => {
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
      <Source id={`route`} type="geojson" data={getGeoJSON(coordinates)}>
        <Layer
          id={`route-layer`}
          type="line"
          paint={{
            "line-color": color,
            "line-width": 2,
          }}
        />
      </Source>
    );
  }, [coordinates, color]);

  return <>{route}</>;
};

export default RoadDraw;
