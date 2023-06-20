"use client";

import ListingCard from "./ListingCard";
import { SafeRoutes, SafeStations } from "../types";
import SearchInput from "../inputs/SearchInput";

interface ListingInfoProps {
  isListingRoutes?: boolean;
  listings: SafeRoutes[] | SafeStations[];
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  listings,
  isListingRoutes,
}) => {
  return (
    <div>
      <div className="py-2">
        <SearchInput
          placeholder={
            isListingRoutes ? "Nhập tên tuyến..." : "Nhập tên trạm dừng..."
          }
        />
      </div>
      <div
        className="
        px-5 
        py-2
        flex
        flex-col
        h-[60vh]
        overflow-y-scroll
        overflow-x-hidden
      "
      >
        {listings.map((route, index) => (
          <ListingCard
            key={index}
            code={route.code ? route.code : index}
            name={route.name}
            description={route.address}
            color={route.color}
            isDisabledCheckbox={isListingRoutes} // show checkbox if list bus route
          />
        ))}
      </div>
    </div>
  );
};

export default ListingInfo;
