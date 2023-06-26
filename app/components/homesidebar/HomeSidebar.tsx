"use client";

import SecondaryTabs from "../sidebar/SecondaryTabs";
import ListingRoute from "../listings/ListingRoute";
import ListingBusstop from "../listings/ListingBusstop";

import useBusStopStore from "@/app/hooks/useBusstop";
import useBusRouteStore from "@/app/hooks/useBusRoute";

import { FaBus } from "react-icons/fa";

const HomeSidebar = () => {
  const busstopStore = useBusStopStore((state) => state.busstopStore);

  const listingsbusRouteStore = <ListingRoute/>;

  const listingsbusStopStore = <ListingBusstop listings={busstopStore} />;

  return (
    <SecondaryTabs
      headingTab="Tuyến"
      secondaryheadingTab="Trạm dừng"
      headingTabContent={listingsbusRouteStore}
      secondaryHeadingTabContent={listingsbusStopStore}
      icon={FaBus}
    />
  );
};

export default HomeSidebar;
