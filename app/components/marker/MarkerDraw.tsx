"use client";

import { Marker, Popup } from "react-map-gl";
import Pin from "./Pin";
import { useMemo, useState } from "react";
import { SafeStations } from "../types";

interface MarkerDrawProps {
  lat: number;
  lng: number;
  location: SafeStations;
}

const MarkerDraw: React.FC<MarkerDrawProps> = ({ lat, lng, location }) => {
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

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {pin}
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
          {location.address}
        </Popup>
      )}
    </div>
  );
};

export default MarkerDraw;
