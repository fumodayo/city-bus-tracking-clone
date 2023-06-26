"use client";

import { useCallback, useState } from "react";
import ArrowButton from "../ArrowButton";
import { VscTriangleLeft, VscTriangleRight } from "react-icons/vsc";
import Heading from "../Heading";
import HeadCase from "./HeadTabs";
import { SafeRoutes, SafeStations } from "../types";
import useBusStopStore from "@/app/hooks/useBusstop";
import useBusRouteStore from "@/app/hooks/useBusRoute";
import HomeSidebar from "../homesidebar/HomeSidebar";

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

  const listingsContent = <HomeSidebar />;
  const searchingContent = (
    <div>
      <h1>Searching</h1>
    </div>
  );

  return (
    <div className="flex flex-row">
      {open && (
        <div
          className={`
            w-[27rem]
            shadow-2xl
            bg-white
            box-border 
        `}
        >
          {/* HEADER */}
          <Heading title="Hệ thống xe buýt Đà Nẵng" />
          <HeadCase
            headingTab="Tra cứu"
            secondaryheadingTab="Tìm tuyến"
            headingTabContent={listingsContent}
            secondaryHeadingTabContent={searchingContent}
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
