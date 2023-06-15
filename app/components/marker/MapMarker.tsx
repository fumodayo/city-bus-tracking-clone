"use client";

import { Marker, Popup } from "react-map-gl";
import Pin from "./Pin";
import { useMemo, useState } from "react";

interface MapMarkerProps {
  lat?: number;
  lng?: number;
  locations?: string;
}

const MapMarker: React.FC<MapMarkerProps> = ({ lat, lng, locations }) => {
  const [popupInfo, setPopupInfo] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleMouseEnter = () => {
    setShowPopup(true);
  };

  const handleMouseLeave = () => {
    setShowPopup(false);
  };

  const pin = useMemo(() => {
    return (
      <Marker
        longitude={108.21700461396165}
        latitude={16.06844512974017}
        anchor="bottom"
      >
        <Pin />
      </Marker>
    );
  }, []);

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {pin}
      {showPopup && (
        <Popup
          longitude={108.21700461396165}
          latitude={16.06844512974017}
          anchor="top"
        >
          222
        </Popup>
      )}
    </div>
  );
};

export default MapMarker;
