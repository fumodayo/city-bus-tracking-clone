"use client";

import { useState } from "react";

import { FaBus } from "react-icons/fa";
import SearchInput from "../inputs/SearchInput";
import ListingInfo from "../listings/ListingInfo";

enum OPTIONS {
  ROUTES = 0,
  BUSSTOPS = 1,
}

const ContentCase = () => {
  const [step, setStep] = useState(OPTIONS.ROUTES);

  const onChooseRoutes = () => {
    setStep(OPTIONS.ROUTES);
  };

  const onChooseBusStops = () => {
    setStep(OPTIONS.BUSSTOPS);
  };

  return (
    <>
      <div
        className=" 
        shadow-[0px_0px_7px_2px_rgba(0,0,0,0.15)]
        rounded-lg 
        flex 
        flex-row 
        m-5
        px-2 
        py-2
        justify-center 
        items-center
        text-sm
        font-bold
        text-gray-500
        cursor-pointer
      "
      >
        <div
          onClick={onChooseRoutes}
          className={`
            w-[50%]
            p-3
            rounded-lg 
            justify-center 
            items-center
            flex
            ${step === OPTIONS.ROUTES && "bg-primaryColor text-mainColor"}
          `}
        >
          Tuyến
        </div>
        <div
          onClick={onChooseBusStops}
          className={`
            w-[50%]
            p-3
            rounded-lg 
            justify-center 
            items-center
            flex
            ${step === OPTIONS.BUSSTOPS && "bg-primaryColor text-mainColor"}
        `}
        >
          <FaBus size={18} className="mr-1" />
          Trạm dừng
        </div>
      </div>
      <SearchInput
        placeholder={
          step === OPTIONS.ROUTES
            ? "Nhập tên tuyến..."
            : "Nhập tên trạm dừng..."
        }
      />
      <ListingInfo />
    </>
  );
};

export default ContentCase;
