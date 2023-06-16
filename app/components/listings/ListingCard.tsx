"use client";

import { useCallback, useEffect } from "react";
import Checkbox from "../inputs/Checkbox";
import useCheckboxStore from "@/app/hooks/useCheckbox";

interface ListingCardProps {
  code: string | number;
  name: string | null;
  description: string | null;
  color: string | undefined;
}

const ListingCard: React.FC<ListingCardProps> = ({
  code,
  name,
  description,
  color,
}) => {
  const addCheckedCode = useCheckboxStore((state) => state.checkedCode);
  const routeCodes = useCheckboxStore((state) => state.routeCodes);

  const handleCheckboxChange = useCallback(
    (checkedCode: string | number) => {
      addCheckedCode(checkedCode);
    },
    [addCheckedCode]
  );

  return (
    <>
      <div className="flex flex-row cursor-pointer">
        <div
          className={`  
            bg-mainColor
            flex-[0_0_25%] 
            p-2
            rounded-lg 
            text-2xl
            font-semibold
            text-white
            mr-5
            justify-center 
            items-center
            flex
            
          `}
          style={{ backgroundColor: color }}
        >
          {code}
        </div>
        <div className="flex-[0_0_55%]">
          <p className="text-base font-bold hover:text-mainColor">{name}</p>
          <p className="text-sm font-semibold">{description}</p>
        </div>
        <div className="flex-[0_0_20%] items-center justify-center mt-4">
          <Checkbox
            checked={routeCodes.includes(code)}
            onChange={() => handleCheckboxChange(code)}
          />
        </div>
      </div>
      <hr className="border-1 border-solid my-5 w-full" />
    </>
  );
};

export default ListingCard;
