"use client";

import { toast } from "react-hot-toast";
import { useState, useEffect, useCallback } from "react";

import useCheckboxStore from "@/app/hooks/useCheckbox";
import useRouteSidebar from "@/app/hooks/useRouteSidebar";

import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";

import Checkbox from "../inputs/Checkbox";

interface ListingCardProps {
  code: string;
  name: string | null;
  description?: string | null;
  color: string | undefined;
}

const ListingCard: React.FC<ListingCardProps> = ({
  code,
  name,
  description,
  color,
}) => {
  const checkboxStore = useCheckboxStore();

  /* checked một ô thì các ô khác sẽ disabled trừ ô đã checked */
  const [isChecked, setIsChecked] = useState(
    checkboxStore.routeCodes.includes(code)
  );
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    setIsChecked(checkboxStore.routeCodes.includes(code));
    setIsDisabled(checkboxStore.routeCodes.length > 0 && !isChecked);
  }, [checkboxStore.routeCodes, code, isChecked]);
  /***/

  const handleCheckboxChange = useCallback(
    (checkedCode: string) => {
      checkboxStore.checkedCode(checkedCode);
      toast.success("Hoàn thành!");
    },
    [checkboxStore]
  );

  const router = useRouter();
  const params = useSearchParams();
  const sidebar = useRouteSidebar();

  const handleClick = useCallback(() => {
    const updatedQuery: any = {
      ["route_detail"]: code,
    };

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );
    sidebar.onOpen();

    checkboxStore.routeCodes = [];
    checkboxStore.checkedCode(code);

    router.push(url);
  }, [router, checkboxStore, sidebar, code]);

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
          <Checkbox
            checked={isChecked}
            onChange={() => handleCheckboxChange(code)}
            disabled={isDisabled}
          />
        </div>
      </div>
      <hr className="border-1 border-solid my-5 w-full" />
    </>
  );
};

export default ListingCard;
