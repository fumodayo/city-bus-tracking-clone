"use client";

import ListingCard from "./ListingCard";

const ListingInfo = () => {
  return (
    <div
      className="
        p-5 
        flex
        flex-col
        max-h-[640px]
        overflow-y-scroll
        overflow-x-hidden
        
      "
    >
      <ListingCard
        code="LK01"
        name="Tuyến số LK01"
        description="Huế - Đà Nẵng"
        color="#ff1500"
      />
    </div>
  );
};

export default ListingInfo;
