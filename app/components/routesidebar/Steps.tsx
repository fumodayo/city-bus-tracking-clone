"use client";

import { SafeStations } from "../types";

interface StepsProps {
  listings: SafeStations[];
  currentIndex: number;
  onClick: (bus: SafeStations, index: number) => void;
}

const Steps: React.FC<StepsProps> = ({ listings, currentIndex, onClick }) => {
  return (
    <div className="text-base font-semibold flex flex-col max-w-[250px]">
      {listings.map((bus, index) => {
        let color =
          currentIndex === index ? "text-base text-blue-500 font-semibold" : null;
        return (
          <div
            className={` 
              hover:text-blue-500 
              flex 
              min-h-[30px]
              mb-5
              border-b-2
              ${color}
            `}
            key={index}
            onClick={() => onClick(bus, index)}
          >
            {bus.name}
          </div>
        );
      })}
    </div>
  );
};

export default Steps;
