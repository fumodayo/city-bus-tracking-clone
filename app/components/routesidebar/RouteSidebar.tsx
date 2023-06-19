"use client";

import useContentSidebar from "@/app/hooks/useContentSidebar";
import ContentSidebar from "../sidebar/ContentSidebar";

const RouteSidebar = () => {
  const sidebar = useContentSidebar();

  return (
    <ContentSidebar
      title="Ten tuyen"
      isOpen={false}
      onClose={sidebar.onClose}
      headingTab="Xem luot di"
      secondaryheadingTab="xem luot ve"
    />
  );
};

export default RouteSidebar;
