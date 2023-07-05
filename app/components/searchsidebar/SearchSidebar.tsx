"use client";

import SecondaryTabs from "../sidebar/SecondaryTabs";
import usePinStore from "@/app/hooks/usePinStore";

import PinInput from "../inputs/PinInput";
import { useFindBusStopNear } from "@/app/hooks/useDirection";

import { BiWalk } from "react-icons/bi";
import { FaBus } from "react-icons/fa";

import RouterLegStep from "./RouterLegStep";
import ListingBusStop from "../routesidebar/ListingBusStop";

const SearchSidebar = () => {
  const {
    locationNearStart,
    locationNearEnd,
    walkingStart,
    route,
    walkingEnd,
    coordinates,
    filteredStops,
  } = useFindBusStopNear();

  console.log(walkingStart);

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

  const listBusStopInRoute = (
    <div
      className="
        inline-block 
        overflow-y-scroll
        overflow-x-hidden
        h-[50vh]
        shadow-[0px_0px_7px_2px_rgba(0,0,0,0.15)] 
        bg-white 
        relative 
        transition-all 
        duration-[2s] 
        ease-[ease] 
        m-4 
        px-0 
        py-2.5 
        rounded-[15px]
      "
    >
      <RouterLegStep type="start" icon={BiWalk} />
      <RouterLegStep type="bus" icon={FaBus} />
      <RouterLegStep type="end" icon={BiWalk} />
    </div>
  );

  const routeInfo = <ListingBusStop listings={filteredStops} />;

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
            rounded-[15px]
            "
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
        <SecondaryTabs
          headingTab="Chi tiết cách đi"
          secondaryheadingTab="Các trạm đi qua"
          headingTabContent={listBusStopInRoute}
          secondaryHeadingTabContent={routeInfo}
        />
      </div>
    </div>
  );
};

export default SearchSidebar;
