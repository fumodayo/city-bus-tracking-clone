"use client";

import Image from "next/image";

import SecondaryTabs from "../sidebar/SecondaryTabs";
import usePinStore from "@/app/hooks/usePinStore";

import PinInput from "../inputs/PinInput";

const SearchSidebar = () => {
  const {
    lng: lngStart,
    lat: latStart,
    resetLatLngStart,
  } = usePinStore((state) => state.start);

  const {
    lng: lngEnd,
    lat: latEnd,
    resetLatLngEnd,
  } = usePinStore((state) => state.end);

  const onUnpinStart = () => {
    resetLatLngStart();
  };

  const onUnpinEnd = () => {
    resetLatLngEnd();
  };

  return (
    <div>
      <div
        className="
            inline-block 
            w-[90%] 
            shadow-[0px_0px_7px_2px_rgba(0,0,0,0.15)] 
            bg-white 
            relative 
            transition-all 
            duration-[2s] 
            ease-[ease] 
            m-4 
            px-0 
            py-2.5 
            rounded-[15px]"
      >
        <PinInput
          image="/markerred.png"
          placeholder="Nhập địa điểm xuất phát, hoặc click lên màn hình"
          lat={latStart}
          lng={lngStart}
          onClick={onUnpinStart}
        />
        <div className="flex flex-row">
          <div className="w-full h-[1px] mx-8 my-4 bg-gray-300" />
        </div>
        <PinInput
          image="/markerblue.png"
          placeholder="Nhập địa điểm kết thúc, hoặc click lên màn hình"
          lat={latEnd}
          lng={lngEnd}
          onClick={onUnpinEnd}
        />
      </div>
      <div>
        <h1 className="text-xl font-semibold m-5">Số tuyến đi tối đa:</h1>
        <SecondaryTabs headingTab="1 tuyến" secondaryheadingTab="2 tuyến" />
      </div>
    </div>
  );
};

export default SearchSidebar;
