"use client";

import SecondaryTabs from "../sidebar/SecondaryTabs";
import ListingInfo from "../listings/ListingInfo";

import useBusStopStore from "@/app/hooks/useBusstop";
import useBusRouteStore from "@/app/hooks/useBusRoute";

import { FaBus } from "react-icons/fa";

const HomeSidebar = () => {
  const busstopStore = useBusStopStore((state) => state.busstopStore);
  const busRouteStore = useBusRouteStore((state) => state.busRouteStore);

  const listingsbusRouteStore = (
    <ListingInfo listings={busRouteStore} isListingRoutes />
  );

  const listingsbusStopStore = <ListingInfo listings={busstopStore} />;

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
