"use client";

import useRouteSidebar from "@/app/hooks/useRouteSidebar";

import SidebarWrapper from "../sidebar/SidebarWrapper";
import HeadTabs from "../sidebar/HeadTabs";
import SecondaryTabs from "../sidebar/SecondaryTabs";
import ListingBusStop from "./ListingBusStop";
import RouteInfo from "./RouteInfo";
import useBusRouteStore from "@/app/hooks/useBusRoute";
import useBusStopStore from "@/app/hooks/useBusstop";

const RouteSidebar = () => {
  const sidebar = useRouteSidebar();
  const setBusRouteStore = useBusRouteStore((state) => state.busRouteStore);
  const busstopStore = useBusStopStore((state) => state.busstopStore);
  const filterRoute = setBusRouteStore.filter((route) => route.code === "LK01");
  const filterBusStop = busstopStore.filter(
    (bus) => bus.codeRoute === "R15" && bus.direction === "turn"
  );

  const listBusStopInRoute = <ListingBusStop listings={filterBusStop} />;
  const routeInfo = <RouteInfo listings={filterRoute} />;

  const startRouteContent = (
    <SecondaryTabs
      headingTab="Trạm dừng"
      secondaryheadingTab="Thông tin"
      headingTabContent={listBusStopInRoute}
      secondaryHeadingTabContent={routeInfo}
    />
  );
  const returnRouteContent = (
    <SecondaryTabs
      headingTab="Trạm dừng"
      secondaryheadingTab="Thông tin"
      secondaryHeadingTabContent={routeInfo}
    />
  );

  return (
    <SidebarWrapper title="Ten tuyen" isOpen={true} onClose={sidebar.onClose}>
      <HeadTabs
        headingTab="Xem lượt đi"
        secondaryheadingTab="Xem lượt về"
        headingTabContent={startRouteContent}
        secondaryHeadingTabContent={returnRouteContent}
      />
    </SidebarWrapper>
  );
};

export default RouteSidebar;
