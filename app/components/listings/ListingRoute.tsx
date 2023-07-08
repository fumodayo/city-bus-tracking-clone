"use client";

import useBusRouteStore from "@/app/hooks/useBusRoute";

import ListingCard from "./ListingCard";

import SearchInput from "../inputs/SearchInput";

const ListingRoute = () => {
  const busRouteStore = useBusRouteStore((state) => state.busRouteStore);
  return (
    <div>
      <div className="py-2">
        <SearchInput placeholder="Nhập tên tuyến..." />
      </div>
      <div
        className="
        px-5 
        py-2
        flex
        flex-col
        h-[80vh]
        overflow-y-scroll
        overflow-x-hidden
      "
      >
        {busRouteStore.map((route, index) => (
          <ListingCard
            key={index}
            code={route.code as string}
            name={route.name}
            description={route.address}
            color={route.color}
          />
        ))}
      </div>
    </div>
  );
};

export default ListingRoute;
