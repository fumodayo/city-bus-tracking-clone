"use client";

import { SafeRoutes, SafeStations } from "../types";

interface RouteInfoProps {
  listings: SafeRoutes[];
}

const RouteInfo: React.FC<RouteInfoProps> = ({ listings }) => {
  return (
    <div className="p-2 m-3 text-base">
      {listings.map((route) => (
        <div key={route.code}>
          <div className="flex flex-row py-3">
            <label className="font-semibold whitespace-nowrap">
              Mã số tuyến:
            </label>
            <div className="ml-2">{route.code}</div>
          </div>
          <div className="flex flex-row py-3">
            <label className="font-semibold whitespace-nowrap">
              Tên tuyến:
            </label>
            <div className="ml-2">{route.address}</div>
          </div>
          <div className="flex flex-row py-3">
            <label className="font-semibold whitespace-nowrap">Lượt đi:</label>
            <div className="ml-2">{route.routeDirectionStart}</div>
          </div>
          <div className="flex flex-row py-3">
            <label className="font-semibold whitespace-nowrap">Lượt về:</label>
            <div className="ml-2">{route.routeDirectionReturn}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RouteInfo;
