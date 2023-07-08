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
    busStopsNearestRoad,
  } = useFindBusStopNear();

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
    <div>
      {lngStart &&
      latStart &&
      lngEnd &&
      latEnd &&
      locationNearStart &&
      locationNearEnd &&
      walkingStart &&
      route &&
      walkingEnd &&
      busStopsNearestRoad ? (
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
            py-2 
            rounded-[15px]
      "
        >
          <RouterLegStep
            locationNearStart={locationNearStart}
            locationNearEnd={locationNearEnd}
            walkingStart={walkingStart}
            type="start"
            icon={BiWalk}
          />
          <RouterLegStep
            locationNearStart={locationNearStart}
            locationNearEnd={locationNearEnd}
            route={route}
            type="bus"
            icon={FaBus}
          />
          <RouterLegStep
            locationNearStart={locationNearStart}
            locationNearEnd={locationNearEnd}
            walkingEnd={walkingEnd}
            type="end"
            icon={BiWalk}
          />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );

  const routeInfo = (
    <div>
      <ListingBusStop listings={busStopsNearestRoad} />
    </div>
  );

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
          placeholder="Click 2 lần vào bản đồ để chọn vị trí bắt đầu"
          lat={latStart}
          lng={lngStart}
          onClick={onUnpinStart}
        />
        <div className="flex flex-row">
          <div className="w-full h-[1px] mx-8 my-4 bg-gray-300" />
        </div>
        <PinInput
          image="/markerblue.png"
          placeholder="Click 2 lần vào bản đồ để chọn vị trí kết thúc"
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
