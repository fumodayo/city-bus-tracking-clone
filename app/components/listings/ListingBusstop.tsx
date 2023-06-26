"use client";

import { useCallback } from "react";

import { SafeStations } from "../types";

import SearchInput from "../inputs/SearchInput";

import useCheckboxStore from "@/app/hooks/useCheckbox";
import useBusstopSidebar from "@/app/hooks/useBusstopSidebar";

import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

interface ListingBusstopProps {
  listings: SafeStations[];
}

interface ListingCardProps {
  code: number;
  name: string;
  description?: string | null;
}

export const ListingCard: React.FC<ListingCardProps> = ({
  code,
  name,
  description,
}) => {
  const checkboxStore = useCheckboxStore();

  const router = useRouter();
  const params = useSearchParams();
  const sidebar = useBusstopSidebar();

  const handleClick = useCallback(async () => {
    const updatedQuery: any = {
      ["busstop_detail"]: name,
    };

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );
    sidebar.onOpen();

    router.push(url);
  }, [router, sidebar, name]);

  return (
    <>
      <div className="flex flex-row cursor-pointer" onClick={handleClick}>
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
        >
          {code}
        </div>
        <div className="flex-[0_0_55%]">
          <p className="text-base font-bold hover:text-mainColor">{name}</p>
          <p className="text-sm font-semibold">{description}</p>
        </div>
      </div>
      <hr className="border-1 border-solid my-5 w-full" />
    </>
  );
};

const ListingBusstop: React.FC<ListingBusstopProps> = ({ listings }) => {
  return (
    <div>
      <div className="py-2">
        <SearchInput placeholder="Nhập tên trạm..." />
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
            code={index}
            name={route?.name as string}
            description={route.address}
          />
        ))}
      </div>
    </div>
  );
};

export default ListingBusstop;
