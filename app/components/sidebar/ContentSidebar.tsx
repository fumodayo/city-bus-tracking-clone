"use client";

import { useCallback, useEffect, useState } from "react";
import Heading from "../Heading";
import { RiCloseLine } from "react-icons/ri";

interface ContentSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  headingTab: string;
  secondaryheadingTab: String;
  headingTabContent?: React.ReactElement;
  secondaryHeadingTabContent?: React.ReactElement;
  body?: React.ReactElement;
}

const ContentSidebar: React.FC<ContentSidebarProps> = ({
  isOpen,
  onClose,
  title,
  headingTab,
  secondaryheadingTab,
  headingTabContent,
  secondaryHeadingTabContent,
  body,
}) => {
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    setShowSidebar(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setShowSidebar(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  if (!showSidebar) {
    return null;
  }

  return (
    <div className="flex flex-row fixed z-50">
      <div
        className={`translate duration-300 h-full 
        ${showSidebar ? "w-[27rem]" : "w-0"}
        ${showSidebar ? "opacity-100" : "opacity-0"}
        `}
      >
        {/* HEADER */}
        <Heading title="xem luot di" onClick={handleClose} icon={RiCloseLine} />
        {/* CONTENT */}
      </div>
    </div>
  );
};

export default ContentSidebar;
