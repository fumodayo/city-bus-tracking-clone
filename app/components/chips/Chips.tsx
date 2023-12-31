"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import {
  MdOutlineRestaurant,
  MdLocalCafe,
  MdStore,
  MdSchool,
  MdBeachAccess,
} from "react-icons/md";
import { GiPagoda } from "react-icons/gi";
import { FaStoreAlt } from "react-icons/fa";
import { RxColorWheel } from "react-icons/rx";
import qs from "query-string";

const chipItems = [
  {
    id: "restaurant",
    icon: MdOutlineRestaurant,
    name: "Nhà hàng",
  },
  {
    id: "Cafe",
    icon: MdLocalCafe,
    name: "Cà phê",
  },
  {
    id: "store",
    icon: MdStore,
    name: "Cửa hàng tạp hóa",
  },
  {
    id: "education",
    icon: MdSchool,
    name: "Trường học",
  },
  {
    id: "market",
    icon: FaStoreAlt,
    name: "Chợ",
  },
  {
    id: "pagoda",
    icon: GiPagoda,
    name: "Chùa",
  },
  {
    id: "amusement park",
    icon: RxColorWheel,
    name: "Khu vui chơi",
  },
  {
    id: "beach",
    icon: MdBeachAccess,
    name: "Bãi biển",
  },
];

interface ChipProps {
  id: string;
  name: string;
  icon: IconType;
  selected?: boolean;
}

export const Chip: React.FC<ChipProps> = ({
  name,
  id,
  icon: Icon,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      text: id,
    };

    if (params?.get("text") === id) {
      delete updatedQuery.text;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [id, params, router]);

  return (
    <div
      onClick={handleClick}
      className={`
        shadow-[0_2px_3px_rgba(0,0,0,0.1607843137254902)] 
        cursor-pointer 
        px-3 
        py-1.5'
        mx-1 
        rounded-3xl
        flex
        justify-center 
        items-center 
        w-fit
        h-10
        ${selected ? "border-b-neutral-800" : "border-transparent"}
        ${selected ? "bg-mainColor" : "bg-white"}
        ${selected ? " text-white" : " text-black"}
      `}
    >
      <Icon size={20} />
      <div className="font-medium text-sm mx-2">{name}</div>
    </div>
  );
};

const Chips = () => {
  const params = useSearchParams();
  const category = params?.get("text");

  return (
    <>
      <div className="flex flex-row max-h-10 relative z-50">
        {chipItems.map((chip) => (
          <Chip
            key={chip.id}
            name={chip.name}
            id={chip.id}
            icon={chip.icon}
            selected={category === chip.id}
          />
        ))}
      </div>
    </>
  );
};

export default Chips;
