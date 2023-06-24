"use client";

import useRouteSidebar from "@/app/hooks/useRouteSidebar";

import SidebarWrapper from "../sidebar/SidebarWrapper";
import HeadTabs from "../sidebar/HeadTabs";
import SecondaryTabs from "../sidebar/SecondaryTabs";
import ListingBusStop from "./ListingBusStop";
import RouteInfo from "./RouteInfo";
import useBusRouteStore from "@/app/hooks/useBusRoute";
import useBusStopStore from "@/app/hooks/useBusstop";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useMemo, useState } from "react";

import { useFilterBusstop } from "@/app/hooks/useFilter";

const RouteSidebar = () => {
  const sidebar = useRouteSidebar();
  const busstore = useBusStopStore();

  const router = useRouter();
  const params = useSearchParams();

  const [codeRoute, setCodeRoute] = useState("");

  useMemo(() => {
    let currentQuery: { [index: string]: any } = {};
    if (params) {
      currentQuery = qs.parse(params.toString());
    }
    const code = currentQuery["route-detail"];
    setCodeRoute(code);
    busstore.setCode(code);
  }, [params]);

  const setBusRouteStore = useBusRouteStore((state) => state.busRouteStore);
  const filterRoute = setBusRouteStore.filter(
    (route) => route.code === codeRoute
  );

  const filterBusStop = useFilterBusstop();

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
      headingTabContent={listBusStopInRoute}
      secondaryHeadingTabContent={routeInfo}
    />
  );

  return (
    <SidebarWrapper
      title={`Tuyến ${codeRoute}`}
      isOpen={sidebar.isOpen}
      onClose={sidebar.onClose}
    >
      <HeadTabs
        headingTab="Xem lượt đi"
        secondaryheadingTab="Xem lượt về"
        headingTabContent={startRouteContent}
        secondaryHeadingTabContent={returnRouteContent}
        directions
      />
    </SidebarWrapper>
  );
};

export default RouteSidebar;
