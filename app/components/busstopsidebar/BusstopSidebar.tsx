"use client";

import useBusstopSidebar from "@/app/hooks/useBusstopSidebar";
import SidebarWrapper from "../sidebar/SidebarWrapper";

import { useSearchParams } from "next/navigation";
import qs from "query-string";
import { useEffect, useMemo, useState } from "react";
import useBusStopStore from "@/app/hooks/useBusstop";
import HeadTabs from "../sidebar/HeadTabs";

const BusstopSidebar = () => {
  const sidebar = useBusstopSidebar();

  const params = useSearchParams();
  const [name, setName] = useState("");
  const busstore = useBusStopStore();

  useMemo(() => {
    if (params) {
      const currentQuery = qs.parse(params.toString());
      const name = currentQuery["busstop_detail"];
      setName(name as string);
    }
  }, [params]);

  useEffect(() => {
    if (name?.length > 0) {
      const findBusstop = busstore.busstopStore.find(
        (bus) => bus.name === name
      );
      console.log(findBusstop);
    }
  }, [name]);

  return (
    <SidebarWrapper
      title={name}
      isOpen={sidebar.isOpen}
      onClose={sidebar.onClose}
    >
      <HeadTabs
        headingTab="Xe sắp tới trạm"
        secondaryheadingTab="Tuyến đi qua"
        // headingTabContent={startRouteContent}
        // secondaryHeadingTabContent={returnRouteContent}
      />
    </SidebarWrapper>
  );
};

export default BusstopSidebar;
