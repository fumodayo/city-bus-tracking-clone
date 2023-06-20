"use client";

import { useCallback } from "react";
import Checkbox from "../inputs/Checkbox";
import useCheckboxStore from "@/app/hooks/useCheckbox";

import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import useRouteSidebar from "@/app/hooks/useRouteSidebar";

interface ListingCardProps {
  code: string | number;
  name: string | null;
  description?: string | null;
  color: string | undefined;
  isDisabledCheckbox?: boolean;
}

const ListingCard: React.FC<ListingCardProps> = ({
  code,
  name,
  description,
  color,
  isDisabledCheckbox,
}) => {
  const addCheckedCode = useCheckboxStore((state) => state.checkedCode);
  const routeCodes = useCheckboxStore((state) => state.routeCodes);

  const handleCheckboxChange = useCallback(
    (checkedCode: string | number) => {
      addCheckedCode(checkedCode);
    },
    [addCheckedCode]
  );

  const router = useRouter();
  const params = useSearchParams();
  const newSidebar = useRouteSidebar();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      ["route-detail"]: code,
    };

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );
    newSidebar.onOpen();
    addCheckedCode(code);
    router.push(url);
  }, [params, router, code, newSidebar, addCheckedCode]);

  return (
    <>
      <div className="flex flex-row cursor-pointer">
        <div
          onClick={handleClick}
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
        <div className="flex-[0_0_55%]" onClick={handleClick}>
          <p className="text-base font-bold hover:text-mainColor">{name}</p>
          <p className="text-sm font-semibold">{description}</p>
        </div>
        <div className="flex-[0_0_20%] items-center justify-center mt-4">
          {isDisabledCheckbox && (
            <Checkbox
              checked={routeCodes.includes(code)}
              onChange={() => handleCheckboxChange(code)}
            />
          )}
        </div>
      </div>
      <hr className="border-1 border-solid my-5 w-full" />
    </>
  );
};

export default ListingCard;
