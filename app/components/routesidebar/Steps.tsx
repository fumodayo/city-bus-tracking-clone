"use client";

import { SafeStations } from "../types";

interface StepsProps {
  listings: SafeStations[];
  currentIndex: number;
}

const Steps: React.FC<StepsProps> = ({ listings, currentIndex }) => {
  console.log(listings);
  return (
    <div className="text-base">
      {listings.map((bus) => (
        <div className="border-b-2 my-10 first:m-0 " key={bus.name}>
          {bus.name}
        </div>
      ))}
    </div>
  );
};

export default Steps;
