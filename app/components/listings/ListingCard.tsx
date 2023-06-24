"use client";

import { useCallback, useState, useEffect } from "react";
import Checkbox from "../inputs/Checkbox";
import useCheckboxStore from "@/app/hooks/useCheckbox";

import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import useRouteSidebar from "@/app/hooks/useRouteSidebar";
import toast from "react-hot-toast";

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
    (checkedCode: string | number) => {
      checkboxStore.checkedCode(checkedCode);
      toast.success('Hoàn thành!')
    },
    [checkboxStore]
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

    checkboxStore.routeCodes = [];
    checkboxStore.checkedCode(code);

    router.push(url);
  }, [params, router, code, newSidebar, checkboxStore]);

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
              checked={isChecked}
              onChange={() => handleCheckboxChange(code)}
              disabled={isDisabled}
            />
          )}
        </div>
      </div>
      <hr className="border-1 border-solid my-5 w-full" />
    </>
  );
};

export default ListingCard;
