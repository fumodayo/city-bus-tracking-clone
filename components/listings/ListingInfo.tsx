"use client";

import ListingCard from "./ListingCard";
import routesData from "../../data/routes.json";
import { SafeRoutes, SafeStations } from "../types";

interface ListingInfoProps {
  listings: SafeRoutes[] | SafeStations[];
}

const ListingInfo: React.FC<ListingInfoProps> = ({ listings }) => {
  console.log(listings);
  return (
    <div
      className="
        p-5 
        flex
        flex-col
        max-h-[450px]
        overflow-y-scroll
        overflow-x-hidden
      "
    >
      {listings.map((route, index) => (
        <ListingCard
          key={route.code}
          code={route.code ? route.code : index}
          name={route.name}
          description={route.address}
          color={route.color}
        />
      ))}
    </div>
  );
};

export default ListingInfo;
