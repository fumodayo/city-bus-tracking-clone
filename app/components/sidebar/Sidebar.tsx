"use client";

import { useCallback, useState } from "react";
import ArrowButton from "../ArrowButton";
import { VscTriangleLeft, VscTriangleRight } from "react-icons/vsc";
import Heading from "../Heading";
import { SafeRoutes, SafeStations } from "../types";
import useBusStopStore from "@/app/hooks/useBusstop";
import useBusRouteStore from "@/app/hooks/useBusRoute";
import SecondaryTabs from "./SecondaryTabs";
import ListingRoute from "../listings/ListingRoute";

import { FaBus, FaDirections } from "react-icons/fa";

interface SidebarProps {
  busstop: SafeStations[];
  busroute: SafeRoutes[];
}

const Sidebar: React.FC<SidebarProps> = ({ busstop, busroute }) => {
  const setBusStopStore = useBusStopStore((state) => state.setBusStopStore);
  setBusStopStore(busstop);

  const setBusRouteStore = useBusRouteStore((state) => state.setBusRouteStore);
  setBusRouteStore(busroute);

  const [open, setOpen] = useState(false);

  const onClose = useCallback(() => {
    setOpen(!open);
  }, [open]);

  const listingsbusRouteStore = <ListingRoute />;
  const searchingRoute = <div>Search</div>;

  return (
    <div className="flex flex-row relative">
      {open && (
        <div
          className={`
            w-[27rem]
            shadow-2xl
            bg-white
            box-border
            h-screen
        `}
        >
          {/* HEADER */}
          <Heading title="Hệ thống xe buýt Đà Nẵng" />
          <SecondaryTabs
            headingTab="Tra cứu"
            secondaryheadingTab="Tìm tuyến"
            headingTabContent={listingsbusRouteStore}
            secondaryHeadingTabContent={searchingRoute}
            iconFirst={FaBus}
            iconSecond={FaDirections}
          />
        </div>
      )}
      <ArrowButton
        onClick={onClose}
        iconOpen={VscTriangleLeft}
        iconClose={VscTriangleRight}
        open={open}
      />
    </div>
  );
};

export default Sidebar;
