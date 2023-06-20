"use client";

import { SafeStations } from "../types";

interface StepsProps {
  listings: SafeStations[];
  currentIndex: number;
  onClick: (index: number) => void;
}

const Steps: React.FC<StepsProps> = ({ listings, currentIndex, onClick }) => {
  return (
    <div className="text-base font-medium">
      {listings.map((bus, index) => {
        let color =
          currentIndex === index ? "text-lg text-blue-500 font-semibold" : null;

        return (
          <div
            className={`
              border-b-2 
              my-[32.5px] 
              first:m-0 
              hover:text-lg 
              hover:text-blue-500 
              hover:font-semibold
              ${color}
            `}
            key={index}
            onClick={() => onClick(index)}
          >
            {bus.name}
          </div>
        );
      })}
    </div>
  );
};

export default Steps;
