"use client";

import { useMemo, useState } from "react";
import { Marker, Popup } from "react-map-gl";

import Pin from "./Pin";
import Place from "./Place";

import { SafeStations } from "../types";

interface MarkerDrawProps {
  lat: number | undefined;
  lng: number | undefined;
  location: SafeStations | null;
  isPlace?: boolean;
}

const MarkerDraw: React.FC<MarkerDrawProps> = ({
  lat = 0,
  lng = 0,
  location = null,
  isPlace,
}) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleMouseEnter = () => {
    setShowPopup(true);
  };

  const handleMouseLeave = () => {
    setShowPopup(false);
  };

  const pin = useMemo(() => {
    return (
      <Marker longitude={lng} latitude={lat} anchor="top">
        <Pin />
      </Marker>
    );
  }, [lat, lng]);

  const palace = useMemo(() => {
    return (
      <Marker longitude={lng} latitude={lat} anchor="top">
        <Place />
      </Marker>
    );
  }, [lat, lng]);

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {isPlace ? palace : pin}
      {showPopup && (
        <Popup
          longitude={lng}
          latitude={lat}
          anchor="bottom"
          className="
            box-border 
            overflow-hidden 
            bg-[white] 
            shadow-[0_2px_7px_1px_rgba(0,0,0,0.3)] 
            border 
            p-2
            rounded-lg 
            border-solid 
            border-[#0876c8] 
            text-sm
            font-bold
          "
        >
          {location?.name && (
            <div className="text-sm font-bold">{location.name}</div>
          )}
          {location?.address && (
            <div className="text-sm font-normal">{location.address}</div>
          )}
        </Popup>
      )}
    </div>
  );
};

export default MarkerDraw;
