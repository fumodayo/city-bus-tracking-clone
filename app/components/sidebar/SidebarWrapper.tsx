"use client";

import { useCallback, useEffect, useState } from "react";
import Heading from "../Heading";
import { RiCloseLine } from "react-icons/ri";

interface SidebarWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const SidebarWrapper: React.FC<SidebarWrapperProps> = ({
  isOpen,
  onClose,
  title,
  children,
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
        className={`translate duration-300 bg-white h-screen flex flex-col
        ${showSidebar ? "w-[27rem]" : "w-0"}
        ${showSidebar ? "opacity-100" : "opacity-0"}
        `}
      >
        {/* HEADER */}
        <Heading title={title} onClick={handleClose} icon={RiCloseLine} />
        {/* CONTENT */}
        {children}
      </div>
    </div>
  );
};

export default SidebarWrapper;
